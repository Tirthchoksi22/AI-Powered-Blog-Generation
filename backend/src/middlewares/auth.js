// src/middlewares/auth.js
import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    console.log(token);
    
    if (!token) {
        return res.status(403).json({ error: 'Access Denied. No Token Provided.' });
    }
    
    // Use JWT_KEY or JWT_SECRET from environment variables
    const key = process.env.JWT_KEY || process.env.JWT_SECRET;
    
    if (!key) {
        console.error('Neither JWT_KEY nor JWT_SECRET is set in environment variables');
        return res.status(500).json({ error: 'Server configuration error: JWT key is missing' });
    }

    try {
        console.log('Verifying token...');
        
        const decoded = jwt.verify(token, key);
        req.userId = decoded.id; // Attach user ID to the request
        next(); // Allow the request to proceed
    } catch (err) {
        console.log('Token verification failed:', err);
        return res.status(401).json({ error: 'Invalid token' });
    }
};

export default auth;
