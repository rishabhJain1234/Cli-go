'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Requests', 'Requests_ServerId_fkey');
    await queryInterface.addConstraint('Requests', {
      fields: ['ServerId'],
      type: 'foreign key',
      name: 'server_cascade_fkey',
      references: {
        table: 'Servers',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.removeConstraint('Requests', 'Requests_UserId_fkey');
    await queryInterface.addConstraint('Requests', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'user_cascade_fkey',
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Requests', 'server_cascade_fkey');
    await queryInterface.addConstraint('Requests', {
      fields: ['ServerId'],
      type: 'foreign key',
      name: 'Requests_ServerId_fkey',
      references: {
        table: 'Servers',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    await queryInterface.removeConstraint('Requests', 'user_cascade_fkey');
    await queryInterface.addConstraint('Requests', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'Requests_UserId_fkey',
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  },
};
