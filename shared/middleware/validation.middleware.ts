import { Request, Response, NextFunction, RequestHandler } from 'express';
import { body, param, validationResult } from 'express-validator';

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            error: 'Validation failed',
            details: errors.array()
        });
        return;
    }
    next();
};

export const validateSignup: RequestHandler[] = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2-50 characters'),
    body('email')
        .isEmail()
        .withMessage('Valid email is required')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    body('role')
        .optional()
        .isIn(['user', 'restaurant_owner', 'delivery_agent', 'admin'])
        .withMessage('Invalid role'),
    handleValidationErrors
];

export const validateLogin: RequestHandler[] = [
    body('email')
        .isEmail()
        .withMessage('Valid email is required')
        .normalizeEmail(),
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
    handleValidationErrors
];

export const validateRestaurant = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Restaurant name is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('Name must be between 2-100 characters'),
    body('address')
        .trim()
        .notEmpty()
        .withMessage('Address is required')
        .isLength({ min: 10, max: 200 })
        .withMessage('Address must be between 10-200 characters'),
    handleValidationErrors
];

export const validateRestaurantStatus = [
    body('isOnline')
        .isBoolean()
        .withMessage('isOnline must be a boolean'),
    handleValidationErrors
];

export const validateMenuItem = [
    body('restaurantId')
        .isUUID()
        .withMessage('Valid restaurant ID is required'),
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Item name is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('Name must be between 2-100 characters'),
    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Description must not exceed 500 characters'),
    body('price')
        .isFloat({ min: 0.01 })
        .withMessage('Price must be a positive number'),
    body('isAvailable')
        .optional()
        .isBoolean()
        .withMessage('isAvailable must be a boolean'),
    handleValidationErrors
];

export const validateOrder = [
    body('restaurantId')
        .isUUID()
        .withMessage('Valid restaurant ID is required'),
    body('items')
        .isArray({ min: 1 })
        .withMessage('At least one item is required'),
    body('items.*.menuItemId')
        .isUUID()
        .withMessage('Valid menu item ID is required'),
    body('items.*.quantity')
        .isInt({ min: 1, max: 50 })
        .withMessage('Quantity must be between 1-50'),
    handleValidationErrors
];

export const validateOrderStatus = [
    body('status')
        .isIn(['placed', 'accepted', 'rejected', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'])
        .withMessage('Invalid order status'),
    handleValidationErrors
];

export const validateDeliveryStatus = [
    body('status')
        .isIn(['assigned', 'picked_up', 'delivered'])
        .withMessage('Invalid delivery status'),
    handleValidationErrors
];

export const validateAvailability = [
    body('isAvailable')
        .isBoolean()
        .withMessage('isAvailable must be a boolean'),
    handleValidationErrors
];

export const validateRating = [
    body('orderId')
        .isUUID()
        .withMessage('Valid order ID is required'),
    body('ratingType')
        .isIn(['restaurant', 'delivery_agent'])
        .withMessage('Invalid rating type'),
    body('rating')
        .isInt({ min: 1, max: 5 })
        .withMessage('Rating must be between 1-5'),
    body('comment')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Comment must not exceed 500 characters'),
    handleValidationErrors
];

export const validateUUIDParam = (paramName: string) => [
    param(paramName)
        .isUUID()
        .withMessage(`Valid ${paramName} is required`),
    handleValidationErrors
];