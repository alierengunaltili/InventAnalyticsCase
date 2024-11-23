import User from '@/models/entities/user';
import sequelize from '@/config/database';
import Book from '@/models/entities/book';
import PastOwnership from '@/models/entities/pastOwnership';

export class UserRepository {

  async createUser(name: string): Promise<User> {
    try{
      return await User.create({ name });
    }
    catch(error){
      throw error;
    }
  }

  async findUserById(id: number): Promise<User | any> {
    try{
      const result = await sequelize.transaction(async (transaction) => {
        const user = await User.findOne({
          where: { id: id },
          include: [
            { model: Book, as: 'pastOwnedBooks', through: {attributes: ['userScore']} },
            { model: Book , as: 'presentBooks' }, 
          ],
          transaction: transaction,
        });
        return user;
      });
      return result;
    }
    catch(error){
      throw "User fetch failed";
    }
  }

  async findAllUsers(): Promise<User[]> {
    try{
      return await User.findAll();
    }
    catch(error){
      throw error;
    }
  }

  async updateUser(id: number, newName: string): Promise<User | null> {
    try{
      const user = await User.findByPk(id);
      if (user) {
        user.name = newName;
        await user.save();
        return user;
      }
      return null;
    }
    catch(error){
      throw error;
    }
  }

  async deleteUser(id: number): Promise<boolean> {
    try{
      const deletedCount = await User.destroy({ where: { id } });
      return deletedCount > 0;
    }
    catch(error){
      throw error;
    }
  }

  async returnBook(userId: number, bookId: number): Promise<Book | any> {
    try {
        const user = await User.findOne({
          where: { id: userId },
          include: [
            { model: Book, as: 'presentBooks' }, // One-to-Many
            { model: Book, as: 'pastOwnedBooks', through: {attributes: ['userScore']} }, // Many-to-Many
          ],
        });
        if(user){
          const bookToReturn = user.presentBooks.find((book: any) => book.id === bookId);
          if (bookToReturn) {
            user.pastOwnedBooks.push(bookToReturn);
            user.presentBooks = user.presentBooks.filter((book: any) => book.id !== bookId);
            await user.save();
          }
          else{
            throw new Error(`Book not borrowed by user ${userId}`);
          }
        }
        else{
          throw new Error("User not found");
        }
        return user;
    }
    catch(error){
      throw error;
    }
  }
}

export default new UserRepository();
