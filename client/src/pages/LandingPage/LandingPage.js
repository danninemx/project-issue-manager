// React and related libraries
import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
  withRouter
} from "react-router-dom";


// rmw
// import { Helmet } from 'react-helmet' // manages document head
// import { GitHubIcon } from 'rmw-shell/lib/components/Icons'

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
import { withStyles } from '@material-ui/core/styles'
import BugReportTwoToneIcon from '@material-ui/icons/BugReportTwoTone';


// Other


// Default style settings for Material UI
const styles = theme => ({
  main: {
    display: 'flex',
    flexDirection: 'column'
  },
  root: {
    flexGrow: 1,
    flex: '1 0 100%'
    // height: '100%',
    // overflow: 'hidden'
  },
  hero: {
    height: '100%',
    // minHeight: '80vh',
    flex: '0 0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.type === 'light' ? theme.palette.primary.dark : theme.palette.primary.main
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    letterSpacing: '.7rem',
    textIndent: '.7rem',
    fontWeight: theme.typography.fontWeightLight,
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
    height: '100%',
    // paddingTop: theme.spacing(1) * 8,
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(1)
    }
  },
  button: {
    marginTop: theme.spacing(1) * 3
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
    maxWidth: "50%",
    margin: 15,
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
  cardTitle: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
})

const LandingPage = ({ classes, history, theme }) => {
  // const isAuthorised = () => {
  //   try {
  //     const key = Object.keys(localStorage).find(e => e.match(/persist:root/))
  //     const data = JSON.parse(localStorage.getItem(key))
  //     const auth = JSON.parse(data.auth)

  //     return auth && auth.isAuthorised
  //   } catch (ex) {
  //     return false
  //   }
  // }

  // useEffect(() => {
  //   if (isAuthorised()) {
  //     history.push('/signin')
  //   }
  // })

  return (

    <div className={classes.main}>
      {/* <Helmet>
        <meta name="theme-color" content={theme.palette.primary.main} />
        <meta name="apple-mobile-web-app-status-bar-style" content={theme.palette.primary.main} />
        <meta name="msapplication-navbutton-color" content={theme.palette.primary.main} />
        <title>Bug Tracker</title>
      </Helmet> */}

      <AppBar position="static">

        <Toolbar disableGutters>
          <Typography variant="h6" className={classes.title}>
            Bug Tracker
          </Typography>
          <div style={{ flex: 1 }} />
          <Tooltip id="tooltip-icon1" title="Sign in">
            <IconButton
              name="signin"
              aria-label="Sign In"
              color="inherit"
              onClick={() => {
                history.push('/signin')
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
          <div className={classes.content}>

            {/* <img src="/rmw.svg" alt="Material-UI Logo" className={classes.logo} /> */}
            <BugReportTwoToneIcon alt="Material-UI Logo" className={classes.logo} />
            <div className={classes.text}>
              <Typography
                variant="h3"
                align="center"
                component="h1"
                color="inherit"
                gutterBottom
                className={classes.title}
              >
                {'Bug Tracker'}
              </Typography>
              <Typography variant="h5" component="h2" color="inherit" gutterBottom className={classes.h5}>
                {'For all bug control needs, from submission to resolution.'}
              </Typography>
              <Button
                onClick={() => {
                  // Reinstate this once signin page is set up with authentication
                  // history.push('/signin')
                  history.push('/dashboard')
                }}
                className={classes.button}
                variant="outlined"
                color="primary"
              >
                {'Get Started'}
              </Button>
            </div>

            {/* Will incorporate the cards section below upon further deliberation */}

            <div className={classes.cardsContent}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    What is this app?
                  </Typography>
                  <Typography noWrap={false} color="textSecondary">
                    <br></br>
                    {`This is an open source bug tracker system.`}
                    <br></br>
                    {`It's free. Setup takes less than 5 minutes.`}
                    <br></br>
                    {`Whether you are reporting or fixing a bug, we got you covered. `}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => {
                      history.push('/signin')
                    }}
                  >
                    Submit Issue
                  </Button>
                </CardActions>
              </Card>
              {/* End of  */}

              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Want to test it out on desktop?
                  </Typography>
                  <br />
                  <Typography>{'Paste this in Node command line:'}</Typography>
                  <br />
                  <Typography className={classes.pos} color="textSecondary">
                    {' '}
                    git clone https://github.com/danninemx/project-issue-manager{' '}
                    <br></br>
                    {' '}
                    npm i  #or yarn{' '}
                    <br></br>
                    {' '}
                    npm start  #or yarn run start{' '}
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
              {/* <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Usage
                  </Typography>
                  <br />
                  <Typography>{'Set your configuration to the App component:'}</Typography>
                  <br />
                  <Typography className={classes.pos} color="textSecondary">
                    {'import App from \'rmw-shell\''}
                    <br />
                    {'<App appConfig={{ configureStore, ...config }} />'}
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
              </Card> */}

            </div>

            {/* End of cardsContent */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(withStyles(styles, { withTheme: true })(LandingPage))
