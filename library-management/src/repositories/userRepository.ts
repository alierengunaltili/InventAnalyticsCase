import User from '@/models/entities/user';
import { safeExecute } from '@/utils/repositoryErrorHandler';
import sequelize from '@/config/database';
import Book from '@/models/entities/book';
import PastOwnership from '@/models/entities/pastOwnership';

export class UserRepository {

  async createUser(name: string): Promise<User> {
    return safeExecute(() => User.create({ name }));
  }

  async findUserById(id: number): Promise<User | any> {
    try{
      const result = await sequelize.transaction(async (transaction) => {
        const user = await User.findOne({
          where: { id: id },
          include: [
            { model: Book, as: 'pastOwnedBooks' },
            { model: Book , as: 'presentBooks' }, 
          ],
          transaction: transaction,
        });
        return user;
      });
      return result;
    }
    catch(error){
      return error;
    }
  }

  async findAllUsers(): Promise<User[]> {
    return safeExecute(() => User.findAll());
  }

  async updateUser(id: number, newName: string): Promise<User | null> {
    return safeExecute(async () => {
      const user = await User.findByPk(id);
      if (user) {
        user.name = newName;
        await user.save();
        return user;
      }
      return null;
    });
  }

  async deleteUser(id: number): Promise<boolean> {
    return safeExecute(async () => {
      const deletedCount = await User.destroy({ where: { id } });
      return deletedCount > 0;
    });
  }

  async returnBook(userId: number, bookId: number): Promise<Book | any> {
    try {
        const user = await User.findOne({
          where: { id: userId },
          include: [
            { model: Book, as: 'presentBooks' }, // One-to-Many
            { model: PastOwnership, as: 'pastOwnedBooks' }, // Many-to-Many
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
      return null;
    }
  }
}

export default new UserRepository();
