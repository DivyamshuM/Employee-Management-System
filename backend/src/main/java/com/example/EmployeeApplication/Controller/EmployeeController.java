package com.example.EmployeeApplication.Controller;
import com.example.EmployeeApplication.model.Employee;
import com.example.EmployeeApplication.service.EmployeeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping
    public List<Employee> listEmployees(){
        return employeeService.getAllEmployees();
    }

    @PostMapping("/addEmployee")
    public Employee addEmployee(@RequestBody Employee employee){
        return employeeService.addEmployee(employee);
    }
    @PutMapping("/{id}")
    public Optional<Employee> editEmployee( @PathVariable Long id, @RequestBody Employee employee){
        return employeeService.updateEmployee(id,employee);
    }
    @DeleteMapping("/{id}")
    public boolean deleteEmployee( @PathVariable Long id){
        return employeeService.deleteEmployee(id);
    }
    @GetMapping("/{id}")
    public Optional<Employee> getEmployeeNameAndSalary(@PathVariable Long id) {
        return employeeService.getEmployeeNameAndSalaryById(id);
    }
    @DeleteMapping("/name/{name}")
    public boolean deleteEmployeeByName(@PathVariable String name) {
        return employeeService.deleteEmployeeByName(name);
    }
}
