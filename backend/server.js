const express = require('express');
const cors = require('cors');
require('dotenv').config();

//routes
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next)=>{
    console.log(req.method, req.url);
    next();
});

app.use('/employees', employeeRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});