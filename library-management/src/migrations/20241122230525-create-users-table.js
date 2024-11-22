'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create Users Table
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });

    // Create Books Table
    await queryInterface.createTable('books', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      currentOwnerId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'users', // Foreign key references users table
          key: 'id',
        },
        onUpdate: 'CASCADE', // Update book's owner if user ID changes
        onDelete: 'SET NULL', // Set owner to null if user is deleted
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });

    // Create PastOwnerships Table
    await queryInterface.createTable('past_ownerships', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users', // Foreign key references users table
          key: 'id',
        },
        onUpdate: 'CASCADE', // Update if user ID changes
        onDelete: 'CASCADE', // Delete ownership if user is deleted
      },
      bookId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'books', // Foreign key references books table
          key: 'id',
        },
        onUpdate: 'CASCADE', // Update if book ID changes
        onDelete: 'CASCADE', // Delete ownership if book is deleted
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop tables in reverse order to maintain foreign key constraints
    await queryInterface.dropTable('past_ownerships');
    await queryInterface.dropTable('books');
    await queryInterface.dropTable('users');
  },
};
