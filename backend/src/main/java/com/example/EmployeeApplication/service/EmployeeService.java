package com.example.EmployeeApplication.service;

import com.example.EmployeeApplication.model.Employee;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {
    private List<Employee> employees=new ArrayList<>();
    private long nextId=1;

    public List<Employee> getAllEmployees(){
        return employees;
    }

    public Employee addEmployee(Employee employee){
        employee.setId(nextId++);
        employees.add(employee);
        return employee;
    }

    public Optional<Employee> updateEmployee(Long id, Employee updatedEmployee) {
        Optional<Employee> optionalEmployee=getEmployeeById(id);
        optionalEmployee.ifPresent(employee -> {
            employee.setName(updatedEmployee.getName());
            employee.setSalary(updatedEmployee.getSalary());
        });
        return optionalEmployee;
    }

    private Optional<Employee> getEmployeeById(Long id) {
        return employees.stream().filter(e->e.getId().equals(id)).findFirst();
    }

    public boolean deleteEmployee(Long id) {
        return employees.removeIf(employee -> employee.getId().equals(id));
    }
    public Optional<Employee> getEmployeeNameAndSalaryById(Long id) {
        return getEmployeeById(id);
    }

    public boolean deleteEmployeeByName(String name) {
        return employees.removeIf(employee -> employee.getName().equals(name));
    }

}

