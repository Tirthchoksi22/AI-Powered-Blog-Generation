import mongoose from "mongoose";

const connectDb = async ()=>{
    try {
        const connectionResponse = await mongoose.connect(`${process.env.MONGODB_URI}/Ai-Blog-Generation`);
        console.log(`\n MongoDB connected !! DB Host: ${connectionResponse.connection.host}`);
        
    } catch (error) {
        console.log("Connection Error:", error);
        process.exit(1);
        
    }
}
export default connectDb;