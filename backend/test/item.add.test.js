const mongoose = require('mongoose');
const itemModel = require('../models/item.add'); // Adjust the path as needed
const { describe, it, beforeAll, afterAll, expect } = require('@jest/globals');

describe('Item Model', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a new item', async () => {
    const itemData = {
      name: 'Test Item',
      date: '2023-10-30',
      price: '100.0',
      brand: 'Test Brand',
      description: 'Test Description',
      quantity: '10',
      image: 'test.jpg',
    };

    const newItem = new itemModel(itemData);
    const savedItem = await newItem.save();

    expect(savedItem.name).toBe('Test Item');
    expect(savedItem.date).toBe('2023-10-30');
    expect(savedItem.price).toBe('100.0');
    expect(savedItem.brand).toBe('Test Brand');
    expect(savedItem.description).toBe('Test Description');
    expect(savedItem.quantity).toBe('10');
    expect(savedItem.image).toBe('test.jpg');
  });

  it('should not create an item with missing required fields', async () => {
    const itemData = {
      // Missing required fields (name, date, price, brand, description, quantity, image)
    };

    const newItem = new itemModel(itemData);
    let error;

    try {
      await newItem.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.name).toBe('ValidationError');
  });
});
