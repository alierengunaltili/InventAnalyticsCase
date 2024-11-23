import { Router } from 'express';
import { UserController } from '@/controllers/userController';
import { BaseRoute } from '@/routes/baseRoute';
import { Request, Response } from 'express';
export class UserRoute extends BaseRoute {
  private userController: UserController;

  constructor() {
    super();
    this.userController = new UserController();
  }

  protected registerRoutes(): void {
    this.router.post('/', this.handleAsync((req: Request, res: Response) =>
      this.userController.createUser(req, res)
    ));

    this.router.get('/', this.handleAsync((req: Request, res: Response) =>
      this.userController.getAllUsers(req, res)
    ));

    this.router.post('/:userId/borrow/:bookId', this.handleAsync((req: Request, res: Response) =>
      this.userController.borrowBook(req, res)
    ));
  }
}

export default new UserRoute().router;
