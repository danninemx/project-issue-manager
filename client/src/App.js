import React, { Component, useEffect } from "react";
import {
  BrowserRouter as Router, Switch, Route,
  // Link, 
  // Redirect, 
  useHistory
  // useLocation, withRouter 
} from "react-router-dom";
// import PropTypes from 'prop-types';
// import { Helmet } from 'react-helmet' // manages document head

// Pages
// import LandingPage from "./pages/LandingPage"; // absorbed it here
import SubmitIssue from "./pages/SubmitIssue";
import Dashboard from "./pages/Dashboard";
// import NoMatch from "./pages/NoMatch";

// Material-UI
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import GitHubIcon from '@material-ui/icons/GitHub';
import IconButton from '@material-ui/core/IconButton'
import LockIcon from '@material-ui/icons/Lock'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import BugReportTwoToneIcon from '@material-ui/icons/BugReportTwoTone';

// Styling
import "./App.css";
import bgvideo from './utils/bgvideo.mp4';
// import bgvideo from 'https://www.dropbox.com/s/nih1jqgvw29bjh0/bgvideo.mp4'; // no good

// // Hashing. Later when I have to register a new user.
// import bcrypt from 'bcrypt';
// const saltRounds =10;

import SigninPage from "./pages/SigninPage";
import DeveloperView from "./pages/DeveloperView";

// Default style settings for Material UI
const useStyles = makeStyles(theme => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  root: {
    flexGrow: 1,
    // flex: '1 0 100%',
    // height: '100%',
    overflow: 'cover', //'hidden',
  },
  hero: {
    height: '100%',
    // minHeight: '80vh',
    flex: '0 0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.type === 'light' ? theme.palette.primary.dark : theme.palette.primary.main,

    // addition for image
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', // fallback
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    padding: '0 30px',
  },

  text: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    // letterSpacing: '.7rem',
    textIndent: '.7rem',
    fontWeight: theme.typography.fontWeightBold,
    [theme.breakpoints.only('xs')]: {
      fontSize: 24,
      letterSpacing: '.1em',
      textIndent: '.1rem'
    },
    whiteSpace: 'nowrap'
  },
  h5: {
    paddingLeft: theme.spacing(1) * 4,
    paddingRight: theme.spacing(1) * 4,
    marginTop: theme.spacing(1),
    maxWidth: 600,
    textAlign: 'center',
    [theme.breakpoints.only('xs')]: {
      fontSize: 18
    }
  },
  content: {
    height: '100vh',

    width: '70vw',
    opacity: '0.99',
    backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.01), rgba(240,255,255,0.99), rgba(240,255,255,1), rgba(240,255,255,1), rgba(240,255,255,0.99), rgba(255,255,255,0.01))',

    // paddingTop: theme.spacing(1) * 8,
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(1)
    }
  },
  button: {
    marginTop: theme.spacing(1) * 3,
    marginLeft: theme.spacing(1) * 3,
    marginRight: theme.spacing(1) * 3,
  },

  buttonGroup: {
    [theme.breakpoints.only('xs')]: {
      textAlign: 'center',
    }
  },

  logo: {
    color: 'secondary',
    margin: `${theme.spacing(1) * 3}px 0 ${theme.spacing(1) * 4}px`,
    width: '100%',
    height: '40vw',
    maxHeight: 250
  },
  steps: {
    maxWidth: theme.spacing(1) * 130,
    margin: 'auto'
  },
  step: {
    padding: `${theme.spacing(1) * 3}px ${theme.spacing(1) * 2}px`
  },
  stepIcon: {
    marginBottom: theme.spacing(1)
  },
  markdownElement: {},
  cardsContent: {
    padding: 15,
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    [theme.breakpoints.only('xs')]: {
      width: '100%',
      padding: 0,
      paddingTop: 15
    }
  },
  card: {
    minWidth: 275,
    // maxWidth: 350,
    maxWidth: "38%",
    margin: 25,
    //15,

    flexGrow: 1,
    width: 400,
    paddingTop: 15,
    paddingRight: 25,
    paddingBottom: 15,
    paddingLeft: 25,

    filter: 'drop-shadow(8px 9px 6px gray)',

    [theme.breakpoints.only('xs')]: {
      width: '100%',
      margin: 0,
      marginTop: 7
    }
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },

  pos: {
    marginBottom: 12
  },

  ulist: {
    color: 'rgba(0, 0, 0, 0.54)',
  }
}))

class App extends Component {
  // constructor(props) {
  //   super(props);
  constructor() {
    super();

    // Bind the this context to the handler function
    this.handler = this.handler.bind(this);
    // this.handleSignIn = this.handleSignIn.bind(this);

    // Set default auth state of false
    this.state = {
      isAuthenticated: false,
    };
  }

  handler() {
    this.setState({
      ...this.state,
      isAuthenticated: true
    })
    alert('Welcome, user!');
  }


  handleSignIn() {
    this.setState({
      ...this.state,
      isAuthenticated: true
    })
    alert('Welcome, user!');
  }

  handleSignOut() {
    this.setState({
      isAuthenticated: false
    })
  }

  ProtectedRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={children}
      // ({ location }) => fakeAuth.isAuthenticated ? (
      //   children
      // ) : (
      //   <Redirect
      //     to={{
      //       pathname: "/login",
      //       state: { from: location }
      //     }}
      // />
      // )
      // }
      />
    );
  }

  AuthenticateButton = () => {
    let history = useHistory();

    return this.authentication.isAuthenticated ? (
      <p>
        Welcome!{" "}
        <button
          onClick={() => {
            this.authentication.signout(() => history.push("/"));
          }}
        >
          Sign out
        </button>
      </p>
    ) : (
        <p>You are not logged in.</p>
      );
  }

  LandingPage = ({
    // classes, 
    history, theme }) => {
    const classes = useStyles();
    const isAuthorised = () => {
      try {
        const key = Object.keys(localStorage).find(e => e.match(/persist:root/))
        const data = JSON.parse(localStorage.getItem(key))
        const auth = JSON.parse(data.auth)

        return auth && auth.isAuthorised
      } catch (ex) {
        return false
      }
    }

    useEffect(() => {
      if (isAuthorised()) {
        history.push('/signin')
      }
    })

    return (
      <div className={classes.main}>
        {/* <Helmet>
        <meta name="theme-color" content={theme.palette.primary.main} />
        <meta name="apple-mobile-web-app-status-bar-style" content={theme.palette.primary.main} />
        <meta name="msapplication-navbutton-color" content={theme.palette.primary.main} />
        <title>Bug Tracker</title>
      </Helmet> */}

        <AppBar position="sticky"// position="static"
        >
          <Toolbar disableGutters>
            {/* Appbar text */}
            <Typography variant="h6" className={classes.title} style={{ marginLeft: 15 }}>
              Issue-O-Matic
          </Typography>
            <div style={{ flex: 1 }} />
            <Tooltip id="tooltip-icon1" title="Sign in">
              <IconButton
                name="signin"
                aria-label="Sign In"
                color="inherit"
                onClick={() => {
                  history.push('/signinpage')
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
        </AppBar>
        {/* End of Navbar */}

        <div className={classes.root}>
          <div className={classes.hero}>

            <div className="videoContainer"
              style={{
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', // fallback

                position: 'fixed',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',

                filter: 'blur(3px)'
              }}
            >

              <video id="background-video" loop autoPlay muted playsInline
                style={{
                  position: 'absolute',
                  top: '0',
                  bottom: '0',
                  right: '0',
                  left: '0',
                  margin: 'auto',
                  minHeight: '50%',
                  minWidth: '50%',
                }}
              // style={{ // works in standalone
              //   position: 'fixed',
              //   right: '0',
              //   bottom: '0',
              //   minWidth: '100%',
              //   minHeight: '100%',
              //   zIndex: '-99'
              // }}
              >
                <source src={bgvideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* End of videoContainer */}
            </div>

            <div className={classes.content}>

              <BugReportTwoToneIcon alt="Material-UI Logo" className={classes.logo} />
              <div className={classes.text}>
                <Typography
                  variant="h2"
                  align="center"
                  component="h1"
                  color="inherit"
                  gutterBottom
                  className={classes.title}
                >
                  {"Issue-O-Matic"}
                </Typography>
                <Typography variant="h5" component="h2" color="inherit" gutterBottom className={classes.h5}>
                  {'Your project issues, from submission to resolution.'}
                </Typography>

                <div className={classes.buttonGroup}>
                  <Button
                    onClick={() => {
                      // Direct user to issue submission page through Router's history object
                      history.push('/submitissue')
                    }}
                    className={classes.button}
                    variant="outlined"
                    color="primary"
                  >
                    {'Report an Issue'}
                  </Button>
                  <Button
                    onClick={() => {
                      // Direct user to signin page through Router's history object
                      history.push('/signinpage')
                    }}
                    className={classes.button}
                    variant="outlined"
                    color="primary"
                  >
                    {'Enter the Site'}
                  </Button>
                </div>
              </div>
              {/* End of text */}

              <div className={classes.cardsContent}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      What is this?
                  </Typography>
                    <br></br>
                    <Typography color='textSecondary'>{`Open source issue tracking tool ideal for:`}</Typography>
                    <br />
                    <Typography color='textSecondary' component="li">SMB Incident Recorder</Typography>
                    <Typography color='textSecondary' component="li">Bug Tracker</Typography>
                    <Typography color='textSecondary' component="li">Customer Feedback Platform</Typography>
                    <br />
                    <Typography color="textSecondary">
                      {`Simple, fast -- and completely free.`}
                    </Typography>
                  </CardContent>
                  {/* <CardActions>
                    <Button
                      size="small"
                      onClick={() => {
                        history.push('/signinpage')
                      }}
                    >
                      Get started
                  </Button>
                  </CardActions> */}
                </Card>
                {/* End of  */}

                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      How do I start?
                  </Typography>
                    <br />
                    <Typography color='textSecondary'>{'Sign in with your SNS/email to open an account.'}</Typography>
                    <br />
                    <Typography color="textSecondary">
                      {/* className={classes.pos}  */}
                      {'Setup takes < 5 minutes.'}
                      <br />
                      {' '}
                      <br />
                      Customers may report an issue - even anonymously.
                      <br />
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => {
                        let win = window.open('https://github.com/danninemx/project-issue-manager', '_blank')
                        win.focus()
                      }}
                    >
                      Learn More
                  </Button>
                  </CardActions>
                </Card>
              </div>

              {/* End of cardsContent */}
            </div>

            {/* End of hero */}
          </div>

          {/* End of root */}
        </div>

        {/* End of main */}
      </div >
    )
  }

  componentDidMount = () => {
    // console.log('did mount. State: ', this.state);
  }

  componentDidUpdate = () => {
    // console.log('did update. State: ', this.state);
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={this.LandingPage} />
            <Route exact path="/signinpage" handler={this.handler} component={SigninPage} />
            <Route exact path="/submitissue" component={SubmitIssue} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/developerview">
              <DeveloperView />
            </Route>
            {/* <Route path="*" component={NoMatch} /> */}

          </Switch>
        </div>
      </Router >
    )
  }
}
export default App;
