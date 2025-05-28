import express, { Request, Response } from 'express';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRouter from "./routes/auth.routes"


dotenv.config();

const app = express();
app.use(cors({
    origin: "*",
    credentials: true,
}));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRouter);

app.get('/api/health', (_req: Request, res: Response) => {
    res.status(200).json(
        {
            message: 'Server is healthy ✅',
            service: 'User Service',
        }
    );
});

app.use((err: Error, req: Request, res: Response, next: any) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});


export { app };