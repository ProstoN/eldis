import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import { a11yProps, TabPanel, useStyles } from "./DepartmentsTabs";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import { Button, TextField } from "@material-ui/core";
import Department from "./Department";
import { getDepartments, getEmployees, getNoneObject, setDepartments, setEmployees } from "../LocalStorage";


type TParams = { id: string };

function findDepartmentById(id: string): Department {
    const departments: Department[] = getDepartments()
    const defaultDepartment: Department = {id: 0, name: "None"}
    for(let department of departments) {
        if (id === department.id.toString()) {
            return department;
        } else if (id === "new") {
            return defaultDepartment
        }
    }
    redirectToDepartments()
    return defaultDepartment
}

export function getAddDeleteTabs(id: string): JSX.Element[] {
    let tabs = [];
    if (id === "new") {
        tabs.push(<Tab label="Add" key={0} {...a11yProps(0)}/>)
    } else {
        tabs.push(<Tab label="Edit" key={0} {...a11yProps(0)}/>)
        tabs.push(<Tab label="Delete" key={1} {...a11yProps(1)} />)
    }
    return tabs;
}

const redirectToDepartments = (): void => {
    window.location.assign("/departments");
}

function DepartmentDetails({match}: RouteComponentProps<TParams>) {
    const id: string = match.params.id;
    const classes = useStyles();
    const theme = useTheme();

    const tabs = getAddDeleteTabs(id);
    const department = findDepartmentById(id);

    const [value, setValue] = React.useState(0);
    const [textFieldValue, setTextFieldValue] = React.useState(id === "new" ? "" : department.name);
    let initTextFieldValue = id === "new" ? "" : department.name;

    const isNameAvailable = (value: string) => {
        const departments: Department[] = getDepartments()
        for(let department of departments) {
            if (department.name === value) {
                return true
            }
        }
        return false
    }


    const handleChange = (event: React.ChangeEvent<{}>, newValue: number): void => {
        setValue(newValue);
    };

    const handleChangeTextFieldValue = (event: any): void => {
        setTextFieldValue(event.target.value)
    }

    const handleClickSave = () => {
        const departments: Department[] = getDepartments()
        const updatedDepartments = []
        for(let department of departments) {
            if (department.id === Number(id)) {
                department.name = textFieldValue
            }
            updatedDepartments.push(department)
        }
        if (id === "new") {
            updatedDepartments.push(createNewDepartment(departments))
        }
        setDepartments(updatedDepartments)
        window.location.assign("/departments")
    }

    const createNewDepartment = (departments: Department[]): Department => {
        let newDepartment = department;
        newDepartment.id = departments.reverse()[0].id + 1
        newDepartment.name = textFieldValue
        return newDepartment
    }

    const handleClickDelete = (): void => {
        updateDepartmentsAfterDelete()
        setDefaultDepartmentForEmployees()
        window.location.assign("/departments")
    }

    const updateDepartmentsAfterDelete = (): void => {
        const departments = getDepartments();
        setDepartments(departments.filter(department => department.id !== Number(id)))
    }

    const setDefaultDepartmentForEmployees = () => {
        const none = getNoneObject();
        const employees = getEmployees();
        for(let employee of employees) {
            if (employee.department.toString() === id) {
                employee.department = none.id
                break
            }
        }
        setEmployees(employees)
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
                <TextField value={textFieldValue} onChange={handleChangeTextFieldValue} label="Name"/>
                <Button
                    style={{marginLeft: 50, marginTop: 15}}
                    variant="contained"
                    color="primary"
                    onClick={handleClickSave}
                    disabled={textFieldValue === initTextFieldValue || textFieldValue === "" || isNameAvailable(textFieldValue)}>
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

export default DepartmentDetails
