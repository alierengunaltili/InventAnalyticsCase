import express, { Express } from 'express';
import { UserRoute } from '@/routes/userRoute';
import { BookRoute } from '@/routes/bookRoute';

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
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  /**
   * Register application routes
   */
  private registerRoutes(): void {
    this.app.use('/users', new UserRoute().router);
    this.app.use('/books', new BookRoute().router);
  }
}
