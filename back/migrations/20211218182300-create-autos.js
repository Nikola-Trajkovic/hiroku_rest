'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Autos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      marka: {
        type: Sequelize.STRING
      },
      model: {
        type: Sequelize.STRING
      },
      godiste: {
        type: Sequelize.INTEGER
      },
      kilometraza: {
        type: Sequelize.INTEGER
      },
      menjac: {
        type: Sequelize.STRING
      },
      gorivo: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Autos');
  }
};