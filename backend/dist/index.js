import express from 'express';
import authRouter from './routes/auth.route.js';
import dbConnection from './config/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const corsOptions = {
    origin: 'http://localhost:3000', // Adjust this to your frontend's URL
    credentials: true, // Allow cookies to be sent
};
const app = express();
app.use(cors(corsOptions));
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(cookieParser());
await dbConnection();
app.use('/api/auth', authRouter);
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
