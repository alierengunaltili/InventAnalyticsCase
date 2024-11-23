import { Router, Request, Response } from 'express';

export abstract class BaseRoute {
  public router: Router;
  constructor() {
    this.router = Router();
    this.registerRoutes();
  }

  protected abstract registerRoutes(): void;
}
