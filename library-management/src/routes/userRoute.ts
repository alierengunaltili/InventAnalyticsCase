import { Router } from 'express';
import { UserController } from '@/controllers/userController';
import { BaseRoute } from '@/routes/baseRoute';
import { Request, Response } from 'express';
import { userValidationRules } from '@/middlewares/userValidationMiddleware';
import { validateRequest, checkEmptyBody } from '@/middlewares/validateRequest';

export class UserRoute extends BaseRoute {
  private userController: UserController;

  constructor() {
    super();
    this.userController = new UserController();
  }

  protected registerRoutes(): void {

    this.router.post(
      '/',
      userValidationRules.createUser,  
      validateRequest,                 
      this.handleAsync((req: Request, res: Response) =>
        this.userController.createUser(req, res)
      )
    );

    this.router.get('/', 
      checkEmptyBody,
      this.handleAsync((req: Request, res: Response) =>
      this.userController.getAllUsers(req, res)
    ));

    this.router.get('/:userId', 
      userValidationRules.getUserById,
      validateRequest,
      this.handleAsync((req: Request, res: Response) =>
      this.userController.getUserById(req, res)
    ));

    this.router.post('/:userId/borrow/:bookId', 
      userValidationRules.borrowBook,
      validateRequest,
      this.handleAsync((req: Request, res: Response) =>
      this.userController.borrowBook(req, res)
    ));

    this.router.post('/:userId/return/:bookId', 
      userValidationRules.returnBook,
      validateRequest,
      this.handleAsync((req: Request, res: Response) =>
      this.userController.returnBook(req, res)
    ));

    this.router.post('/:returnerId/return/:bookId/borrowedBy/:borrowerId',
      userValidationRules.returnAndBorrowBook,
      validateRequest,
      this.handleAsync((req: Request, res: Response) => 
      this.userController.returnBookAndBorrowToAnother(req, res)
    ));
  }
}

export default new UserRoute().router;
