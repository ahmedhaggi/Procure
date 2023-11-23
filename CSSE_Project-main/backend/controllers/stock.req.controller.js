const Stock_req_Schema = require('../models/stock.req');

exports.addRequest = async (req, res) => {
    try {
        const { name, email, telephone1, supplier, Date, Time, Quantity, userName } = req.body;
        const status = 'Send';
        const channel_booking = new Stock_req_Schema({ Quantity, name, email, telephone1, supplier, Date, Time, status, userName });
        await channel_booking.save();
        res.json('Channel Booking Added');
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 'Error with Adding Data', error: err.message });
    }
};

exports.deleteRequest = async (req, res) => {
    try {
        const id = req.params.id;
        await Stock_req_Schema.findByIdAndDelete(id);
        res.status(200).send({ status: 'Request Canceled' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 'Error with Data', error: err.message });
    }
};

exports.getAllRequests = async (req, res) => {
    try {
        const requests = await Stock_req_Schema.find();
        res.json(requests);
    } catch (err) {
        res.status(400).json('No Data');
    }
};

exports.getRequestsByUserName = async (req, res) => {
    try {
        const userName = req.params.userName;
        const requests = await Stock_req_Schema.find({ userName, status: 'Send' });
        res.json(requests);
    } catch (err) {
        res.status(400).json('No Data');
    }
};

exports.getUnbookedRequestsByUserName = async (req, res) => {
    try {
        const userName = req.params.userName;
        const requests = await Stock_req_Schema.find({ userName, status: 'Unbooking' });
        res.json(requests);
    } catch (err) {
        res.status(400).json('No Data');
    }
};

exports.getUnbookedRequests = async (req, res) => {
    try {
        const unbookedRequests = await Stock_req_Schema.find({ status: 'Unbooking' });
        res.json(unbookedRequests);
    } catch (err) {
        res.status(400).json('No Data');
    }
};

exports.getPendingRequests = async (req, res) => {
    try {
        const pendingRequests = await Stock_req_Schema.find({ status: 'Send' });
        res.json(pendingRequests);
    } catch (err) {
        res.status(400).json('No Data');
    }
};

exports.getAcceptedRequests = async (req, res) => {
    try {
        const acceptedRequests = await Stock_req_Schema.find({ status: 'Accept' });
        res.json(acceptedRequests);
    } catch (err) {
        res.status(400).json('No Data');
    }
};

exports.getRejectedRequests = async (req, res) => {
    try {
        const rejectedRequests = await Stock_req_Schema.find({ status: 'Reject' });
        res.json(rejectedRequests);
    } catch (err) {
        res.status(400).json('No Data');
    }
};

exports.getCompletedRequests = async (req, res) => {
    try {
        const completedRequests = await Stock_req_Schema.find({ status: 'Complete' });
        res.json(completedRequests);
    } catch (err) {
        res.status(400).json('No Data');
    }
};

exports.getSentRequests = async (req, res) => {
    try {
        const sentRequests = await Stock_req_Schema.find({ status: 'Shipped' });
        res.json(sentRequests);
    } catch (err) {
        res.status(400).json('No Data');
    }
};

exports.updateRequestStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const status = 'Unbooking';

        const statusUpdate = { status };
        await Stock_req_Schema.findByIdAndUpdate(id, statusUpdate);
        res.status(200).send({ status: 'Status Updated' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 'Error with Updating Data', error: err.message });
    }
};

exports.updateStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.body.status;

        const statusUpdate = { status };
        await Stock_req_Schema.findByIdAndUpdate(id, statusUpdate);
        res.status(200).send({ status: 'Status Updated' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 'Error with Updating Data', error: err.message });
    }
};

exports.updateRequestToAccept = async (req, res) => {
    try {
        const id = req.params.id;
        const status = 'Accept';

        const statusUpdate = { status };
        await Stock_req_Schema.findByIdAndUpdate(id, statusUpdate);
        res.status(200).send({ status: 'Status Updated' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 'Error with Updating Data', error: err.message });
    }
};

exports.editRequest = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email, telephone1, supplier, Date, Time, Quantity } = req.body;

        const statusUpdate = {
            name, email, telephone1, supplier, Date, Time, Quantity
        };
        await Stock_req_Schema.findByIdAndUpdate(id, statusUpdate);
        res.status(200).send({ status: 'Request Updated' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 'Error with Updating Data', error: err.message });
    }
};

exports.deleteRequestById = async (req, res) => {
    try {
        const id = req.params.id;
        await Stock_req_Schema.findByIdAndDelete(id);
        res.status(200).send({ status: 'Request Deleted' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 'Error with Deleting Data', error: err.message });
    }
};

exports.searchRequests = async (req, res) => {
    try {
        const key = req.params.key;
        const result = await Stock_req_Schema.find({
            $or: [
                { name: { $regex: key, $options: 'i' } }
            ]
        });
        res.send(result);
    } catch (err) {
        res.status(400).json('No Data');
    }
};
