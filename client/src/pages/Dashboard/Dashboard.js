//React
import React from 'react'

// Material UI
// import Button from '@material-ui/core/Button';
// import Group from '@material-ui/icons/Group';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';

import {
  // withStyles, 
  makeStyles,
  // useTheme 
} from '@material-ui/core/styles';
// import Link from '@material-ui/core/Link';

import ChartDoughnut from '../../components/ChartDoughnut'
import ChartHorizontalBar from '../../components/ChartHorizontalBar'
import ChartRadar from '../../components/ChartRadar'

// Other modules
// import CountUp from 'react-countup'
// import { injectIntl } from 'react-intl'
// import { withFirebase } from 'firekit-provider'
// import { Line, Bar, Doughnut } from 'react-chartjs-2'

const useStyles = makeStyles(theme => ({
  // const styles = makeStyles(theme => ({

  cardsContent: {
    paddingTop: '12vh',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '80vw',

    [theme.breakpoints.only('xs')]: {
      width: '100%',
      padding: 0,
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
    marginBottom: 12,

    // display: 'inline-block',
  },

  avatarRoot: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
    alignItems: 'center',
    // justifyContent: 'flex-start'
  },
}))

function Dashboard(props) {
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

  const dates = [], times = []; // timestamps

  const backgroundColors = [];

  function getRandomColor() {
    let letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <React.Fragment>
      {
        props.commentObjects.map(function (obj, ind) {
          let timeInMs = Date.parse(obj.timestamps.created_at);
          let prettyDate = new Date(timeInMs).toLocaleDateString();
          let prettyTime = new Date(timeInMs).toLocaleTimeString();

          // console.log('time=', prettyTime)
          // console.log('date=', prettyDate)
          dates.push(prettyDate);
          times.push(prettyTime);
          return ind; // simply avoids unhelpful msg
        })
      }
      {
        props.orgNames.map(function (val, ind) {
          backgroundColors.push(getRandomColor())
        })
      }
      <div className={classes.cardsContent}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2">
              User Summary
          </Typography>
            <br />
            <Typography className={classes.pos} color="textSecondary">You are currently affiliated with:</Typography>
            <Typography variant='h6'>
              {props.orgCount} organizations <Typography display='inline' variant='body1'>and</Typography> {props.projCount} projects.
            </Typography>
            <br />

            {
              props.projCountByOrg.length > 0 ?
                <ChartDoughnut
                  orgNames={props.orgNames}
                  projNames={props.projNames}

                  projCountByOrg={props.projCountByOrg}
                  // backgroundColors={backgroundColors}
                  backgroundColors={['red', 'orange', 'yellow', 'green']}
                /> : null
            }

            <ChartHorizontalBar />

          </CardContent>
        </Card>

        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Issue Summary
          </Typography>
            <br />
            <Typography
              // className={classes.pos} 
              color="textSecondary">You currently have:</Typography>
            <br />
            <Typography variant='h6'>
              {props.issueCount} issues from your connections.
              {' '}
            </Typography>

            <ChartRadar />
          </CardContent>
        </Card>


        <Card className={classes.wideCard}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Notifications
          </Typography>
            <br />
            {/* <Link
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
            </Link> */}
            <br />
            {
              props.commentObjects.map(function (obj, ind) {

                return (
                  <React.Fragment key={Math.random()}>
                    <Divider></Divider>
                    <CardActionArea>
                      <br></br>
                      <Typography
                        className={classes.pos} color="textSecondary"
                      >
                        {/* [ {dates[ind]}, {times[ind] }] - "{props.orgNames[ind]}"" company / {props.projNames[ind]} project / issue "{props.issueSubjects[ind]} */}
                        [ {dates[ind]}, {times[ind]} ] - Organization "{obj.organizationName}" / Project "{obj.projectName}" / Issue "{obj.issueSubject}"
                      {/* {obj.issue} */}
                        ":
                      </Typography>

                      <div className={classes.avatarRoot}>
                        <Avatar alt={obj.commenterName} src={obj.avatar}> 
                          {obj.displayName && obj.displayName !== 'Anonymous User' ? obj.commenterName : '?'}
                        </Avatar>
                        <Typography>
                          <b>{obj.commenterName ? obj.commenterName : 'Anonymous User'}</b> {obj.actionDescription[0][0].toLowerCase() + obj.actionDescription[0].slice(1)}: <em>"{obj.comment}"</em>
                        </Typography>
                      </div>
                    <br />
                    </CardActionArea>
                    {/* <Typography>"{obj.comment}"</Typography> */}
                  </React.Fragment>
                )
              })
            }
          </CardContent>

        </Card>

        {/* End of cardsContent div */}
      </div>
    </React.Fragment>
  )
}


// export default withStyles(styles)(Dashboard);
export default Dashboard;