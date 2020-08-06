import Employee from "./Employee";
import React from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { Link } from "react-router-dom";
import { findMentorById } from "./EmployeesTable";

interface EmployeesTableProps {
    employees: Employee[]
}

class EmployeesTableTabs extends React.Component<EmployeesTableProps> {

    render(): React.ReactNode {
        return (
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight: 700}}>Name</TableCell>
                            <TableCell style={{fontWeight: 700}} align="right">Position</TableCell>
                            <TableCell style={{fontWeight: 700}} align="right">Employment Date</TableCell>
                            <TableCell style={{fontWeight: 700}} align="right">Mentor</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.employees.map((employee: Employee) => (
                            <TableRow
                                component={Link} to={"/employee/" + employee.id}
                                key={employee.firstName + " " + employee.lastName}
                                style={{cursor: "pointer"}}>
                                <TableCell component="th" scope="row">
                                    {employee.firstName + " " + employee.lastName}
                                </TableCell>
                                <TableCell align="right">{employee.position}</TableCell>
                                <TableCell
                                    align="right">{new Date(employee.employmentDate).toLocaleDateString()}</TableCell>
                                <TableCell align="right">{findMentorById(employee.mentorId)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}

export default EmployeesTableTabs
