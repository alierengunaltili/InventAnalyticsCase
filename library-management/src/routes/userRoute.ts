import { Router } from 'express';
import { UserController } from '@/controllers/userController';
import { BaseRoute } from '@/routes/baseRoute';
export class UserRoute extends BaseRoute {
  private userController: UserController;

  constructor() {
    super();
    this.userController = new UserController();
  }

  protected registerRoutes(): void {
    this.router.post('/', (req, res) => this.userController.createUser(req, res));
    this.router.get('/', (req, res) => this.userController.getAllUsers(req, res));
    this.router.post('/:userId/borrow/:bookId', (req, res) => this.userController.borrowBook(req, res));
  }
}

export default new UserRoute().router;
