const express = require('express');
const router = express.Router();
const { Employee } = require('../models');

router.post('/', async (req, res) => {
  try {
    const { pNo, name, salary, deptNo } = req.body;
    const newEmployee = await Employee.create({ pNo, name, salary, deptNo });
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:employee_id', async (req, res) => {
  try {
    const { employee_id } = req.params;
    const deleted = await Employee.destroy({ where: { pNo: employee_id } });
    if (deleted) {
      res.status(200).json({ message: 'Employee deleted successfully' });
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.status(200).json(employees);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
