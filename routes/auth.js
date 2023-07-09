const express = require('express');
const bcrypt = require('bcrypt');
const {pool} = require('../db');
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post('/login', async (req, res) => {
    try{
        const {username, password} = req.body;
        const query = 'SELECT * FROM user_accounts WHERE username = $1 ';
        const {rows} = await pool.query(query, [username]);
        if(rows.length === 0){
            return res.status(401).json({error:'Invalid credentials'});
        }
        const user = rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            return res.status(401).json({error:'Invalid credentials'});
        }else{
            const user = rows[0];
            const payload = {
                userId: user.id,
                firstName:user.first_name,
                lastName: user.last_name
            };
            const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'1000s'});
            res.cookie('token', token, {
                httpOnly:true,
                maxAge:60 * 1000,
            });

            res.json({token});
        }
    }catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

module.exports = router;