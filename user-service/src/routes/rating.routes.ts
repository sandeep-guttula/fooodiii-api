import { Router } from 'express';
import { addRating } from '../controllers/rating.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
import { validateRating } from '../../../shared/middleware/validation.middleware';


const router = Router();
router.post('/', authenticateToken, validateRating, addRating);

export default router;