import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import DepartmentDetails from "../department/DepartmentDetails";
import EmployeeDetails from "../employee/EmployeeDetails";
import { Route } from "react-router-dom";
import DepartmentsTabs from "../department/DepartmentsTabs";
import { DepartmentsTable } from "../department/DepartmentsTable";
import { EmployeesTable } from "../employee/EmployeesTable";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        appBar: {
            [theme.breakpoints.up('sm')]: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth,
            },
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
                display: 'none',
            },
        },
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: drawerWidth,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    }),
);

interface Props {
    window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
    const {window} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    function ListItemLink(props: any) {
        return <ListItem button component="a" {...props} />;
    }

    const drawer = (
        <div>
            <List>
                <ListItemLink href="/" button key={"Home Page"}>
                    <ListItemText primary={"Home Page"}/>
                </ListItemLink>
                <Divider/>
                <ListItemLink href="/departments" button key={"Departments"}>
                    <ListItemText primary={"Departments"}/>
                </ListItemLink>
                <Divider/>
                <ListItemLink href="/employees" button key={"Employees"}>
                    <ListItemText primary={"Employees"}/>
                </ListItemLink>
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <Route path="/employee/:id" component={EmployeeDetails}/>
            <Route path="/employees" component={EmployeesTable}/>
            <Route path="/department/:id" component={DepartmentDetails}/>
            <Route path="/departments" component={DepartmentsTable}/>
            <Route exact path="/" component={DepartmentsTabs}/>
        </div>
    );
}
