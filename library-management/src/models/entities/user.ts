import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database';
import Book from './book';

class User extends Model {
  public id!: number;
  public name!: string;
  public presentBooks!: Book[];
  public pastOwnedBooks!: Book[];

  static associate(models: any) {
    this.hasMany(models.Book, { foreignKey: 'currentOwnerId', as: 'presentBooks' });
    this.belongsToMany(models.Book, {
      through: models.PastOwnership,
      foreignKey: 'userId',
      otherKey: 'bookId',
      as: 'pastOwnedBooks',
    });
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
    tableName: 'Users',
  }
);

export default User;
