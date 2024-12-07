import Book from '@/models/entities/book';
import sequelize from '@/config/database';
export class BookRepository {

    async createBook(name: string): Promise<Book> {
        try{
            return await Book.create({ name });
        }
        catch(error){
            throw error;
        }
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

    async getBookById(bookId: number): Promise<Book | null> {
        try{
            return await Book.findByPk(bookId);
        }
        catch(error){
            throw error;
        }
    }

    async getAllBooks(): Promise<Book[]> {
        try{
            return await Book.findAll();
        }
        catch(error){
            throw error;
        }
    }

    async returnBook(userId: number, bookId: number, score: number): Promise<Book | any> {

        try {
                const book = await Book.findByPk(bookId);
                if(book){
                    if(book.currentOwnerId !== userId){
                        throw new Error(`Book not borrowed by user ${userId}`);
                    }
                    //if book has no score, set the score to the score of the user
                    if(book.score === -1){
                        book.score = score;
                        book.ownerCount = 1;
                    }
                    else{
                        var totalScore = book.score * book.ownerCount;
                        book.ownerCount = book.ownerCount + 1;
                        totalScore = totalScore + score;
                        book.score = totalScore / book.ownerCount;    
                    }
                    book.currentOwnerId = null;
                    await book.save();
                    return book;
                }
                else{
                    throw new Error("Book not found");
                }
        }
        catch(error){
            throw error;
        }
    }
}
