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
        const result = await sequelize.transaction(async (transaction) => {
            const book = await Book.findByPk(bookId, { transaction });
            if(book){
                if(book.currentOwnerId){
                    throw new Error(`Book already borrowed by user ${book.currentOwnerId}`);
                }
                else{
                    book.currentOwnerId = userId;
                    book.ownerCount += 1;
                    await book.save({ transaction });
                    return book;
                }
            }
            else{
                throw new Error("Book not found");
            }
        });
        return result;
    }

    async getBook(bookId: number): Promise<Book | null> {
        return safeExecute(() => Book.findByPk(bookId));
    }

    async getAllBooks(): Promise<Book[]> {
        return safeExecute(() => Book.findAll());
    }

    async returnBook(userId: number, bookId: number, score: number): Promise<Book | any> {

        try {
            const result = await sequelize.transaction(async (transaction) => {
                const book = await Book.findByPk(bookId, { transaction });
                if(book){
                    book.currentOwnerId = null;
                    var totalScore = book.score * book.ownerCount;
                    book.ownerCount = book.ownerCount + 1;
                    totalScore = totalScore + score;
                    book.score = totalScore / book.ownerCount;
                    await book.save({ transaction });
                    return book;
                }
                else{
                    return null;
                }
            });
        }
        catch(error){
            console.error('Error returning book:', error);
            throw error;
        }
    }
}
