import { Model, DataTypes } from 'sequelize';
import sequelize from '@config/database';
import Book from '@/models/entities/book';

class User extends Model {
  public id!: number;
  public name!: string;
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

// Associations
User.hasMany(Book, { foreignKey: 'currentOwnerId', as: 'presentBooks' }); // One-to-Many
User.belongsToMany(Book, { through: 'PastOwnerships', as: 'pastBooks' }); // Many-to-Many

export default User;
