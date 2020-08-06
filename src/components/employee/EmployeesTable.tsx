import Employee, { EmployeeId } from "./Employee";
import React from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { Link } from "react-router-dom";
import Department, { DepartmentId } from "../department/Department";
import { getDepartments, getEmployees, getNoneObject } from "../LocalStorage";

export const findMentorById = (id: EmployeeId): string => {
    const employees: Employee[] = getEmployees();
    const none = getNoneObject()
    if (id === none.id) {
        return none.value
    }
    for(let employee of employees) {
        if (id === employee.id) {
            return employee.firstName + " " + employee.lastName
        }
    }
    return none.value
}

const findDepartmentById = (id: DepartmentId): string => {
    const none = getNoneObject()
    const departments: Department[] = getDepartments()
    if (id === none.id) {
        return none.value
    }
    for(let department of departments) {
        if (id === department.id) {
            return department.name
        }
    }
    return none.value
}

const addNewDepartment = (e: any): void => {
    e.preventDefault();
    window.location.assign("/employee/new")
}

export function EmployeesTable() {

    const employees: Employee[] = getEmployees();

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{fontWeight: 700}}>Name</TableCell>
                        <TableCell style={{fontWeight: 700}} align="right">Position</TableCell>
                        <TableCell style={{fontWeight: 700}} align="right">Employment Date</TableCell>
                        <TableCell style={{fontWeight: 700}} align="right">Mentor</TableCell>
                        <TableCell style={{fontWeight: 700}} align="right">Department</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody style={{cursor: "pointer"}}>
                    {employees.map((employee: Employee) => (
                        <TableRow
                            component={Link} to={"/employee/" + employee.id}
                            key={employee.firstName + " " + employee.lastName}>
                            <TableCell component="th" scope="row">
                                {employee.firstName + " " + employee.lastName}
                            </TableCell>
                            <TableCell align="right">{employee.position}</TableCell>
                            <TableCell
                                align="right">{new Date(employee.employmentDate).toLocaleDateString()}</TableCell>
                            <TableCell align="right">{findMentorById(Number(employee.mentorId))}</TableCell>
                            <TableCell align="right">{findDepartmentById(Number(employee.department))}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell style={{fontWeight: 550}} onClick={addNewDepartment}><i>+ Add new
                            employee</i></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}
