const express = require('express');
const router = express.Router();

const orderpaymentsHandler = require("./handler/order-payment");


router.get("/", orderpaymentsHandler.getOrders);

module.exports = router;
