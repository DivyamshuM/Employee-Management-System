import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Employee from './components/Employee';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    fetch('http://localhost:8080/api/employees')
      .then(response => response.json())
      .then(data => setEmployees(data))
      .catch(error => console.error('Error:', error));
  };

  const handleAddEmployee = (employee) => {
    fetch('http://localhost:8080/api/employees/addEmployee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    })
    .then(response => response.json())
    .then(() => fetchEmployees()) // Refresh the list after adding
    .catch(error => console.error('Error:', error));
  };

  const handleUpdateEmployee = (id, updatedEmployee) => {
    fetch(`http://localhost:8080/api/employees/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedEmployee),
    })
    .then(response => response.json())
    .then(() => fetchEmployees()) // Refresh the list after updating
    .catch(error => console.error('Error:', error));
  };

  const handleDeleteEmployee = (id) => {
    fetch(`http://localhost:8080/api/employees/${id}`, {
      method: 'DELETE',
    })
    .then(() => fetchEmployees()) // Refresh the list after deleting
    .catch(error => console.error('Error:', error));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Employee
            employees={employees}
            onAdd={handleAddEmployee}
            onUpdate={handleUpdateEmployee}
            onDelete={handleDeleteEmployee}
          />
        } />
      </Routes>
    </Router>
  );
};

export default App;
