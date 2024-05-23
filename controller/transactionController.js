const {Service, AccountBalances, Transactions, History } = require("../models");


module.exports = class InformationController{
  static async getBalance(req,res,next){
    try {
      const data = await AccountBalances.findOne({
        where:{
          membershipId : req.user.id
        },
        attributes: {exclude : ["updatedAt", "createdAt", 'membershipId']},
      });
      if (!data) {
        throw { name: "NotFound", message : "Balance Not found"}
      }
      res.status(200).json(
        {
          "status": 0,
          "message": "Get Balance Berhasil",
          "data": { data }
        }
      )
  } catch (error) {
      next(error)
  }
  }
  
  static async postBalance(req, res, next) {
    try {
      const { amount } = req.body;
  
      let data = await AccountBalances.findOne({
        where: {
          membershipId: req.user.id
        },
        attributes: { exclude: ["updatedAt", "createdAt", "membershipId"] },
      });
  
      if (!data) {
        return res.status(400).json({
          "status": 1,
          "message": "Account not found",
        });
      } else {
        if (amount < 0) { // Handling withdrawal
          if (data.account_balance < Math.abs(amount)) {
            return res.status(400).json({
              "status": 1,
              "message": "Insufficient balance",
            });
          }
          data.account_balance += amount; // Deduct amount (amount is negative)
        } else { // Handling top-up
          data.account_balance += amount;
        }
        await data.save();
      }
  
      console.log(data, "<<");
  
      res.status(201).json({
        "status": 0,
        "message": amount > 0 ? "Top Up Balance berhasil" : "Withdrawal Balance berhasil",
        "data": {
          "balance": data.account_balance
        }
      });
  
      await History.create({
        transaction_type: amount > 0 ? "TOP UP" : "WITHDRAWAL",
        description: amount > 0 ? "Top Up balance" : "Withdrawal balance",
        total_amount: Math.abs(amount),
        membershipId: req.user.id
      });
  
    } catch (error) {
      next(error);
    }
  }

  static async postTransaction(req, res, next) {
    try {
      const { serviceId } = req.body;
      const data = await Transactions.findAll({
        include: {
          model: Service,
          attributes: ["id","service_code", "service_name", "service_tarif"]
        },
        where: {
          membershipId: req.user.id
        }
      });
  
      let existingTransaction = data.find(transaction => transaction.serviceId === serviceId);
      if (!existingTransaction) {
        return res.status(400).json({
          "status": 1,
          "message": "Transaction already exists for this service",
        });
      }
  
      const service = await Service.findByPk(serviceId, {
        attributes: ["service_code", "service_name", "service_tarif"]
      });
  
      if (!service) {
        throw { name: "NotFound", message: "Service atau Layanan tidak ditemukan" };
      }
  
      // Check user's account balance
      const account = await AccountBalances.findOne({
        where: {
          membershipId: req.user.id
        }
      });
      if (!account) {
        throw { name: "NotFound", message: "Account balance not found" };
      }
  
      if (account.balance < service.service_tarif) {
        return res.status(400).json({
          "status": 1,
          "message": "Insufficient balance. Please top up your account.",
        });
      }
  
      // Create a new transaction with the fetched service details
      const newTransaction = await Transactions.create({
        membershipId: req.user.id,
        serviceId: serviceId,
        total_amount: service.service_tarif
      });
  
      // Update AccountBalances by subtracting the total_amount
      const updatedBalance = parseFloat(account.account_balance) - parseFloat(service.service_tarif);
      console.log(updatedBalance, "<<<");

      await AccountBalances.update({ account_balance: updatedBalance }, {
        where: {
          membershipId: req.user.id
        }
      });
  
      // Create history transaction
      const history = await History.create({
        membershipId: req.user.id,
        transaction_type: newTransaction.transaction_type,
        description: service.service_code,
        total_amount: service.service_tarif,
        timestamp: newTransaction.createdAt
      });
  
      return res.status(201).json({
        "status": 0,
        "message": "Transaction created successfully",
        "data": {
          "invoice_number": newTransaction.invoice_number,
          "service_code": service.service_code,
          "service_name": service.service_name,
          "total_amount": service.service_tarif,
          "transaction_type": newTransaction.transaction_type,
          "created_on": newTransaction.createdAt,
          "updated_balance": updatedBalance,
          "history_transaction_id": history.id
        }
      });
  
    } catch (error) {
      next(error);
    }
  }
  
  
  

  static async getHistory(req,res,next){
    try {
      const data = await History.findAll({
        where:{
          membershipId : req.user.id
        },
        attributes: {exclude : ['membershipId']},
        limit: 3, 
        order: [["createdAt", "ASC"]]
      });
      if (!data) {
        throw { name: "NotFound", message : "Membership Not found"}
      }

      const formattedData = data.map(history => ({
        invoice_number: history.invoice_number,
        transaction_type: history.transaction_type,
        description: history.description,
        total_amount: history.total_amount,
        created_on: history.createdAt
      }));

      res.status(200).json({
      status: 0,
      message: "Get History Berhasil",
      data: {
        offset: 0,
        limit: 3,
        records: formattedData
      }
      });
  } catch (error) {
      next(error)
  }
  }
}

