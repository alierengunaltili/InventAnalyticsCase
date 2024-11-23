import { Router } from 'express';
import { BookController } from '@/controllers/bookController';
import { BaseRoute } from './baseRoute';

export class BookRoute extends BaseRoute{
    private bookController: BookController;

    constructor(){
        super();
        this.bookController = new BookController();
    }

    protected registerRoutes(): void {
        this.router.post('/', (req, res) => this.bookController.createBook(req, res));
    }
}
