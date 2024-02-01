const payment = require('../models/payment');

exports.addPayment = async (req, res) => {
    try {
        const { accountHold, cardNumber, expireDate, ccv, paymentMethod, reason, Amount, userName, paymentTitle, brand, model } = req.body;
        const status = 'Pending';
        const reasons = reason + ' ' + brand + ' ' + model;
        const paymentAdd = new payment({ accountHold, cardNumber, expireDate, ccv, paymentMethod, reason: reasons, Amount, userName, paymentTitle, status });
        await paymentAdd.save();
        res.json('Payment Added');
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 'Error with Adding Payment', error: err.message });
    }
};

exports.getAllOrderPayment = async (req, res) => {
    try {
        const serviceBookings = await payment.find({ paymentTitle: 'Medicine Order' });
        res.json(serviceBookings);
    } catch (err) {
        res.status(400).json('No Data');
    }
};

exports.getOrderByAmount = async (req, res) => {
    try {
        const amount = req.params.amount;
        const serviceBookings = await payment.find({ Amount: { $regex: ".*" + amount + ".*" }, paymentTitle: 'Medicine Order' });
        res.json(serviceBookings);
    } catch (err) {
        res.status(400).json('No Data');
    }
};

exports.getOrderByUserName = async (req, res) => {
    try {
        const userName = req.params.userName;
        const serviceBookings = await payment.find({ userName: { $regex: ".*" + userName + ".*" }, paymentTitle: 'Medicine Order' });
        res.json(serviceBookings);
    } catch (err) {
        res.status(400).json('No Data');
    }
};

exports.getAdvertisementPayments = async (req, res) => {
    try {
        const serviceBookings = await payment.find({ paymentTitle: 'ADVERTISEMENT' });
        res.json(serviceBookings);
    } catch (err) {
        res.status(400).json('No Data');
    }
};

exports.getBookingPayments = async (req, res) => {
    try {
        const serviceBookings = await payment.find({ paymentTitle: 'Booking' });
        res.json(serviceBookings);
    } catch (err) {
        res.status(400).json('No Data');
    }
};

exports.updatePaymentStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const { status } = req.body;
        const statusUpdate = { status };
        await payment.findByIdAndUpdate(id, statusUpdate);
        res.status(200).send({ status: 'Status Updated' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 'Error with Updating Data', error: err.message });
    }
};

exports.deletePayment = async (req, res) => {
    try {
        const id = req.params.id;
        await payment.findByIdAndDelete(id);
        res.status(200).send({ status: 'Payment Deleted' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 'Error with Deleting Data', error: err.message });
    }
};
