import User from './entities/user';
import Book from './entities/book';
import sequelize from '@config/database';

const models = {
  User,
  Book,
};

// Initialize all models
Object.values(models).forEach((model) => {
    if (model.init) {
      model.init(model.getAttributes(), { sequelize });
    }
});

// Register associations
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});
console.log("User Associations",User.associations);
console.log("Book Associations",Book.associations);


export { sequelize, User, Book };
export default models;
