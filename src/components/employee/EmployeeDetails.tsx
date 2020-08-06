import React from "react";
import { RouteComponentProps } from "react-router-dom";
import Employee from "./Employee";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import { TabPanel, useStyles } from "../department/DepartmentsTabs";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, useTheme } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { getAddDeleteTabs } from "../department/DepartmentDetails";
// @ts-ignore
import DateFnsUtils from "@date-io/date-fns";
import Department from "../department/Department";
import { getDepartments, getEmployees, setEmployees } from "../LocalStorage";

type TParams = { id: string };

function findEmployeeById(id: string): Employee {
    const employees: Employee[] = getEmployees();
    const defaultEmployee: Employee = {
        id: 0,
        firstName: "",
        lastName: "",
        position: "",
        employmentDate: 0,
        mentorId: 0,
        department: 0
    }
    for(let employee of employees) {
        if (id === employee.id.toString()) {
            return employee
        } else if (id === "new") {
            return defaultEmployee
        }
    }
    redirectToEmployees()
    return defaultEmployee
}

const redirectToEmployees = (): void => {
    window.location.assign("/employees");
}

function EmployeeDetails({match}: RouteComponentProps<TParams>) {
    const id = match.params.id
    const classes = useStyles();
    const theme = useTheme();
    const tabs = getAddDeleteTabs(id)
    const [value, setValue] = React.useState(0);
    const employees: Employee[] = getEmployees()
    const departments: Department[] = getDepartments()
    const initTextFieldsInputs = {
        id: 0,
        firstName: "",
        lastName: "",
        position: "",
        employmentDate: 0,
        mentorId: 0,
        department: 0
    }
    const [textFieldsInputs, setTextFieldsInputs] = React.useState(id === "new" ? initTextFieldsInputs : findEmployeeById(id))

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number): void => {
        setValue(newValue);
    };

    const handleClickSave = (): void => {
        const employees: Employee[] = getEmployees()
        removeSpaceFromInputs()
        const updatedEmployees = []
        for(let employee of employees) {
            if (employee.id === Number(id)) {
                employee = textFieldsInputs
            }
            updatedEmployees.push(employee)
        }
        if (id === "new") {
            updatedEmployees.push(createNewEmployee(employees))
        }
        setEmployees(updatedEmployees)
        window.location.assign("/employees")
    }

    const removeSpaceFromInputs = (): void => {
        textFieldsInputs.firstName.trim()
        textFieldsInputs.lastName.trim()
        textFieldsInputs.position.trim()
    }

    const createNewEmployee = (employees: Employee[]): Employee => {
        textFieldsInputs.id = employees.reverse()[0].id + 1
        return textFieldsInputs
    }


    const handleChangeTextFieldValue = (event: any): void => {
        setTextFieldsInputs({
            ...textFieldsInputs,
            [event.target.name]: event.target.value
        })
    }

    const handleDateChange = (date: Date | null): void => {
        setTextFieldsInputs({
            ...textFieldsInputs,
            employmentDate: validateDate(date)
        });
    };

    const validateDate = (date: Date | null): number => {
        let employmentDate: number = 0;
        const todayDate = new Date(Date.now()).getTime();
        if (date?.getTime() !== undefined) {
            if (date.getTime() >= todayDate) {
                employmentDate = todayDate
            } else {
                employmentDate = date.getTime()
            }
        }
        return employmentDate
    }

    const handleClickDelete = () => {
        const employees = getEmployees()
        let updatedEmployees = []
        for(let employee of employees) {
            if (employee.id !== Number(id)) {
                updatedEmployees.push(employee)
            }
        }
        setEmployees(updatedEmployees)
        window.location.assign("/employees")
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    {tabs}
                </Tabs>
            </AppBar>
            <TabPanel value={value} key={0} index={0} dir={theme.direction}>
                <TextField
                    name="firstName"
                    className={classes.textFieldsWidth}
                    style={{marginRight: 100, marginTop: 16}}
                    value={textFieldsInputs.firstName}
                    onChange={handleChangeTextFieldValue}
                    label="First Name"/>
                <br/>
                <TextField
                    name="lastName"
                    className={classes.textFieldsWidth}
                    style={{marginRight: 100, marginTop: 16}}
                    value={textFieldsInputs.lastName}
                    onChange={handleChangeTextFieldValue}
                    label="Last Name"/>
                <br/>
                <TextField
                    name="position"
                    className={classes.textFieldsWidth}
                    style={{marginRight: 100, marginTop: 16}}
                    value={textFieldsInputs.position}
                    onChange={handleChangeTextFieldValue}
                    label="Position"/>
                <br/>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        name="employmentDate"
                        variant="inline"
                        className={classes.textFieldsWidth}
                        style={{marginRight: 100, marginTop: 16}}
                        format="dd.MM.yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Employment Date"
                        value={new Date(textFieldsInputs.employmentDate)}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
                <br/>
                <FormControl style={{marginTop: 16}} className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Mentor</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="mentorId"
                        style={{marginRight: 50}}
                        className={classes.textFieldsWidth}
                        value={textFieldsInputs.mentorId}
                        onChange={handleChangeTextFieldValue}
                    >
                        <MenuItem value={0}>
                            <em>None</em>
                        </MenuItem>
                        {employees.map((employee: Employee) => (
                            employee.id !== Number(id) ? <MenuItem
                                value={employee.id}>{employee.firstName + " " + employee.lastName}</MenuItem> : console.log("next")
                        ))}
                    </Select>
                </FormControl>
                <br/>
                <FormControl style={{marginTop: 16}} className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Department</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="department"
                        style={{marginRight: 50}}
                        className={classes.textFieldsWidth}
                        value={textFieldsInputs.department}
                        onChange={handleChangeTextFieldValue}
                    >
                        <MenuItem value={0}>
                            <em>None</em>
                        </MenuItem>
                        {departments.map((department: Department) => (
                            <MenuItem value={department.id}>{department.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <br/>
                <Button
                    style={{marginTop: 15}}
                    variant="contained"
                    color="primary"
                    onClick={handleClickSave}
                    disabled={textFieldsInputs.firstName.trim() === "" ||
                    textFieldsInputs.lastName.trim() === "" ||
                    textFieldsInputs.position.trim() === ""}
                >
                    Save
                </Button>
            </TabPanel>
            <TabPanel index={1} value={value} key={1} dir={theme.direction}>
                <h3>Are you really want to delete?</h3>
                <Button
                    variant="contained"
                    onClick={handleClickDelete}
                    color="secondary">
                    Yes
                </Button>
            </TabPanel>
        </div>
    )
}

export default EmployeeDetails
