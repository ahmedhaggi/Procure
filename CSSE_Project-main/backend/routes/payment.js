const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/addPayment', paymentController.addPayment);
router.get('/allOrderPayment', paymentController.getAllOrderPayment);
router.get('/allOrderPayment/:amount', paymentController.getOrderByAmount);
router.get('/oneOrderPayment/:userName', paymentController.getOrderByUserName);
router.get('/allOrderAdvertisement', paymentController.getAdvertisementPayments);
router.get('/allOrderBooking', paymentController.getBookingPayments);
router.put('/statusPaymentUpdate/:id', paymentController.updatePaymentStatus);
router.delete('/deletePayment/:id', paymentController.deletePayment);

module.exports = router;
