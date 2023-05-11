'use strict';
const fs = require('fs')
const teams = JSON.parse(fs.readFileSync(`${__dirname}/../data/teams.json`))
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    teams.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()

    })
    return queryInterface.bulkInsert('Teams', teams, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down(queryInterface, Sequelize) {
    queryInterface.bulkDelete('Teams', null, {});

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
