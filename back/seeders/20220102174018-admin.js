'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
      const bcrypt = require('bcrypt');
      await queryInterface.bulkInsert('Users', [{
          username: 'admin',
          firstName: 'admin',
          lastName: 'admin',
          email: 'admin@gmail.com',
          password: bcrypt.hashSync('admin',10),
          type: 'admin'

        
      }], {});
   
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
