import React, { Component } from 'react';
import {
    // BrowserRouter as Router, Switch, Route, Redirect, useHistory, useLocation, withRouter, Link
} from "react-router-dom";
import { withStyles, makeStyles } from '@material-ui/core/styles';

import Sidebar from '../../components/Sidebar';
import Dashboard from '../Dashboard';
import SubmitIssue from '../SubmitIssue';
import firebase from "firebase";

import API from '../../utils/API'
// import isSignedIn from '../../utils/isSignedIn';

const styles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
}))

class DeveloperView extends Component {

    constructor(props) {
        super(props);
        // State updater function to be passed down into the context provider per https://reactjs.org/docs/context.html
        this.toggleTheme = () => {
            this.setState(state => ({
                // 
            }));
        }

        this.state = {
            // activeView: 'Dashboard',
            methodInDeveloperView: true, // test state
            seedUsers: [
                // {
                // "email": "dudkny@gmail.com",
                // "firstName": "Danny",
                // "lastName": "Kim",
                // "userType": "developer",
                // "photoURL": "google.com",
                // "submittedIssues": ['blah'],
                // "affiliatedOrganization": ['test'],
                // "affiliatedProject": ['play']
                // }
                // ,
                // {
                //     "email": "test@user.com",
                //     "firstName": "Test",
                //     "lastName": "User",
                //     "photoURL": "google.com",
                //     "submittedIssues": [],
                //     "userType": "user",
                //     "affiliatedOrganization": [],
                //     "affiliatedProject": []
                // }
            ]
        };

        this.determineView = (props) => {
            if (this.props.activeView) {
                // console.log('\n DeveloperView sees this.props.activeView :', this.props.activeView);
            }
            let nextView;

            switch (this.props.activeView) {
                case '/submitissue':
                    nextView = <SubmitIssue />
                    // console.log(' nextView is: ', nextView);
                    break;
                // case 'Review Issues':
                //     nextView = <SubmitIssue /> // Add additional page later
                //     break;
                default:
                    // console.log('hitting default');
                    nextView = <Dashboard />
            }
            return nextView;
        }
    };

    // test only
    changeName = () => {
        this.setState({ name: 'Super Dan' })
        alert('name changed!')
    }
    // determineView = (view) => {
    // Loop thru all children elements and 
    // Per https://reactjs.org/docs/react-api.html#reactchildren
    // React.Children.map(this.props.children)
    // };

    // Call this to run API method saveUser
    handleUserSave = (user) => {
        // API.userTest({
        API.createUser({
            // user // Cannot save object

            // email: '1@1.com',
            // firstName: 'test f',
            // lastName: 'test l',
            // userType: 'a type'

            // "email": user[Object.keys(user)[0]],
            // "firstName": user[Object.keys(user)[1]],
            // "lastName": user[Object.keys(user)[2]],
            // "photoURL": user[Object.keys(user)[3]],
            // "submittedIssues": user[Object.keys(user)[4]],
            // "userType": user[Object.keys(user)[5]],
            // "affiliatedOrganization": user[Object.keys(user)[6]],
            // "affiliatedProject": user[Object.keys(user)[7]]

            // email: user.email,
            // firstName: user.firstName,
            // lastName: user.lastName,
            // photoURL: user.photoUrl,
            // submittedIssues: user.submittedIssues,
            // userType: user.userType,
            // affiliatedOrganization: user.affiliatedOrganization,
            // affiliatedProject: user.affiliatedProject
        })
        // .then(() => this.getBooks());

        // WILL NEED QUALIFIER LATER
        // const user = this.state.users.find(user => user.email === email);

        // console.log(user[Object.keys(user)[0]]);
        //     console.log(user[Object.keys(user)[1]]);
        //     console.log(user[Object.keys(user)[2]]);
        //     console.log(user[Object.keys(user)[3]]);
        //     console.log(user[Object.keys(user)[4]]);
        //     console.log(user[Object.keys(user)[5]]);
        //     console.log(user[Object.keys(user)[6]]);
        //     console.log(user[Object.keys(user)[7]])

    };

    seed = () => {
        for (let ea of this.state.seedUsers) { // array
            // console.log('ea: ', ea) // object of key-val pairs
            this.handleUserSave(ea); // SAVE FULL OBJECT TO DB

            // let keys = Object.keys(ea) // array of keys
            // console.log("this person's keys are ", keys) // array of strings

            // for (let key in keys) { // iterate over key-value pairs in object and give value
            //     // key comes out ot be index num
            //     console.log('For key ' + keys[key] + ', value is ', ea[keys[key]])
            //     // console.log('ea[key]: ', ea[key])
            // }
        }
    }

    componentDidMount(props) {
        // Keep using
        // console.log("\n DeveloperView received these props : ", this.props);

        // console.log("\n DeveloperView received this.props.children : ", this.props.children); // undefined
        // console.log("DeveloperView received this.props.profileImgSrc : ", this.props.profileImgSrc);
        // console.log("DeveloperView received this.props.userName : ", this.props.userName);
        // console.log("DeveloperView received this.props.signOutFunction : ", this.props.signOutFunction);
        // console.log("\n DeveloperView finally sees this state : ", this.state); // anti-design to update state with non-changing values

        // isSignedIn();

        firebase.auth().onAuthStateChanged(user => {
            // Keep using
            // console.log('\n DeveloperView sees user :', user.displayName, user.email, user.photoURL, user.emailVerified, user.uid)
            this.setState({
                name: user.displayName,
                email: user.email,
                photoUrl: user.photoURL,
                emailVerified: user.emailVerified,
                idToken: user.getIdToken()
            })
        });

        // let newState = {
        //     userName: this.props.userName,
        //     signOutFunction: this.props.signOutFunction,
        //     profileImgSrc: this.props.profileImgSrc,
        //     activeView: this.determineView(props)
        // }
        // let newState = this.props; // This doesn't work.
        // console.log('DeveloperView used props to make newState : ', newState);

        // this.setState({ newState });
        // this.setState(newState);

        // console.log("DeveloperView later sees this state : ", this.state);
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

    componentDidUpdate() {
        // console.log('DeveloperView received state of :', this.props.location.state.detail);
        // console.log('DeveloperView received props of :', this.props);

        // Keep using
        // console.log('DeveloperView state has :', this.state);

    }

    render() {
        return (
            <React.Fragment>
                {this.seed()}
                <Sidebar
                    name={this.state.name}
                    changeName={this.changeName}
                >
                    {/* {this.props.children} // this works, kinda. */}
                    {this.determineView(this.props)}
                </Sidebar>
                <Dashboard />
            </React.Fragment>
        );
    }
}

// Stateful Components (Class) cannot use Hooks such as useStyle.
export default withStyles(styles)(DeveloperView);
