const data = {
    employees: require('../model/employees.json'),
    setEmployees: function (data) { this.employees = data }
};

const getAllEmployees = (req, res) => {
    res.json(data.employees);
}

const createNewEmployee = (req, res) => {
    const newEmployee = {
        id: data.employees[data.employees.length - 1].id + 1 || 1,
        name: req.body.name,
        surname: req.body.surname
    }

    if (!newEmployee.name || !newEmployee.surname) {
        return res.status(400).json({'message': 'First abd last names are required'});
    }

    data.setEmployees([...data.employees, newEmployee]);
    res.status(201).json(data.employees);
}

const updateEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if (!employee) {
        return res.status(400).json({"message": `Employee ID ${req.body.id} not found`});
    }

    if (req.body.name) employee.name = req.body.name;
    if (req.body.surname) employee.surname = req.body.surname;

    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    const unsortedArray = [...filteredArray, employee];
    data.setEmployees(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    res.json(data.employees);
}

const deleteEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if (!employee) {
        return res.status(400).json({"message": `Employee ID ${req.body.id} not found`});
    }

    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    data.setEmployees([...filteredArray]);
    res.json(data.employees);
}

const getEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.params.id));
    if (!employee) {
        return res.status(400).json({"message": `Employee ID ${req.params.id} not found`});
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