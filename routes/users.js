const express = require('express');
const { pool } = require('../db');
const bcrypt = require('bcrypt');
const router = express.Router();

router.get('/all', async(req, res) => {
    try{
        const query = 'SELECT * FROM user_accounts';
        const {rows} = await pool.query(query);
        res.json(rows);
    }catch(error){
        console.error('Error retrieving user accounts:', error);
        res.status(500).json({error:'An error occurred'});
    }
});

router.post('/register', async(req, res) => {
    try{
        const {first_name, last_name, username, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = `
            INSERT INTO user_accounts (first_name, last_name, username, password)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const values = [first_name, last_name, username, hashedPassword];
        const {rows} = await pool.query(query, values);
        //
        // const user = rows[0];
        // const payload = {
        //     userId: user.id
        // };
        // const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'60s'});

        res.json(rows);
    }catch(error){
        console.error('Error creating user account:', error);
        res.status(500).json({error:'An error occurred', message:error.message});
    }
});

router.delete('/delete/:id', async (req,res) => {
    try{
        const userId = req.params.id;
        const query = 'DELETE FROM user_accounts WHERE  id = $1';
        const {rowCount} = await pool.query(query, [userId]);
        if(rowCount === 0 ){
            return res.status(404).json({error: 'User not found'});
        }
        res.json({message: 'User account deleted successfully'});
    }catch(error){
        console.error('Error deleting user account:', error);
        res.status(500).json({error:'An error occurred', message:error.message});
    }
})

module.exports = router;