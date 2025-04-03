// src/middlewares/auth.js
import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    console.log(token);
    
    if (!token) {
        return res.status(403).json({ error: 'Access Denied. No Token Provided.' });
    }
    const key = "tirth1234"

    try {
        console.log('hii');
        
        if (jwt.verify(token, key)){
            const decoded = jwt.verify(token, key)
            req.userId = decoded.id; // Attach user ID to the request
            next(); // Allow the request to proceed
        }
    } catch (err) {
        console.log(err)
        return res.status(401).json({ error: err })
    }
};

export default auth;
