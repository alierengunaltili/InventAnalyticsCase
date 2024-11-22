import { Model, DataTypes } from 'sequelize';
import sequelize from '@config/database';
import User from '@/models/entities/user';

class Book extends Model {
  public id!: number;
  public name!: string;
  public currentOwnerId!: number | null; // Foreign key for current owner
}

Book.init(
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
    currentOwnerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Book',
    tableName: 'books',
  }
);

// Associations
Book.belongsTo(User, { foreignKey: 'currentOwnerId', as: 'currentOwner' }); // Many-to-One
Book.belongsToMany(User, { through: 'PastOwnerships', as: 'pastUsers' }); // Many-to-Many

export default Book;
