import React, { useState } from 'react';

const Employee = ({ employees, onAdd, onUpdate, onDelete }) => {
  const [name, setName] = useState('');
  const [salary, setSalary] = useState('');
  const [editing, setEditing] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      onUpdate(currentEmployee.id, { name: currentEmployee.name, salary });
      setEditing(false);
      setCurrentEmployee(null);
    } else {
      onAdd({ name, salary });
    }
    setName('');
    setSalary('');
  };

  const handleUpdateClick = (employee) => {
    setEditing(true);
    setCurrentEmployee(employee);
    setName(employee.name);
    setSalary(employee.salary);
  };

  const handleCancelUpdate = () => {
    setEditing(false);
    setCurrentEmployee(null);
    setName('');
    setSalary('');
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Employee Record</h1>
      <div className="row mt-4 justify-content-center">
        <div className="col-md-8">
          <form onSubmit={handleSubmit} className="form-inline">
            <div className="form-group mr-2">
              <label htmlFor="name" className="sr-only">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ width: '150px' }}
                disabled={editing}
              />
            </div>
            <div className="form-group mr-2">
              <label htmlFor="salary" className="sr-only">Salary</label>
              <input
                type="number"
                className="form-control"
                id="salary"
                placeholder="Salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                required
                style={{ width: '150px' }}
              />
            </div>
            <div>
              <button type="submit" className="btn btn-success">
                {editing ? 'Save' : 'Add Employee'}
              </button>
              {editing && (
                <button type="button" className="btn btn-secondary ml-2" onClick={handleCancelUpdate}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <div className="table-responsive mt-4">
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Salary</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <th scope="row">{employee.id}</th>
                <td>{employee.name}</td>
                <td>{employee.salary}</td>
                <td>
                  <div className="btn-group" role="group">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleUpdateClick(employee)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => onDelete(employee.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;

