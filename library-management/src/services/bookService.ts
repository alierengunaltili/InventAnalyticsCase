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

    async borrowBook(userId: number, bookId: number): Promise<BookGetDTO | null> {
        const book = await this.bookRepository.borrowBook(userId, bookId);
        if(!book) return null;
        return { id: book.id, name: book.name};
    }
}