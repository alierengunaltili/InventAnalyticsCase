import { body, param } from 'express-validator';

//book validation rules for book routes
export const bookValidationRules = {
    getBook: [
        param('bookId')
        .exists()
        .withMessage('Book ID is required')
        .isInt({ min: 1 })
        .withMessage('Book ID must be a positive integer')
        .toInt(),
    ],
    createBook: [
        body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
    ],
    getWithPastOwners: [
        param('bookId')
        .exists()
        .withMessage("Book ID is required")
        .isInt( { min : 1})
        .withMessage('Book ID must be a positive integer')
        .toInt(),
    ]
}