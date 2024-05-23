'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      invoice_number: {
        type: Sequelize.STRING
      },
      serviceId: {
        type: Sequelize.INTEGER, 
        references: {
          model: 'Services',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      transaction_type: {
        type: Sequelize.STRING
      },
      total_amount: {
        type: Sequelize.FLOAT
      },
      membershipId: {
        type: Sequelize.INTEGER, 
        references: {
          model: 'Memberships',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions');
  }
};