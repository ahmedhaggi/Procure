// Import required dependencies and modules
require('dotenv').config(); // Load environment variables from a .env file
const express = require('express');
const cors = require('cors');
const dbConfig = require('./config/dbConfig');
const userRoute = require('./routes/userRoutes');
const itemAddRoute = require('./routes/item.add.js');
const stockReqRoute = require('./routes/stock.req.js');
const supplierRoute = require('./routes/supplier.js');
const paymentRoute = require('./routes/payment.js');

// Create an instance of Express application
const app = express();

// Middleware setup
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse JSON request bodies

/*
 * Mount endpoints
 */
app.use('/api/user', userRoute); 
app.use('/itemadd', itemAddRoute);
app.use('/stockReq', stockReqRoute); 
app.use('/supplier', supplierRoute); 
app.use('/payment', paymentRoute); 

// Define the port for the server to listen on, using the environment variable or default to 5000
const port = process.env.PORT || 5000;

// Start the Express server and listen on the specified port
app.listen(port, () => {
  console.log(`Backend Node Server started on port ${port}`);
});
