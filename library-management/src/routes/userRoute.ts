import { Router } from 'express';
import { UserController } from '@/controllers/userController';

export class UserRoute {
  public router: Router;
  private userController: UserController;

  constructor() {
    this.userController = new UserController();
    this.router = Router();
    this.registerRoutes();
  }

  private registerRoutes(): void {
    this.router.post('/users', (req, res) => this.userController.createUser(req, res));
  }
}

export default new UserRoute().router;
