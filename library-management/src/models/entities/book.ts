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
      through: models.PastOwnership,
      foreignKey: 'bookId',
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
    tableName: 'Books',
  }
);

export default Book;
