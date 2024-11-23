import { BookGetDTO, SingleBookGetDTO } from '@/models/dtos/bookDTO';
import { BookRepository } from '@/repositories/bookRepository';

export class BookService {
    private bookRepository: BookRepository;

    constructor(){
        this.bookRepository = new BookRepository();
    }

    async createBook(name: string): Promise<BookGetDTO> {
        const book = await this.bookRepository.createBook(name);
        return { id: book.id, name: book.name };
    }

    async borrowBook(userId: number, bookId: number): Promise<BookGetDTO | any> {
        const book = await this.bookRepository.borrowBook(userId, bookId);
        if(!book) return "Book not found";
        return { id: book.id, name: book.name};
    }

    async getBook(bookId: number): Promise<SingleBookGetDTO | any> {
        const book = await this.bookRepository.getBook(bookId);
        if(!book) return "Book not found";
        return { id: book.id, name: book.name, score: book.score};
    }

    async getAllBooks(): Promise<BookGetDTO[]> {    
        const books = await this.bookRepository.getAllBooks();
        return books.map((book) => ({ id: book.id, name: book.name }));
    }

    async returnBook(userId: number, bookId: number, score: number): Promise<BookGetDTO | any> {
        const book = await this.bookRepository.returnBook(userId, bookId, score);
        if(!book) return "Book not found";
        return { id: book.id, name: book.name};
    }
}
