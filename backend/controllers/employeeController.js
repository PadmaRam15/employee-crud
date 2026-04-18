const employeeModel = require('../models/employeeModel');


// GET all employees
exports.getAllEmployees = async (req, res) => {
    try{
        const employees = await employeeModel.getEmployees();
        res.json(employees);
    } catch(error){
        res.status(500).json({error:error.message});
    }
}


// CREATE a new employee
exports.addEmployee = async (req, res) => {
    try{
        const {name,email,phone} = req.body;
        const newEmployee = await employeeModel.createEmployee({name,email,phone});
        res.status(201).json(newEmployee);
    }catch(error){
        res.status(500).json({error:error.message});
    }
}


//UPDATE an employee
exports.updateEmployee = async (req, res) => {
    try{
        const {id,name,email,phone} = req.body;
        const updatedEmployee = await employeeModel.updateEmployee({id,name,phone,email});
       res.json(updatedEmployee);
    }catch(error){
        res.status(500).json({error:error.message});
    }
}


//GET an employee by ID
exports.getemployeeByID = async (req, res) =>{
    try{
        const id = req.params.id;
        const employee = await employeeModel.getEmployeeById(id);
        if(employee){
            res.json(employee);
        }else{
            res.status(404).json({error:'Employee Not found'});
        }
    }catch(error){
        res.status(500).json({error:error.message});
    }
} 

//DELETE an employee
exports.deleteEmployee = async (req, res) => {
    try{
        const id = req.params.id;
        await employeeModel.deleteEmployee(id);
        res.json({message:'Employee deleted successfully'});
    }catch(error){
        res.status(500).json({error:error.message});
    }
}


//DEACTIVATE an employee
exports.deactivateEmployee = async(req,res)=>{
    try{
        const id = req.params.id;
        await employeeModel.deactivateEmployee(id);
        res.json({message:'Employee Deactivated Successfully'});
    }catch(error){
        res.status(500).json({error:error.message});
    }
}