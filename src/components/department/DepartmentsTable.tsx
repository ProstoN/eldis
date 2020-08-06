import React from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import Department from "./Department";
import { Link } from "react-router-dom";
import { getDepartments } from "../LocalStorage";

export function DepartmentsTable() {

    const departments = getDepartments();

    const addNewDepartment = (e: any) => {
        e.preventDefault();
        window.location.assign("/department/new")
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{fontWeight: 700}}>Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody style={{cursor: "pointer"}}>
                    {departments.map((department: Department) => (
                        <TableRow component={Link} to={"/department/" + department.id} key={department.name}>
                            <TableCell component="th" scope="row">
                                {department.name}
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell style={{fontWeight: 550}} onClick={addNewDepartment}><i>+ Add new
                            department</i></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}
