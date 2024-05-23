'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      invoice_number: {
        type: Sequelize.STRING
      },
      transaction_type: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      total_amount: {
        type: Sequelize.INTEGER
      },
      membershipId: {
        type: Sequelize.INTEGER,
        references:{
          model: "Memberships",
          key: "id"
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
    await queryInterface.dropTable('Histories');
  }
};