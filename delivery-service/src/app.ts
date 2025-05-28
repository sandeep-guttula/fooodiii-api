import express, { Request, Response } from 'express';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';



dotenv.config();

const app = express();
app.use(cors({
    origin: "*",
    credentials: true,
}));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/api/health', (_req: Request, res: Response) => {
    res.status(200).json(
        {
            message: 'Server is healthy ✅',
            service: 'Delivery Service',
        }
    );
});


export { app };