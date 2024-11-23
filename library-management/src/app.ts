import express, { Express } from 'express';
import { UserRoute } from '@/routes/userRoute';

export class App {
  public app: Express;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.registerRoutes();
  }

  /**
   * Initialize middlewares
   */
  private initializeMiddlewares(): void {
    this.app.use(express.json()); // Parse JSON request bodies
    this.app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
  }

  /**
   * Register application routes
   */
  private registerRoutes(): void {
    this.app.use('/users', new UserRoute().router);
  }
}
