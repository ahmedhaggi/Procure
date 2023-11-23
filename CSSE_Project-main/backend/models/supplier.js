// Database schema of suppliers

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supplier = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    telephone1: {
        type: String,
        required: true
    },
    
    address : {
        type: String
    },
}, {
timestamps: true
});
const supplier_schema = mongoose.model('supplier', supplier);
module.exports = supplier_schema;