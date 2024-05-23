const express = require(`express`);
const TransactionController = require('../controller/transactionController');
const authentication = require('../middleware/authentication');
const transactionRouter = express.Router();

transactionRouter.use(authentication);

transactionRouter.post('/', TransactionController.postTransaction);
transactionRouter.get('/balance', TransactionController.getBalance);
transactionRouter.post('/topup', TransactionController.postBalance);
transactionRouter.get('/history', TransactionController.getHistory);


module.exports = transactionRouter
