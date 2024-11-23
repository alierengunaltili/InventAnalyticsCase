import { Model, DataTypes } from 'sequelize';
import sequelize from '@config/database';

class PastOwnership extends Model {}

PastOwnership.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    bookId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'books',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'PastOwnership',
    tableName: 'PastOwnerships',
    timestamps: false,
  }
);

export default PastOwnership;
