import { Router, Request, Response, NextFunction } from 'express';

export abstract class BaseRoute {
  public router: Router;
  constructor() {
    this.router = Router();
    this.registerRoutes();
  }

  protected abstract registerRoutes(): void;

  protected handleAsync(routeHandler: (req: Request, res: Response, next: NextFunction) => Promise<void>) {
    return (req: Request, res: Response, next: NextFunction) => {
      routeHandler(req, res, next).catch(next);
    };
  }
}
