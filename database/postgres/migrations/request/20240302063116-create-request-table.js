'use strict';

/** @type {import('sequelize-cli').Migration} */

const constants = require('../../../../constants/models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create 'Requests' table
    await queryInterface.createTable('Requests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ackBy: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // Assuming your User model is named 'User' and Sequelize will pluralize it to 'Users' as the table name
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      status: {
        type: Sequelize.ENUM,
        values: Object.values(constants.requestStatuses),
        allowNull: false,
        defaultValue: constants.requestStatuses.PENDING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      ServerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Servers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop 'Requests' table
    await queryInterface.dropTable('Requests');
  },
};
