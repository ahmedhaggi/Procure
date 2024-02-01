const Item_Schema = require('../models/item.add');

exports.addItem = async (req, res) => {
    try {
        const { name, date, price, brand, description, quantity, image } = req.body;
        const item = new Item_Schema({ name, date, price, brand, description, quantity, image });
        await item.save();
        res.json('Item Added');
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
};

exports.getAllItems = async (req, res) => {
    try {
        const items = await Item_Schema.find();
        res.json(items);
    } catch (err) {
        res.status(400).json('No Data');
    }
};

exports.deleteItem = async (req, res) => {
    try {
        const id = req.params.id;
        await Item_Schema.findOneAndDelete({ _id: id });
        res.status(200).send({ status: 'Item Deleted' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 'Error with Deleting Data', error: err.message });
    }
};

exports.updateItem = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, date, price, brand, description, quantity, image } = req.body;
        const itemUpdate = { name, date, price, brand, description, quantity, image };
        await Item_Schema.findByIdAndUpdate(id, itemUpdate);
        res.status(200).send({ status: 'Item Updated' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 'Error with Updating Data', error: err.message });
    }
};

exports.searchItems = async (req, res) => {
    try {
        const key = req.params.key;
        const result = await Item_Schema.find({
            $or: [{ name: { $regex: key, $options: 'i' } }]
        });
        res.send(result);
    } catch (err) {
        res.status(400).json('No Data');
    }
};
