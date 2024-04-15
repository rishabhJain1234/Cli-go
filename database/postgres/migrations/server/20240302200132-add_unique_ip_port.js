'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Servers', {
      type: 'unique',
      fields: ['ipAddress', 'port'],
      name: 'unique_ipAddress_port_constraint',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Servers', 'unique_ipAddress_port_constraint');
  },
};
