const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');


// GET all employees
router.get('/', employeeController.getAllEmployees);


// CREATE a new employee
router.post('/', employeeController.addEmployee);


//UPDATE an employee
router.put('/:id', employeeController.updateEmployee);


//Soft delete an employee

router.patch('/:id/deactivate',employeeController.deactivateEmployee);

//GET an employee by ID
router.get('/:id', employeeController.getemployeeByID);


//DELETE an employee
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;

