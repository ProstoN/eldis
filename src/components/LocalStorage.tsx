import Department from "./department/Department";
import departmentsJson from "../assets/basicDepartments.json";
import Employee from "./employee/Employee";
import employeesJson from "../assets/basicEmployees.json";

export const getDepartments = (): Department[] => {
    if (JSON.parse(localStorage.getItem('departments') || 'null') === null) {
        localStorage.setItem('departments', JSON.stringify(departmentsJson))
    }
    let departments = JSON.parse(localStorage.getItem('departments')!)
    return departments.departments
}

export const setDepartments = (updatedDepartments: Department[]): void => {
    localStorage.setItem("departments", JSON.stringify({departments: updatedDepartments}));
}

export const getNoneObject = () => {

    if (JSON.parse(localStorage.getItem('none') || "null") === null) {
        localStorage.setItem('none', JSON.stringify({none: {id: 0, value: ""}}))
    }
    let none = JSON.parse(localStorage.getItem('none')!)
    return none.none
}

export const getEmployees = (): Employee[] => {
    if (JSON.parse(localStorage.getItem('employees') || 'null') === null) {
        localStorage.setItem('employees', JSON.stringify(employeesJson));
    }
    let employees = JSON.parse(localStorage.getItem('employees')!);
    return employees.employees
}

export const setEmployees = (updatedEmployees: Employee[]): void => {
    localStorage.setItem("employees", JSON.stringify({employees: updatedEmployees}));
}
