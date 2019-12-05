//React
import React from 'react'

// Material UI
import Button from '@material-ui/core/Button';
// import Group from '@material-ui/icons/Group';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {
  // withStyles, 
  makeStyles,
  // useTheme 
} from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

// Other modules
// import CountUp from 'react-countup'
// import { injectIntl } from 'react-intl'
// import { withFirebase } from 'firekit-provider'
// import { Line, Bar, Doughnut } from 'react-chartjs-2'

const useStyles = makeStyles(theme => ({
  // const styles = makeStyles(theme => ({
  // root: {
  //   align: 'center',
  //   display: 'flex',
  // },
  cardsContent: {
    padding: 15,
    paddingTop: '12vh',
    // paddingLeft: 15,
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '80vw',

    [theme.breakpoints.only('xs')]: {
      width: '100%',
      padding: 0,
      // paddingTop: 15
      paddingTop: 60,
      paddingLeft: 0,

    }
  },
  card: {
    // minWidth: "37vw",
    // maxWidth: 350,
    width: "35vw",
    margin: 15,
    [theme.breakpoints.only('xs')]: {
      minWidth: 275,
      width: '100%',
      margin: 0,
      marginTop: 7
    },
    // "&:last-child": {
    //   marginTop: 25,
    // }
  },
  wideCard: {
    // minWidth: "90%",
    // maxWidth: 350,
    // maxWidth: "100vw",
    width: '100vw',
    margin: 15,
    [theme.breakpoints.only('xs')]: {
      width: '100%',
      margin: 0,
      marginTop: 7
    },
  },
  mouseEntered: {
    color: "red",
  },
  mouseLeft: {
    color: "black",
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
  },
}))

function Dashboard() {
  /*
    let state = {
      // This tells the AppBar which menu to highlight, maybe.
      currentPage: "",
  
      // Submitted, In progress, Resolved, Closed...
      counts: {
        submitted: 5,
        reviewed: 1,
        resolved: 1,
        closed: 3
      },
  
      latestIssue: {},
  
      // Status updates in sentence form: MM/DD/YY hh:mm - ${assignee} ${action description} (Issue #${###-###-###-###})
      // Give thoughts on the issue number structure.
      notifications: []
    };
  */
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.cardsContent}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Organization Summary
          </Typography>
            <br />
            <Typography>{'Paste this in Node command line:'}</Typography>
            <br />
            <Typography className={classes.pos} color="textSecondary">
              <br></br>
              Submitted:
              {/* {this.state.counts.submitted} */}
              {' '}
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

        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2">
              My Issues
          </Typography>
            <br />
            <Typography>{'Paste this in Node command line:'}</Typography>
            <br />
            <Typography className={classes.pos} color="textSecondary">
              <br></br>
              Submitted:
              {/* {this.state.counts.submitted} */}
              {' '}
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


        <Card className={classes.wideCard}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Notifications
          </Typography>
            <br />
            <Link
              component="button"
              variant="body1"
              color="textPrimary"
              onClick={() => {
                console.log("Some accessibility message here...")
                let win = window.open('https://github.com/danninemx/project-issue-manager', '_blank')
                win.focus()
              }}
            >
              {'DISPLAY AUTOMATED MESSAGES HERE (e.g. Like this)'}
            </Link>
            <br />
            <Typography className={classes.pos} color="textSecondary">
              <br></br>
              11/20/2019 03:30 PM - Someone did Something, Something and Something.
              {/* {this.state.counts.submitted} */}
              <br></br>
              11/20/2019 03:30 PM - Someone did Something, Something and Something.

              <br></br>
              11/20/2019 03:30 PM - Someone did Something, Something and Something.

              {' '}
            </Typography>
          </CardContent>

        </Card>

        {/* End of cardsContent div */}
      </div>
    </React.Fragment>
  )
}


// export default withStyles(styles)(Dashboard);
export default Dashboard;