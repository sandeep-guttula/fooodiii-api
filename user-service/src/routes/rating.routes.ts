import { Router } from 'express';
import { addRating } from '../controllers/rating.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();
router.post('/', authenticateToken, addRating);

export default router;