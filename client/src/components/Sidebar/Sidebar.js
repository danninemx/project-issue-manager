// React
import React from 'react';
import clsx from 'clsx';
import {
  BrowserRouter as Router, Switch, Route, Redirect, useHistory, useLocation, withRouter, Link
} from "react-router-dom";


// Material UI
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import Tooltip from '@material-ui/core/Tooltip'
import LockIcon from '@material-ui/icons/Lock'
import GitHubIcon from '@material-ui/icons/GitHub';

// Firebase
import firebase from "firebase"

// Pages
// import Dashboard from '../../pages/Dashboard';


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
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
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
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function Sidebar(props) {
  let user = {
    name: '',
    email: '',
    photoUrl: '',
    emailVerified: '',
    uid: '', // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    idToken: ''
  }

  // Get current user's info 

  firebase.auth().onAuthStateChanged(function (currentUser) {
    if (currentUser) {
      // User is signed in.
      console.log('\n Current authenticated user :', currentUser.displayName, currentUser.email, currentUser.photoURL, currentUser.emailVerified, currentUser.uid)
      // user.name = currentUser.displayName;
      // console.log('\n Saved user name initial: ', user.name);
      // user.name = currentUser.displayName;
      // console.log('\n Saved user name final: ', user.name);
      // console.log(this.user.name); // this does not work

      user.name = currentUser.displayName;
      user.email = currentUser.email;
      user.photoUrl = currentUser.photoURL;
      user.emailVerified = currentUser.emailVerified;
      user.idToken = currentUser.getIdToken();

      console.log('\n Saved user info: ', user);
    } else {
      // No user is signed in.
      console.log('\n There is no authenticated user right now.')
    }
  })

  // forcing synch
  //     function setUserInfo () {
  //       return new Promise(
  //     )}

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  console.log("\n Sidebar received these props : ", props); // Functional components use props, not this.props
  console.log("Sidebar received props.userName : ", props.userName);
  console.log("Sidebar received props.signOutFunction : ", props.signOutFunction);
  console.log("Sidebar received props.profileImgSrc : ", props.profileImgSrc);


  // firebase.auth().onAuthStateChanged(currentUser => {currentUser.displayName} )


  console.log(' \n Sidebar sees this user outside of the firebase function :', user)
  // On load, save user info
  // let testuser = firebase.auth().currentUser;  //This returns null even if sign in
  // console.log(testuser);
  // let name, email, photoUrl, uid, emailVerified, idToken;

  // console.log('\n current user: ', user)

  // if (user != null) {
  //   name = user.displayName;
  //   email = user.email;
  //   photoUrl = user.photoURL;
  //   emailVerified = user.emailVerified;
  //   uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
  //   // this value to authenticate with your backend server, if
  //   // you have one. Use User.getToken() instead.
  //   idToken = user.getIdToken();
  // }

  // console.log('\n Current user info: ', name, email, photoUrl, emailVerified, idToken)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClickEvent = (buttonText) => {
    switch (buttonText) {
      case 'Dashboard':
        console.log('\n You clicked ', buttonText);
        console.log('Sidebar sees props.history : ', props.history);
        break;
      case 'Submit Issue':
        console.log('\n You clicked ', buttonText);
        console.log('Sidebar sees props.history : ', props.history);

        // Per https://stackoverflow.com/questions/44121069/how-to-pass-params-with-history-push-link-redirect-in-react-router-v4
        // props.history.push({
        //   pathname: '/developerview',
        //   state: { activeView: buttonText }
        // }) 
        // This did not work.

        // Alternative suggestion
        // <Link to={{
        //   pathname: '/template',
        //   search: '?query=abc',
        //   state: { detail: response.data }
        // }}> My Link </Link> 

        // props.history.push("/developerview");
        break;
      case 'Review Issues':
        console.log('\n You clicked ', buttonText);
        console.log('Sidebar sees props.history : ', props.history);
        break;
      default:
        console.log('What did you even click? ', buttonText);
        console.log('Sidebar sees props.history : ', props.history);
    }
  }
  let testprint = 10000;

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
          <Typography variant="h6" noWrap>
            {/* {testprint} */}
            {/* { firebase.auth().onAuthStateChanged(function(currentUser) {
              return currentUser.displayName } )
              } */}
            {/* {user.name} */}
            {/* Display name of authenticated user */}
            {/* {firebase.auth().currentUser.displayName} */}
            {/* {firebase.auth().currentUser.da.displayName} */}
            {/* {this.setUserInfo.then(user.name)} */}
          </Typography>

          <Toolbar disableGutters>
            {/* <Typography variant="h6" className={classes.title}>
              Bug Tracker
          </Typography> */}
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
        <List>
          {/* {['Dashboard', 'Submit Issue', 'Review Issues'].map((text, index) => ( */}
          {['Dashboard', 'Submit Issue', 'Review Issues'].map((text, index) => (
            // <Link href="#" onClick={() => handleClickEvent(text)}>
            <Link to={{
              pathname: '/developerview',
              state: {
                userName: props.userName,
                signOutFunction: props.signOutFunction,
                profileImgSrc: props.profileImgSrc,
                activeView: text
              }
            }}>
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
      </Drawer>

      {/* <Link to={{
          pathname: '/template',
          search: '?query=abc',
          state: { detail: response.data }
        }}> My Link </Link>  */}


      {props.children}
    </div>
  );
}

// withRouter allows routing out to LandingPage on signout
export default withRouter(Sidebar)
