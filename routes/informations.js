const express = require(`express`);
const InformationController = require('../controller/informationController');
const authentication = require('../middleware/authentication');
const informationRouter = express.Router();

informationRouter.use(authentication);

informationRouter.get ('/banner', InformationController.getBanner)
informationRouter.get ('/service', InformationController.getService)
module.exports = informationRouter