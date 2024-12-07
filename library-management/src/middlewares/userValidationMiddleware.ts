import { body, param } from 'express-validator';

//user validation rules for user routes
export const userValidationRules = {
    getUserById: [
        param('userId')
            .exists()
            .withMessage('User ID is required')
            .isInt({ min: 1 })
            .withMessage('User ID must be a positive integer')
            .toInt(),
    ],
    createUser: [
        body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters'),
    ],
    borrowBook: [
        param('userId')
        .isInt({min: 1})
        .withMessage('User ID must be an integer'),
        param('bookId')
        .isInt({min: 1})
        .withMessage('Book ID must be an integer'),
    ],
    returnBook: [
        param('userId')
        .isInt({min: 1})
        .withMessage('User ID must be an integer'),
        param('bookId')
        .isInt({min: 1})
        .withMessage('Book ID must be an integer'),
        body('score')
        .isInt({min: 0})
        .withMessage('Score must be a zero or positive integer'),
    ],
};