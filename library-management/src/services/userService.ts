import { SingleUserGetDTO, UserGetDTO } from '@/models/dtos/userDTO';
import { UserRepository } from '@/repositories/userRepository';
import { BookService } from '@/services/bookService';
import { BookGetDTO } from '@/models/dtos/bookDTO';
import { PastOwnershipService } from './pastOwnershipService';
import sequelize from '@/config/database';
export class UserService {
  private userRepository: UserRepository;
  private bookService: BookService;
  private postOwnershipService: PastOwnershipService;

  constructor() {
    this.userRepository = new UserRepository();
    this.bookService = new BookService();
    this.postOwnershipService = new PastOwnershipService();
  }

  async createUser(name: string): Promise<UserGetDTO> {
    const user = await this.userRepository.createUser(name);
    return { id: user.id, name: user.name }; // Return DTO
  }

  async findUserById(id: number): Promise<SingleUserGetDTO | any> {
    const user = await this.userRepository.findUserById(id);
    if (!user) return null;
    var result: SingleUserGetDTO = { id: user.id, name: user.name, books: { present: [], past: [] } };
    result.books.present = user.presentBooks.map((book: any) => ({ name: book.name }));
    result.books.past = user.pastOwnedBooks.map((book: any) => ({ name: book.name, score: book.userScore }));
    return result;
  }

  async findAllUsers(): Promise<UserGetDTO[]> {
    const users = await this.userRepository.findAllUsers();
    return users.map((user) => ({ id: user.id, name: user.name })); // Return DTOs
  }

  async updateUser(id: number, newName: string): Promise<UserGetDTO | null> {
    const user = await this.userRepository.updateUser(id, newName);
    if (!user) return null;
    return { id: user.id, name: user.name }; // Return DTO
  }

  async deleteUser(id: number): Promise<boolean> {
    return this.userRepository.deleteUser(id);
  }

  async borrowBook(userId: number, bookId: number): Promise<BookGetDTO | any> {
    const user = await this.userRepository.findUserById(userId);
    if(!user) throw new Error("User not found");
    const res = await this.bookService.borrowBook(userId, bookId);
    return res;
  }
  
  async returnBook(userId: number, bookId: number, score: number): Promise<BookGetDTO | any> {
  
      // Start transaction
      const t = await sequelize.transaction();
      
      try {
        const userRes = await this.userRepository.returnBook(userId, bookId);
        if (!userRes) throw new Error("Book not found");
        
        const res = await this.bookService.returnBook(userId, bookId, score);
        if (res === "Book not found") throw new Error("Book not found");
        
        await this.postOwnershipService.createPastOwnership(userId, bookId, score);
        
        // Commit transaction if all operations succeed
        await t.commit();
        return res;
      } catch (error) {
        // Rollback transaction if any operation fails
        await t.rollback();
        throw error;
      }
  }
}
