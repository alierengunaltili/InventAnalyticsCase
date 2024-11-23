import { Request, Response } from 'express';
import { BookService } from '@/services/bookService';

export class BookController {
    private bookService: BookService;

    constructor(){
        this.bookService = new BookService();
    }

    async createBook(req: Request, res: Response): Promise<void> {
        try {
            const name: string = req.body.name;
            const book = await this.bookService.createBook(name);
            res.status(201).json(book);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async borrowBook(req: Request, res: Response): Promise<void> {
        try {
            const userId: number = parseInt(req.params.userId);
            const bookId: number = parseInt(req.params.bookId);
            const book = await this.bookService.borrowBook(userId, bookId);
            res.status(200).json(book);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getBook(req: Request, res: Response): Promise<void> {
        try {
            const bookId: number = parseInt(req.params.bookId);
            const book = await this.bookService.getBook(bookId);
            res.status(200).json(book);
        } catch (error : any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAllBooks(req: Request, res: Response): Promise<void> {
        try {
            const books = await this.bookService.getAllBooks();
            res.status(200).json(books);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
