const itemController = require('../controllers/itemController'); //Import item controller
const itemSchema = require('../models/item.add'); //Import item model
const mongoose = require('mongoose');

jest.mock('../models/item.add'); //Mock item model
const mockedItemModel = itemSchema;

describe('Item Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  //Positive test case for addItem
  test('add a new item with valid data', async () => {
    const req = {
      body: {
        name: 'Test Item',
        date: '2023-10-30',
        price: 100.0,
        brand: 'Test Brand',
        description: 'Test Description',
        quantity: 10,
        image: 'test.jpg',
      },
    };

    const res = {
      json: jest.fn(),
      status: jest.fn(),
    };

    mockedItemModel.prototype.save = jest.fn().mockResolvedValueOnce();
    await itemController.addItem(req, res);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith('Item Added');
  });

  //Negative test case for addItem
  test('errors when adding a new item with invalid data', async () => {
    const req = {
      body: {
        name: '', //Empty name (invalid data)
        date: '2023-10-30',
        price: 100.0,
        brand: 'Test Brand',
        description: 'Test Description',
        quantity: 10,
        image: 'test.jpg',
      },
    };

    const res = {
      json: jest.fn(),
      status: jest.fn(() => res),
    };

    mockedItemModel.prototype.save = jest.fn().mockRejectedValueOnce(new Error('Validation error'));
    await itemController.addItem(req, res);

    expect(res.status).toHaveBeenCalledWith(400); //Check if status is set to 400
    expect(res.json).toHaveBeenCalledWith('Error: Error: Validation error'); //Check if error message is sent as a response
  });

});
