const mongoose = require('mongoose');
const Supplier = require('../models/supplier'); // Import your model

// Connect to a test database
beforeAll(async () => {
    jest.setTimeout(10000);
    await mongoose.connect('mongodb://localhost:27017/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });
  

// Define your test suite
describe('Supplier Model', () => {
  // Clear the test database before each test
  beforeEach(async () => {
    await Supplier.deleteMany({});
  });

  // Test for creating a new supplier
  it('should create a new supplier', async () => {
    const supplierData = {
      name: 'Test Supplier',
      email: 'test@example.com',
      telephone1: '123-456-7890',
      address: '123 Main St',
    };

    const supplier = new Supplier(supplierData);
    const savedSupplier = await supplier.save();

    expect(savedSupplier.name).toBe(supplierData.name);
    expect(savedSupplier.email).toBe(supplierData.email);
    expect(savedSupplier.telephone1).toBe(supplierData.telephone1);
    expect(savedSupplier.address).toBe(supplierData.address);
  });


  // Test for creating a new supplier with missing required fields
  it('should not create a supplier with missing required fields', async () => {
    const supplierData = {
      name: 'Test Supplier',
      email: 'test@example.com',
      // telephone1 is required, but empty here
    };

    const supplier = new Supplier(supplierData);

    try {
      await supplier.save();
      // The test fails if save is successful.
      expect(true).toBe(false); // Fail the test if no error was thrown.
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err.errors.telephone1).toBeDefined();
    }
  });
});

// Close the database connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
});
