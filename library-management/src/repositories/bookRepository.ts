import Book from '@/models/entities/book';
import { Op } from 'sequelize';
import { safeExecute } from '@/utils/repositoryErrorHandler';
import sequelize from '@/config/database';
export class BookRepository {

    async createBook(name: string): Promise<Book> {
        return safeExecute(() => Book.create({ name }));
    }

    async borrowBook(userId: number, bookId: number): Promise<Book | null> {
        //transaction scope 
        try {
            const result = await sequelize.transaction(async (transaction) => {
                const book = await Book.findByPk(bookId, { transaction });
                if(book){
                    if(book.currentOwnerId){
                        return null;
                    }
                    else{
                        book.currentOwnerId = userId;
                        book.ownerCount += 1;
                        await book.save({ transaction });
                        return book;
                    }
                }
                else{
                    return null;
                }
            });
            return result;
        } catch (error) {
            console.error('Error borrowing book:', error);
            throw error;
        }
    }

    async getBook(bookId: number): Promise<Book | null> {
        return safeExecute(() => Book.findByPk(bookId));
    }

    async getAllBooks(): Promise<Book[]> {
        return safeExecute(() => Book.findAll());
    }
}
