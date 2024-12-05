import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

//validate request middleware
export const validateRequest = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() }); // Send response for validation errors
    return;
  }
  next(); 
};

export const secondMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const results : any = { middleware : 'middleware 2 executing'};
  console.log(results);
  next();
}


//check if the body is empty middleware
export const checkEmptyBody = (req: Request, res: Response, next: NextFunction): void => {
    if (Object.keys(req.body).length > 0) {
        res.status(400).json({ errors: [{ msg: 'Body must be empty' }] });
        return;
    }
    next();
};
