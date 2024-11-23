'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create Users Table
    await queryInterface.createTable('Users', {
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
    await queryInterface.createTable('Books', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      score: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: -1,
      },
      ownerCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      currentOwnerId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users', // Foreign key references users table
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
    await queryInterface.createTable('PastOwnerships', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // Foreign key references users table
          key: 'id',
        },
        onUpdate: 'CASCADE', // Update if user ID changes
        onDelete: 'CASCADE', // Delete ownership if user is deleted
      },
      bookId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Books', // Foreign key references books table
          key: 'id',
        },
        onUpdate: 'CASCADE', // Update if book ID changes
        onDelete: 'CASCADE', // Delete ownership if book is deleted
      },
      score: {
        type: Sequelize.INTEGER,
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
  },

  async down(queryInterface, Sequelize) {
    // Drop tables in reverse order to maintain foreign key constraints
    await queryInterface.dropTable('PastOwnerships');
    await queryInterface.dropTable('Books');
    await queryInterface.dropTable('Users');
  },
};
