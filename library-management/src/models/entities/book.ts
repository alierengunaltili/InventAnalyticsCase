import { Model, DataTypes } from 'sequelize';
import sequelize from '@config/database';

class Book extends Model {
  public id!: number;
  public name!: string;
  public currentOwnerId!: number | null;
  public score!: number;
  public ownerCount!: number;

  static associate(models: any) {
    this.belongsTo(models.User, { foreignKey: 'currentOwnerId', as: 'currentOwner' });
    this.belongsToMany(models.User, {
      through: 'past_ownerships',
      foreignKey: 'bookId',
      otherKey: 'userId',
      as: 'pastOwners',
    });
  }
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
    score: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: -1,
    },
    ownerCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    currentOwnerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Book',
    tableName: 'books',
  }
);

export default Book;
