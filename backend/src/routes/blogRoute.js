import { Router } from "express";
import generateBlog, { getHistory, deleteBlog, clearHistory } from '../controllers/BlogGen.js'
import auth from "../middlewares/auth.js";
const router = Router();
router.post('/generateblog',auth, generateBlog)
router.get('/history', auth, getHistory);
router.delete('/history/:id', auth, deleteBlog);
router.delete('/history', auth, clearHistory);
export default router
