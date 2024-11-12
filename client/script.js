// API base URL
const API_BASE_URL = 'http://localhost:3000';

// Load departments and employees on page load
document.addEventListener('DOMContentLoaded', () => {
  loadDepartments();
  loadEmployees();
});

// Load all departments
async function loadDepartments() {
  const departmentList = document.getElementById('department-list');
  departmentList.innerHTML = ''; // Clear existing data
  try {
    const response = await fetch(`${API_BASE_URL}/dept`);
    const departments = await response.json();
    departments.forEach((dept) => {
      const li = document.createElement('li');
      li.innerHTML = `
                ${dept.deptNo} - ${dept.deptName} 
                <button onclick="deleteDepartment('${dept.deptNo}')">Delete</button>
            `;
      departmentList.appendChild(li);
    });
  } catch (err) {
    console.error('Error loading departments:', err);
  }
}

// Add a new department
document
  .getElementById('add-department-form')
  .addEventListener('submit', async (e) => {
    e.preventDefault();
    const deptNo = document.getElementById('deptNo').value;
    const deptName = document.getElementById('deptName').value;
    const cellNo = document.getElementById('cellNo').value;
    const status = document.getElementById('status').value;

    try {
      await fetch(`${API_BASE_URL}/dept`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deptNo, deptName, cellNo, status }),
      });
      loadDepartments();
    } catch (err) {
      console.error('Error adding department:', err);
    }
  });

// Delete a department
async function deleteDepartment(deptNo) {
  try {
    await fetch(`${API_BASE_URL}/dept/${deptNo}`, { method: 'DELETE' });
    loadDepartments();
  } catch (err) {
    console.error('Error deleting department:', err);
  }
}

// Load all employees
async function loadEmployees() {
  const employeeList = document.getElementById('employee-list');
  employeeList.innerHTML = ''; // Clear existing data
  try {
    const response = await fetch(`${API_BASE_URL}/employee`);
    const employees = await response.json();
    employees.forEach((emp) => {
      const li = document.createElement('li');
      li.innerHTML = `
                ${emp.pNo} - ${emp.name} 
                <button onclick="deleteEmployee(${emp.pNo})">Delete</button>
            `;
      employeeList.appendChild(li);
    });
  } catch (err) {
    console.error('Error loading employees:', err);
  }
}

// Add a new employee
document
  .getElementById('add-employee-form')
  .addEventListener('submit', async (e) => {
    e.preventDefault();
    const pNo = document.getElementById('pNo').value;
    const name = document.getElementById('name').value;
    const salary = document.getElementById('salary').value;
    const deptNo = document.getElementById('deptNoForEmployee').value;

    try {
      await fetch(`${API_BASE_URL}/employee`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pNo, name, salary, deptNo }),
      });
      loadEmployees();
    } catch (err) {
      console.error('Error adding employee:', err);
    }
  });

// Delete an employee
async function deleteEmployee(pNo) {
  try {
    await fetch(`${API_BASE_URL}/employee/${pNo}`, { method: 'DELETE' });
    loadEmployees();
  } catch (err) {
    console.error('Error deleting employee:', err);
  }
}
