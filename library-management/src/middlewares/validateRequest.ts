import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateRequest = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() }); // Send response for validation errors
    return;
  }
  next(); 
};


export const checkEmptyBody = (req: Request, res: Response, next: NextFunction): void => {
    if (Object.keys(req.body).length > 0) {
        res.status(400).json({ errors: [{ msg: 'Body must be empty' }] });
        return;
    }
    next();
};
