import dotenv from "dotenv"
import connectDb from "./config/db.js";
import app from './app.js';


dotenv.config({
    path:'./env'
})
connectDb()
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});
