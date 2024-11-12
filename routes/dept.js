const express = require('express');
const router = express.Router();
const { Dept } = require('../models');

router.post('/', async (req, res) => {
  try {
    const { deptNo, deptName, cellNo, status } = req.body;
    const newDept = await Dept.create({ deptNo, deptName, cellNo, status });
    res.status(201).json(newDept);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:dept_id', async (req, res) => {
  try {
    const { dept_id } = req.params;
    const deleted = await Dept.destroy({ where: { deptNo: dept_id } });
    if (deleted) {
      res.status(200).json({ message: 'Department deleted successfully' });
    } else {
      res.status(404).json({ error: 'Department not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const depts = await Dept.findAll();
    res.status(200).json(depts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
