import express, { Express } from 'express';
import { UserRoute } from '@/routes/userRoute';

export class App {
    private app: Express;

    constructor() {
        this.app = express();
        this.registerRoutes();
    }
    private registerRoutes(): void {
        this.app.use('/users', new UserRoute().router); 
    }
}
