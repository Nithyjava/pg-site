import { Router } from 'express';
import authController from '../controller/auth.controller.js';
import { authMiddleware } from '../middleware/auht.middleware.js';
import User from '../models/user.model.js';
const authRouter = Router();
authRouter.post('/login', authController.login);
authRouter.post('/register', authController.register);
authRouter.post('/refresh', authController.refreshSession);
authRouter.post('/logout', authController.logout);
authRouter.get('/me', authMiddleware, async (req, res) => {
    const finalUser = await User.findById(req.user?.userId).select('-password');
    if (!finalUser) {
        return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User is authenticated", user: finalUser });
});
export default authRouter;
