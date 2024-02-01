// Database schema of construction items

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Item = new Schema({

    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    }

}, {
    timestamps: true
});

const Item_Schema = mongoose.model('Item', Item);
module.exports = Item_Schema;