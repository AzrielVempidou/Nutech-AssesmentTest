'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      History.belongsTo(models.Membership, { foreignKey: "membershipId" });
    }
  }
  History.init({
    invoice_number: DataTypes.STRING,
    transaction_type: DataTypes.STRING,
    description: DataTypes.STRING,
    total_amount: DataTypes.INTEGER,
    membershipId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'History',
    hooks: {
      beforeCreate: async (transaction, options) => {

        const currentDate = new Date();
        const dateString = currentDate.toISOString().split('T')[0].replace(/-/g, '');
       
        transaction.invoice_number = `INV${dateString}-000`;
      },
      afterCreate: async (transaction, options) => {
       
        const currentDate = new Date();
        const dateString = currentDate.toISOString().split('T')[0].replace(/-/g, '');
        
        const paddedId = String(transaction.id).padStart(3, '0');
        

        transaction.invoice_number = `INV${dateString}-${paddedId}`;
        
        await transaction.save();
      }
    }
  });
  return History;
};