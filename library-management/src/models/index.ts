import User from './entities/user';
import Book from './entities/book';
import sequelize from '@config/database';
import PastOwnership from './entities/pastOwnership';

const models = {
  User,
  Book,
};

function isUserModel(model: any): model is typeof User {
  return model === User;
}

function isBookModel(model: any): model is typeof Book {
  return model === Book;
}

function isPastOwnershipModel(model: any): model is typeof PastOwnership {
  return model === PastOwnership;
}

// Step 1: Initialize all models
Object.values(models).forEach((model) => {
  console.log(`Initializing model: ${model.name}`); // Debug: Log model name

  if (isUserModel(model)) {
    model.init(User.getAttributes(), { sequelize });
  } else if (isBookModel(model)) {
    model.init(Book.getAttributes(), { sequelize });
  } 
});

// Step 2: Register associations
Object.values(models).forEach((model) => {
  console.log(`Registering associations for model: ${model.name}`); // Debug: Log model name
  if (model.associate) {
    model.associate(models);
  }
});

// Step 3: Log associations
console.log('User Associations:', User.associations); // Check User associations
console.log('Book Associations:', Book.associations); // Check Book associations

export { sequelize, User, Book };
export default models;
