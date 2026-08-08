import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import envFile from "../config/envFile.js";
class AuthController {
    constructor() {
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.refreshSession = this.refreshSession.bind(this);
        this.logout = this.logout.bind(this);
    }
    REFRESHCOOKIEOPTIONS = {
        httpOnly: true, // Safeguards against cross-site scripting (XSS)
        secure: envFile.nodeEnv === 'production', // Transmit exclusively over HTTPS in prod
        sameSite: 'strict', // Neutralizes Cross-Site Request Forgery (CSRF)
        maxAge: 7 * 24 * 60 * 60 * 1000, // Matching 7-day lifespan parameter
    };
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid credentials" });
            }
            ;
            const userPayload = {
                userId: user._id.toString(),
                email: email,
                role: user.role,
            };
            // 1. Generate short-lived Access Token (15-minute validity window)
            const accessToken = jwt.sign(userPayload, envFile.jwtAccessSecret, { expiresIn: '15m' });
            // 2. Generate long-lived Refresh Token (7-day validity window)
            const refreshToken = jwt.sign(userPayload, envFile.jwtRefreshSecret, { expiresIn: '7d' });
            res.cookie('refreshToken', refreshToken, this.REFRESHCOOKIEOPTIONS);
            return res.status(200).json({
                message: 'Authentication successful',
                accessToken,
                expiresIn: '15m',
                userPayload
            });
        }
        catch (error) {
            console.error("Login error:", error);
            res.status(400).json({ message: "Error logging in", error });
        }
    }
    async register(req, res) {
        try {
            const { email } = req.body;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }
            ;
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            const user = await User.create({ ...req.body, password: hash });
            res.status(201).json({ status: "success", message: "User created successfully" });
        }
        catch (error) {
            res.status(400).json({ message: "Error creating user", error });
        }
    }
    async refreshSession(req, res) {
        console.log("Refresh Session Endpoint Hit", req.cookies?.refreshToken);
        const refreshToken = req.cookies?.refreshToken;
        console.log("Received Refresh Token:", refreshToken);
        if (!refreshToken) {
            return res.status(401).json({ message: 'Refresh token not found, authorization denied' });
        }
        ;
        try {
            // Verify validity of the incoming refresh token payload
            const decoded = jwt.verify(refreshToken, envFile.jwtRefreshSecret);
            const newUserPayload = {
                userId: decoded.userId,
                email: decoded.email,
                role: decoded.role,
            };
            // Create a new fresh 15-minute access token
            const newAccessToken = jwt.sign(newUserPayload, envFile.jwtAccessSecret, { expiresIn: '15m' });
            return res.status(200).json({
                accessToken: newAccessToken,
                expiresIn: '15m',
            });
        }
        catch (error) {
            // Clear dead/invalid refresh cookie implicitly upon parsing failure
            res.clearCookie('refreshToken', this.REFRESHCOOKIEOPTIONS);
            return res.status(403).json({ message: 'Refresh token is expired or altered. Re-login required.' });
        }
    }
    async logout(req, res) {
        res.clearCookie('refreshToken', this.REFRESHCOOKIEOPTIONS);
        return res.status(200).json({ message: 'Logged out successfully' });
    }
    ;
}
;
export default new AuthController();
