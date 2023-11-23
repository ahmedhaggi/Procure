const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

router.route('/addNewSupplier').post(supplierController.addNewSupplier);
router.route('/allSuppliers').get(supplierController.getAllSuppliers);
router.route('/supplierUpdate/:id').put(supplierController.updateSupplier);
router.route('/deleteSupplier/:id').delete(supplierController.deleteSupplier);
router.route('/search/:key').get(supplierController.searchSuppliers);

module.exports = router;
