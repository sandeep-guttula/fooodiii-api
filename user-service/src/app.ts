import express, { Request, Response } from 'express';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRouter from "./routes/auth.routes"
import orderRouter from './routes/order.routes';
import restaurantRouter from './routes/restaurant.routes';
import ratingRouter from './routes/rating.routes';

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

app.use('/api/orders', orderRouter);
app.use('/api/restaurants', restaurantRouter);
app.use('/api/ratings', ratingRouter);

app.get('/api/health', (_req: Request, res: Response) => {
    res.status(200).json(
        {
            message: 'Server is healthy ✅',
            service: 'User Service',
        }
    );
});


export { app };