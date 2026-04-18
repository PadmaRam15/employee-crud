const pool = require('../config/db');


// GET all employees
const getEmployees = async () => {
    try{
        const result = await pool.query('SELECT * FROM employees');
        return result.rows;
    }catch(error){
        throw error;
    }
};

// CREATE a new employee
const createEmployee = async (employee) => {
     const {name,email,phone} = employee;
     try{
        const result = await pool.query('INSERT INTO employees (employee_name, employee_email, employee_phone) VALUES($1, $2, $3) RETURNING *',[name,email,phone]);
        return result.rows[0];
     }catch(error){
        throw error;
     }
};

//UPDATE an employee

const updateEmployee = async (employee) => {
    const {id,name,email,phone} = employee;
    try{
       const result = await pool.query('UPDATE employees SET employee_name = $1, employee_email = $2, employee_phone = $3 WHERE employee_id = $4 RETURNING *',
     [name, email,phone, id]);
     return result.rows[0];
    }catch(error){
        throw error;
    }
};


//GET an employee by ID

const getEmployeeById = async (id) => {
    try{
        const result = await pool.query('SELECT * FROM employees WHERE employee_id = $1', [id]);
        return result.rows[0];
    }catch(error){
        throw error;
    }
}

//DELETE an employee
const deleteEmployee = async (id) => {
    try{
        await pool.query('DELETE FROM employees WHERE employee_id = $1', [id]);
    }catch(error){
        throw error;
    }
};

const deactivateEmployee = async (id) =>{
    try{
        await pool.query('UPDATE employees SET employee_status = 0 WHERE employee_id = $1 ',[id]);
    }catch(error){
        throw error;
    }
};

module.exports = {
    getEmployees,
    createEmployee,
    updateEmployee,
    getEmployeeById,
    deleteEmployee,
    deactivateEmployee
}