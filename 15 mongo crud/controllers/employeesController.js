const Employee = require('../model/Employee');

const getAllEmployees = async (req, res) => {
    const employees = await Employee.find();

    if (!employees) return res.status(204).json({ 'message': 'No employees found'});
    res.json(employees);
}

const createNewEmployee = async (req, res) => {
    if (!req?.body?.name || !req?.body?.surname) {
        return res.status(400).json({ 'message': 'First and last names are required'})
    }

    try {
        const result = await Employee.create({
            name: req.body.name,
            surname: req.body.surname
        })

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
    //res.status(201).json(data.employees);
}

const updateEmployee = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required'});
    }

    const employee = await Employee.findOne({ _id: req.body.id}).exec();

    if (!employee) {
        return res.status(204).json({"message": `No employee matches ID: ${req.body.id}`});
    }

    if (req.body?.name) employee.name = req.body.name;
    if (req.body?.surname) employee.surname = req.body.surname;

    const result = await employee.save();
    res.json(result);
}

const deleteEmployee = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required'});
    }

    const employee = await Employee.findOne({ _id: req.body.id}).exec();
    if (!employee) {
        return res.status(204).json({"message": `No employee matches ID: ${req.body.id}`});
    }

    const result = await employee.deleteOne({ _id: req.body.id});
    res.json(result);
}

const getEmployee = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'ID parameter is required'});

    const employee = await Employee.findOne({ _id: req.params.id}).exec();

    if (!employee) {
        return res.status(204).json({"message": `No employee matches ID: ${req.params.id}`});
    }
    res.json(employee);
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}