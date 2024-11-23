import { Model, DataTypes } from 'sequelize';
import sequelize from '@config/database';

class User extends Model {
  public id!: number;
  public name!: string;

  static associate(models: any) {
    this.hasMany(models.Book, { foreignKey: 'currentOwnerId', as: 'presentBooks' });
    this.belongsToMany(models.Book, {
      through: 'PastOwnerships',
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
