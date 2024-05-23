const express = require('express');
const MembershipController = require('../controller/membershipController');
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');
const membershipRouter = express.Router();

membershipRouter.post('/registration', MembershipController.register);
membershipRouter.post('/login', MembershipController.login);

membershipRouter.use(authentication);

membershipRouter.get('/profile', MembershipController.getProfile);
membershipRouter.put('/profile/update', authorization, MembershipController.updateProfile);
membershipRouter.put('/profile/image', authorization, MembershipController.updateProfileIMG);

module.exports = membershipRouter;