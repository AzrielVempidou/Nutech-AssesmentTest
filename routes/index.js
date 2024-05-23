const express = require(`express`);
const membership = require("./membership");
const information = require("./informations");
const transaction = require("./transaction");
const router = express.Router();

router.use('/membership', membership);
router.use('/information', information);
router.use('/transaction', transaction);

module.exports = router