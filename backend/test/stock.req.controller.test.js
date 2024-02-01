const stockReqController = require('../controllers/stock.req.controller'); //Import stock request controller
const stockReqSchema = require('../models/stock.req'); //Import stock request model
const mongoose = require('mongoose');

jest.mock('../models/stock.req'); //Mock stock request model
const mockedStockReqModel = stockReqSchema;

describe('Stock Request Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  //Positive test case for addRequest
  test('add a new stock request with valid data', async () => {
    const req = {
      body: {
        name: 'Test Name',
        email: 'test@example.com',
        telephone1: '123-456-7890',
        supplier: 'Test Supplier',
        Date: '2023-10-30',
        Time: '10:00 AM',
        Quantity: 10,
        userName: 'testuser',
      },
    };

    const res = {
      json: jest.fn(),
      status: jest.fn(),
      send: jest.fn(),
    };

    mockedStockReqModel.prototype.save = jest.fn().mockResolvedValueOnce();
    await stockReqController.addRequest(req, res);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith('Channel Booking Added');
  });


  //Negative test case for addRequest
  test('errors when adding a new stock request with invalid data', async () => {
    const req = {
      body: {
        name: '', //Empty name (invalid data)
        email: 'test@example.com',
        telephone1: '123-456-7890',
        supplier: 'Test Supplier',
        Date: '2023-10-30',
        Time: '10:00 AM',
        Quantity: 10,
        userName: 'testuser',
      },
    };

    const res = {
      json: jest.fn(),
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    mockedStockReqModel.prototype.save = jest.fn().mockRejectedValueOnce(new Error('Validation error'));
    await stockReqController.addRequest(req, res);

    expect(res.status).toHaveBeenCalledWith(500); //Check if status is set to 500
    expect(res.send).toHaveBeenCalledWith({ status: 'Error with Adding Data', error: 'Validation error' }); //Check if error message is sent as a response
  });
});
