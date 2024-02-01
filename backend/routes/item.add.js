const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.post('/addItem', itemController.addItem);
router.get('/allItems', itemController.getAllItems);
router.delete('/deleteItem/:id', itemController.deleteItem);
router.put('/itemUpdate/:id', itemController.updateItem);
router.get('/search/:key', itemController.searchItems);

module.exports = router;
