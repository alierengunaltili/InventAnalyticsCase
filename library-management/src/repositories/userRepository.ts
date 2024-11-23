import { Op } from 'sequelize';
import User from '@/models/entities/user';
import { safeExecute } from '@/utils/repositoryErrorHandler';
export class UserRepository {

  async createUser(name: string): Promise<User> {
    return safeExecute(() => User.create({ name }));
  }

  async findUserById(id: number): Promise<User | null> {
    return safeExecute(() => User.findByPk(id));
  }

  async findAllUsers(filter?: string): Promise<User[]> {
    const whereClause = filter
      ? { name: { [Op.like]: `%${filter}%` } }
      : undefined;
    return safeExecute(() => User.findAll({ where: whereClause }));
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
}

export default new UserRepository();
