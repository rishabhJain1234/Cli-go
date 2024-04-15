'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove the 'password' field from the 'Key' table
    await queryInterface.removeColumn('Keys', 'password');
  },

  down: async (queryInterface, Sequelize) => {
    // If needed, add logic to revert the removal
    await queryInterface.addColumn('Keys', 'password', {
      type: Sequelize.STRING,
    });
  },
};
