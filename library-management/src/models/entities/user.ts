import { Model, DataTypes } from 'sequelize';
import sequelize from '@config/database';
import Book from '@/models/entities/book';

class User extends Model {
  public id!: number;
  public name!: string;
  static associate(models: any) {
    this.hasMany(models.Book, { foreignKey: 'currentOwnerId', as: 'presentBooks' });
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  }
);
export default User;