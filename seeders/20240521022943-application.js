'use strict';
const { hashPass } = require('../helpers/bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const membership = require("../application/memberships.json");
    const accountBalances = require("../application/accountballance.json");
    const informations = require("../application/informations.json");
    const service = require("../application/service.json");
    const transaction = require("../application/transaction.json");

    await queryInterface.bulkInsert('Memberships', membership.map(membership => {
      return {
        ...membership,
        password: hashPass(membership.password),
        createdAt: new Date,
        updatedAt: new Date,
      }
    }))
    
    await queryInterface.bulkInsert('AccountBalances', accountBalances.map(accountBalances => {
      return {
        ...accountBalances,
        createdAt: new Date,
        updatedAt: new Date,
      }
    }))
    
    await queryInterface.bulkInsert('Informations', informations.map(informations => {
      return {
        ...informations,
        createdAt: new Date,
        updatedAt: new Date,
      }
    }))
    
    await queryInterface.bulkInsert('Services', service.map(service => {
      return {
        ...service,
        createdAt: new Date,
        updatedAt: new Date,
      }
    }))

    await queryInterface.bulkInsert('Transactions', transaction.map(transaction => {
      return {
        ...transaction,
        createdAt: new Date,
        updatedAt: new Date,
      }
    }))
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Memberships', null, {});

    await queryInterface.bulkDelete('AccountBalances', null, {});
    
    await queryInterface.bulkDelete('Informations', null, {});

    await queryInterface.bulkDelete('Services', null, {});

    await queryInterface.bulkDelete('Transactions', null, {});

  }
};
