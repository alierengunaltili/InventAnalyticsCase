import { Router } from 'express';
import 'tsconfig-paths/register';
import { BookController } from '../controllers/bookController';
import { BaseRoute } from './baseRoute';
import { Request, Response } from 'express';
import { bookValidationRules } from '../middlewares/bookValidationMiddleware';
import { validateRequest, checkEmptyBody } from '../middlewares/validateRequest';

export class BookRoute extends BaseRoute{
    private bookController: BookController;

    constructor(){
        super();
        this.bookController = new BookController();
    }

    protected registerRoutes(): void {
        this.router.post('/', 
            bookValidationRules.createBook,
            validateRequest,
            this.handleAsync((req: Request, res: Response) =>
            this.bookController.createBook(req, res)
        ));

        this.router.get('/',
            checkEmptyBody,
            this.handleAsync((req: Request, res: Response) =>
            this.bookController.getAllBooks(req, res)
        ));


        this.router.get('/:bookId', 
            bookValidationRules.getBook,
            validateRequest,
            this.handleAsync((req: Request, res: Response) =>
            this.bookController.getBookById(req, res)
        ));
    }
}
