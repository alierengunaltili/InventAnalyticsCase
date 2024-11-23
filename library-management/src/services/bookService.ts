import { BookGetDTO } from '@/models/dtos/bookDTO';
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
}