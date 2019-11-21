import React, { Component } from 'react';
// import clsx from 'clsx';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import Sidebar from '../../components/Sidebar';
import Dashboard from '../Dashboard';
import SubmitIssue from '../SubmitIssue';

import firebase from "firebase";

const styles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
}))

class DeveloperView extends Component {

    // state = {}
    constructor(props) {
        super(props);
        this.state = {
            activeView: 'Dashboard',
            methodInDeveloperView: true, // test state
        };
    }

    // state = {
    //     currentView: '',
    //     user: {
    //         email: '',
    //         firstName: '',
    //         lastName: '',
    //         organization: '',
    //         affiliatedProducts: [],
    //     },
    //     issues: {
    //         submitted: [],
    //         assigned: [],
    //     },
    // };

    // determineView = (view) => {
    // Loop thru all children elements and 
    // Per https://reactjs.org/docs/react-api.html#reactchildren
    // React.Children.map(this.props.children)
    // };


    determineView(props) {

        if (this.props.activeView) {
            console.log('\n DeveloperView sees this.props.activeView :', this.props.activeView);
        }

        let nextView;

        switch (this.props.activeView) {
            case 'Submit Issue':
                nextView = <SubmitIssue />
                break;
            case 'Review Issues':
                nextView = <SubmitIssue /> // Add additional page later
                break;
            default:
                nextView = <Dashboard />
        }
        return nextView;
    }

    componentDidMount(props) {
        console.log("\n DeveloperView received these props : ", this.props);

        // console.log("\n DeveloperView received this.props.children : ", this.props.children); // undefined
        // console.log("DeveloperView received this.props.profileImgSrc : ", this.props.profileImgSrc);
        // console.log("DeveloperView received this.props.userName : ", this.props.userName);
        // console.log("DeveloperView received this.props.signOutFunction : ", this.props.signOutFunction);
        // console.log("\n DeveloperView finally sees this state : ", this.state); // anti-design to update state with non-changing values

        // let newState = {
        //     userName: this.props.userName,
        //     signOutFunction: this.props.signOutFunction,
        //     profileImgSrc: this.props.profileImgSrc,
        //     activeView: this.determineView(props)
        // }
        // let newState = this.props; // This doesn't work.
        // console.log('DeveloperView used props to make newState : ', newState);

        firebase.auth().onAuthStateChanged(user => {
            this.setState({
                name: user.displayName,
                email: user.email,
                photoUrl: user.photoURL,
                emailVerified: user.emailVerified,
                idToken: user.getIdToken()
            })
        });
        // this.setState({ newState });
        // this.setState(newState);

        console.log("DeveloperView later sees this state : ", this.state);
        /*
          let arr = new Array(10).fill(undefined).map((val, idx) => {
            let user = {
              firstName: Faker.name.firstName(),
              lastName: Faker.name.lastName(),
              profilePicture: Faker.image.avatar(),
              lastSignedIn: moment(Faker.date.recent(45)).fromNow(),
              latestPost: Faker.lorem.paragraphs(2, " ")
            };
            return user;
          });
          this.setState({ users: arr });
        */

        // QUERY DB FOR USER'S RECORDS //

        // FUNC SIFTS FOR ISSUES SUMMARY STATS //
        //   {this.state.users.map(user => {
        //     return <Card key={user.profilePicture} user={user} />;
        //   })}
    }


    // componentDidUpdate(props) {

    // }

    render() {
        return (
            // <React.Fragment className={this.props.classes.root}>
            <Sidebar
                // userName={this.props.userName}
                // signOutFunction={this.props.signOutFunction}
                // profileImgSrc={this.props.profileImgSrc}
                user={this.state.user}
            >
                {this.determineView}
                {/* <SubmitIssue /> */}
                {/* <Dashboard /> */}
                {this.props.children}
            </Sidebar>
        );
    }
}

// Stateful Components (Class) cannot use Hooks such as useStyle.
export default withStyles(styles)(DeveloperView);
