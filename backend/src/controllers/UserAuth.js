import jwt from 'jsonwebtoken';
import user from "../models/UsersSchema.js";

const registerUser = async (req,res)=>{
    try {
        const {name, email, password}= req.body;
        const userexist = await user.findOne({email});
        if (userexist){
            return res.status(400).json({ error: 'User already exist'})
        }
        const newUser = new user({
            name, 
            email, 
            password,
        })
        await newUser.save();
        res.json({msg :"user created successfully"})
        console.log("new user created")
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const loginUser = async (req,res)=>{
    try {
        const {email, password}= req.body
        const User = await user.findOne({ email, password });
        if (!User) return res.status(400).json({ error: 'Invalid credentials' });
        
        // Use JWT_KEY or JWT_SECRET from environment variables
        const key = process.env.JWT_KEY || process.env.JWT_SECRET;
        if (!key) {
            console.error('Neither JWT_KEY nor JWT_SECRET is set in environment variables');
            return res.status(500).json({ error: 'Server configuration error: JWT key is missing' });
        }
        
        const token = jwt.sign({ id: User._id }, key);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
        console.log(error);
    }
}

export {loginUser, registerUser}