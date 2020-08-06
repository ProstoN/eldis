import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import EmployeesTableTabs from "../employee/EmployeesTableTabs";
import { getDepartments, getEmployees } from "../LocalStorage";
import Employee from "../employee/Employee";

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: any;
    value: any;
}

export function TabPanel(props: TabPanelProps): JSX.Element {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

export function a11yProps(index: any) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}


function getDepartmentsTabs(isNeedDepartmentIds?: boolean): number[] | JSX.Element[] {
    const departments = getDepartments()
    let tabs: JSX.Element[] = [];
    let departmentIds: number[] = []

    for(let dep of departments) {
        if (isNeedDepartmentIds) {
            departmentIds.push(dep.id)
        } else {
            tabs.push(<Tab label={dep.name} key={dep.id - 1} {...a11yProps(dep.id)} />)
        }

    }
    return isNeedDepartmentIds ? departmentIds : tabs
}

function getEmployeesTabPanels(theme: any, currentTabNumber: number): JSX.Element[] {
    const employees: Employee[] = getEmployees()
    let tabPanel: JSX.Element[] = []
    const departmentIds = getDepartmentsTabs(true)

    for(let id of departmentIds) {
        let currentEmployeesOfDepartment = [];
        for(let employee of employees) {
            if (id === Number(employee.department)) {
                currentEmployeesOfDepartment.push(employee)
            }
        }
        tabPanel.push(<TabPanel value={currentTabNumber} key={tabPanel.length} index={tabPanel.length}
                                dir={theme.direction}>
            <EmployeesTableTabs employees={currentEmployeesOfDepartment}/>
        </TabPanel>)
    }
    return tabPanel;
}

export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        minWidth: `80%`,
    },
    formControl: {
        marginRight: 50,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    textFieldsWidth: {
        width: 250
    }
}));


export default function DepartmentsTabs() {
    const classes = useStyles();
    const theme = useTheme();
    const departmentsTabs = getDepartmentsTabs()
    const [value, setValue] = React.useState(0);

    const handleChangeCurrentTab = (event: React.ChangeEvent<{}>, newValue: number): void => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChangeCurrentTab}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    {departmentsTabs}
                </Tabs>
            </AppBar>
            {getEmployeesTabPanels(theme, value)}
        </div>
    );
}
