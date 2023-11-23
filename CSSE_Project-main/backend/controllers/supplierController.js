const supplier_schema = require('../models/supplier');

const addNewSupplier = async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const telephone1 = req.body.telephone1;
    const address = req.body.address;
    const Supplier_data = new supplier_schema({ name, email, telephone1, address });

    try {
        await Supplier_data.save();
        res.json('New Supplier Added!');
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
};

const getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await supplier_schema.find();
        res.json(suppliers);
    } catch (err) {
        res.status(400).json('No Data');
    }
};

const updateSupplier = async (req, res) => {
    const id = req.params.id;
    const { name, email, telephone1, address } = req.body;

    const reqUpdate = { name, email, telephone1, address };

    try {
        await supplier_schema.findByIdAndUpdate(id, reqUpdate);
        res.status(200).send({ status: "Supplier Updated" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with Updating Data", error: err.message });
    }
};

const deleteSupplier = async (req, res) => {
    const id = req.params.id;

    try {
        await supplier_schema.findByIdAndDelete(id);
        res.status(200).send({ status: "Supplier Deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with Deleting Data", error: err.message });
    }
};

const searchSuppliers = async (req, res) => {
    const key = req.params.key;

    try {
        const result = await supplier_schema.find({
            "$or": [
                { name: { $regex: key } }
            ]
        });
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with Searching Data", error: err.message });
    }
};

module.exports = {
    addNewSupplier,
    getAllSuppliers,
    updateSupplier,
    deleteSupplier,
    searchSuppliers,
};
