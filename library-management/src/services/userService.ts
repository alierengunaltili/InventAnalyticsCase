import { UserGetDTO } from '@/models/dtos/userDTO';
import { UserRepository } from '@/repositories/userRepository';
import { BookService } from '@/services/bookService';
import { BookGetDTO } from '@/models/dtos/bookDTO';
export class UserService {
  private userRepository: UserRepository;
  private bookService: BookService;

  constructor() {
    this.userRepository = new UserRepository();
    this.bookService = new BookService();
  }

  async createUser(name: string): Promise<UserGetDTO> {
    const user = await this.userRepository.createUser(name);
    return { id: user.id, name: user.name }; // Return DTO
  }

  async findUserById(id: number): Promise<UserGetDTO | null> {
    const user = await this.userRepository.findUserById(id);
    if (!user) return null;
    return { id: user.id, name: user.name }; // Return DTO
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

  async borrowBook(userId: number, bookId: number): Promise<BookGetDTO | null> {
    return this.bookService.borrowBook(userId, bookId);
  }
}