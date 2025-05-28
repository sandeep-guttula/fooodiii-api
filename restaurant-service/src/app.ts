import express, { Request, Response } from 'express';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import restaurantRouter from './routes/restaurant.routes';
import menuRouter from './routes/menu.routes';
import orderRouter from './routes/order.routes';


dotenv.config();

const app = express();
app.use(cors({
    origin: "*",
    credentials: true,
}));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/restaurants', restaurantRouter);
app.use('/api/menu', menuRouter);
app.use('/api/orders', orderRouter);
app.get('/api/health', (_req: Request, res: Response) => {
    res.status(200).json(
        {
            message: 'Server is healthy ✅',
            service: 'Restaurant Service',
        }
    );
});


export { app };