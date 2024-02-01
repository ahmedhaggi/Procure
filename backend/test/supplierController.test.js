const supplierController = require('../controllers/supplierController');
const supplier_schema = require('../models/supplier');
const mongoose = require('mongoose');

jest.mock('../models/supplier');
const mockedSupplierModel = supplier_schema;

describe('Supplier Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  //Positive test case for addNewSupplier
  test('add a new supplier with valid data', async () => {
    const req = {
      body: {
        name: 'Test Supplier',
        email: 'test@example.com',
        telephone1: '123-456-7890',
        address: '123 Main St',
      },
    };

    const res = {
      json: jest.fn(),
      status: jest.fn(),
    };

    mockedSupplierModel.prototype.save = jest.fn().mockResolvedValueOnce();
    await supplierController.addNewSupplier(req, res);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith('New Supplier Added!');
  });

  //Negative test case for addNewSupplier
  test('errors when adding a new supplier with invalid data', async () => {
    const req = {
      body: {
        name: '', //Empty name (invalid data)
        email: 'test@example.com',
        telephone1: '123-456-7890',
        address: '123 Main St',
      },
    };
  
    const res = {
      json: jest.fn(), 
      status: jest.fn(() => res), 
    };
  
    mockedSupplierModel.prototype.save = jest.fn().mockRejectedValueOnce(new Error('Validation error'));
    await supplierController.addNewSupplier(req, res);
  
    expect(res.status).toHaveBeenCalledWith(400); //Check if status is set to 400
    expect(res.json).toHaveBeenCalledWith('Error: Error: Validation error'); // Check if error message is sent as a response
  });
  

});
