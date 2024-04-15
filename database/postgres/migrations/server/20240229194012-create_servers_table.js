'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Servers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      users: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      ipAddress: {
        type: Sequelize.STRING,
        validate: {
          isIP: {
            args: [4],
            msg: 'Invalid IP Address',
          },
        },
      },
      port: {
        type: Sequelize.INTEGER,
        validate: {
          isInt: {
            min: 0,
            max: 65536,
            msg: 'Invalid Port',
          },
        },
        defaultValue: 22,
      },
      alias: {
        type: Sequelize.STRING,
        unique: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Servers');
  },
};
