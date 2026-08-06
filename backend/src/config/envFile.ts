import dotenv from "dotenv";

dotenv.config();

const envFile = {
    mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/pg-site",
    nodeEnv: process.env.NODE_ENV || 'development',
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET as string,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET as string,
};

export default envFile;