const jwt = require('jsonwebtoken');
require('dotenv').config();

const VerifyToken = (req, res, next) => {
    const accessToken = req.headers['x-access-token'];
    console.log('access token - ', accessToken);
    if(!accessToken)return res.status(401).json({msg:'not authorized'});
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if(error) return res.status(403).json({msg:'verify token failed'});
        next();
    })
}

module.exports = VerifyToken
