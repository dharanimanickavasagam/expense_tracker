import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import React from 'react';
import { makeStyles,useTheme } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import PeopleIcon from '@material-ui/icons/People';
import HouseIcon from '@material-ui/icons/House';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

import HouseHold from "./admin/household";
import Invite from "./admin/invite";
import ManageUser from "./admin/manageUser";
import Budget from "./admin/budget";

const drawerWidth = 240
const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      boxShadow :  "none !important"
    },
    menu : { 
        height : "100vh"
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      hide: {
        display: 'none',
      },
      appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }
  }));
  

const Admin = (pros) => {
    const classes = useStyles();
    const theme = useTheme();

    const [open, setOpen] = React.useState(false);
    const [section, setSection] = React.useState("");

    const data = [
        { name : "Manage User", icon : <PeopleIcon />, component: <ManageUser />},
        { name : "Manage Budget", icon : <AccountBalanceWalletIcon />, component: <Budget />},
        { name : "Household Settings", icon : <HouseIcon />, component: <HouseHold /> },
        { name : "Invite", icon : <MailIcon />, component: <Invite />}
    ];
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = (sectionComponent) => {
        setSection(sectionComponent);
        setOpen(false);
    };
    
    return (
     <div>
        <AppBar
            position="relative"
            className={classes.appBar}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, open && classes.hide)}
                >
                    <MenuIcon />
                </IconButton>
                
                <Typography variant="h6" noWrap>
                    App Controls
                </Typography>
            </Toolbar>
        </AppBar>

        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
        
            classes={{
            paper: classes.drawerPaper,
            }}
        >
      
            <List >
            {data.map((datum, index) => (
                <ListItem button key={index} onClick={() => handleDrawerClose(datum.component)}>
                    <ListItemIcon >
                        {datum.icon}
                    </ListItemIcon>
                    <ListItemText primary={datum.name} />
                </ListItem>
            ))}
            </List>
        
        </Drawer>

        <div className={classes.drawerHeader} >
            <Typography variant="h6">
                {section}
            </Typography>
        </div>
        
    </div>
    )
}
 
export default Admin;