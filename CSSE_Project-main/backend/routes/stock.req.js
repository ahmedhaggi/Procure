const express = require('express');
const router = express.Router();
const stockRequestController = require('../controllers/stock.req.controller');

router.post('/addreqest', stockRequestController.addRequest);
router.delete('/deleteReq/:id', stockRequestController.deleteRequest);
router.get('/allreqests', stockRequestController.getAllRequests);
router.get('/allreqests/:userName', stockRequestController.getRequestsByUserName);
router.get('/allServiceUnBooking/:userName', stockRequestController.getUnbookedRequestsByUserName);
router.get('/allServiceUnbooking', stockRequestController.getUnbookedRequests);
router.get('/pending', stockRequestController.getPendingRequests);
router.get('/reqAccept', stockRequestController.getAcceptedRequests);
router.get('/reqReject', stockRequestController.getRejectedRequests);
router.get('/reqComplete', stockRequestController.getCompletedRequests);
router.get('/reqSend', stockRequestController.getSentRequests);
router.put('/statusUpdateServiceBooking/:id', stockRequestController.updateRequestStatus);
router.put('/statusUpdate/:id', stockRequestController.updateStatus);
router.put('/AcceptUpdateServiceBooking/:id', stockRequestController.updateRequestToAccept);
router.put('/editreqest/:id', stockRequestController.editRequest);
router.delete('/deletereq/:id', stockRequestController.deleteRequestById);
router.get('/search/:key', stockRequestController.searchRequests);

module.exports = router;
