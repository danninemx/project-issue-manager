// React
import React from 'react';
import clsx from 'clsx';
import {
  // BrowserRouter as Router,
  // Switch, Route, 
  // Redirect,
  // useHistory, useLocation,
  withRouter,
  // Link
} from "react-router-dom";


// Material UI
import {
  makeStyles, useTheme
  // styled 
} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';

import Tooltip from '@material-ui/core/Tooltip'
import LockIcon from '@material-ui/icons/Lock'
import GitHubIcon from '@material-ui/icons/GitHub';

import DashboardIcon from '@material-ui/icons/Dashboard';
import CreateIcon from '@material-ui/icons/Create';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BusinessIcon from '@material-ui/icons/Business';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import FindInPageIcon from '@material-ui/icons/FindInPage';

// Firebase
import firebase from "firebase"

// Pages
// import Dashboard from '../../pages/Dashboard';
// import { ViewContext } from '../../utils/viewContext';


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarHeading: {
    flexGrow: 1,
    // padding: theme.spacing(3),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    // whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
}));

function Sidebar(props) {

  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.appBarHeading} noWrap> {props.activeView} </Typography>

          <Toolbar disableGutters>
            <Typography variant="h6" className={classes.title}>
              {/* Issue Manager */}
            </Typography>
            <div style={{ flex: 1 }} />
            <Tooltip id="tooltip-icon1" title="Sign out">
              <IconButton
                name="signout"
                aria-label="Sign In"
                color="inherit"
                onClick={() => {
                  firebase.auth().signOut(); // sign out of user session
                  props.history.push('/'); // redirect to LandingPage
                }}
                rel="noopener"
              >
                <LockIcon />
              </IconButton>
            </Tooltip>
            <Tooltip id="tooltip-icon2" title="GitHub repository">
              <IconButton
                name="github"
                aria-label="Open Github"
                color="inherit"
                href="https://github.com/danninemx/project-issue-manager"
                target="_blank"
                rel="noopener"
              >
                <GitHubIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List aria-label='sidebar menu list'>

          <ListItem button key='Dashboard'
            onClick={props.showDashboard}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>

          <ListItem button key='Submit Issue'
            onClick={props.showSubmitIssue}>
            <ListItemIcon>
              <CreateIcon />
            </ListItemIcon>
            <ListItemText primary="Submit Issue" />
          </ListItem>

          {/* conditional naming on userType */}
          <ListItem button key={props.userType === 'Reporter' ? 'Track Issue' : 'Manage Issue'}
            onClick={props.showManageIssue}>
            <ListItemIcon>
              <FindInPageIcon />
            </ListItemIcon>
            <ListItemText primary={props.userType === 'Reporter' ? 'Track Issue' : 'Manage Issue'} />
          </ListItem>

          <Divider />

          <ListItem button key='User Profile'
            onClick={props.showUserProfile}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="User Profile" />
          </ListItem>

          {props.userType !== 'Reporter' && // Render latter for developer+
            <>
              <ListItem button key='Organization Profile'
                onClick={props.showOrganizationProfile}>
                <ListItemIcon>
                  <BusinessIcon />
                </ListItemIcon>
                <ListItemText primary="Organization Profile" />
              </ListItem>

              <ListItem button key='Project Profile'
                onClick={props.showProjectProfile}>
                <ListItemIcon>
                  <AccountTreeIcon />
                </ListItemIcon>
                <ListItemText primary="Project Profile" />
              </ListItem>
            </>
          }

        </List>
        <Divider />
      </Drawer>
      {/* {console.log('props.children:', props.children)} */}
      {props.children}

    </div>

  );
}

// withRouter allows routing out to LandingPage on signout
export default withRouter(Sidebar)
