import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database';

class PastOwnership extends Model {
  public userId!: number;
  public bookId!: number;
  public userScore!: number;

  static associate(models: any) {
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    this.belongsTo(models.Book, { foreignKey: 'bookId', as: 'book' });
  }
}

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
    userScore: {
      type: DataTypes.INTEGER,
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
