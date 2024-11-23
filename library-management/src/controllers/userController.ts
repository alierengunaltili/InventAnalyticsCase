import { Request, Response } from 'express';
import { UserService } from '@/services/userService';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const name: string = req.body.name;
      if (!name) {
        res.status(400).json({ error: 'Name is required' });
        return;
      }
      const user = await this.userService.createUser(name);
      res.status(201).json(user); // Return created user
    } catch (error) {
      console.error('Error in createUser:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.userId, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid ID' });
        return;
      }
      const user = await this.userService.findUserById(id);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      console.error('Error in getUserById:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.findAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error in getAllUsers:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid ID' });
        return;
      }
      const deleted = await this.userService.deleteUser(id);
      if (!deleted) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.status(204).send(); // No content for successful deletion
    } catch (error) {
      console.error('Error in deleteUser:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async borrowBook(req: Request, res: Response): Promise<void> {
        try {
            const userId: number = parseInt(req.params.userId);
            const bookId: number = parseInt(req.params.bookId);
            const book = await this.userService.borrowBook(userId, bookId);
            if(book === "User not found") res.status(404).json({ error: 'User not found' });
            if(book === "Book not found") res.status(404).json({ error: 'Book not found' });
            res.status(200).json(book);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async returnBook(req: Request, res: Response) : Promise<void> {
      try{
        const userId: number = parseInt(req.params.userId);
        const bookId: number = parseInt(req.params.bookId);
        const score: number = parseInt(req.body.score);
        const book = await this.userService.returnBook(userId, bookId, score);
        if(book === "User not found") res.status(404).json({ error: 'User not found' });
        if(book === "Book not found") res.status(404).json({ error: 'Book not found' });
        res.status(200).json(book);
      }
      catch(error){
        res.status(500).json({ error: 'Internal server error' });
      }
    }

}
