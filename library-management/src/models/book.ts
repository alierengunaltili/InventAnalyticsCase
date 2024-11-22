import { Model, DataTypes } from 'sequelize';
import sequelize from '@config/database';

interface BookAttributes {
  id: number;
  name: string;
  past_owner_count: number;
  is_available: boolean;
}

class Book extends Model<BookAttributes> implements BookAttributes {
  public id!: number;
  public name!: string;
  public past_owner_count!: number;
  public is_available!: boolean;
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
    past_owner_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'Book',
    tableName: 'books',
    timestamps: true, // This will add createdAt and updatedAt fields
  }
);

export default Book;