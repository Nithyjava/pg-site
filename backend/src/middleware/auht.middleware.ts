import { NextFunction, Request, Response } from "express";
import { UserPayload } from "../types/express.js";
import jwt from 'jsonwebtoken';
import envFile from "../config/envFile.js";


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

    try {
      const authHeader = req.headers.authorization;
      
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Authorization token missing or malformed' });
    };
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, envFile.jwtAccessSecret) as UserPayload;
    req.user = decoded; // Attach standard payload context to request
    next();

    }catch (error) {
        if (error.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Access token expired', code: 'TOKEN_EXPIRED' });
        }
            return res.status(403).json({ message: 'Invalid or altered authentication token' });
        }
    

}