import React, { Component } from 'react';
import {
    // BrowserRouter as Router, Switch, Route, Redirect, useHistory, useLocation, withRouter, Link
} from "react-router-dom";
import { withStyles, makeStyles } from '@material-ui/core/styles';

import Sidebar from '../../components/Sidebar';
import Dashboard from '../Dashboard';
import SubmitIssue from '../SubmitIssue';
import UserProfile from '../UserProfile';
import OrganizationProfile from '../OrganizationProfile';
import ProjectProfile from '../ProjectProfile';

// Auth
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

        // this.routeChange = this.routeChange.bind(this); // if you have a func outside of state, you can make it part of state by doing this

        // Set default auth state of false
        this.state = {
            activeView: 'Dashboard',
            isSignedIn: false,
            // isAuthenticated: false,

            // user info
            id: "",
            email: "",
            name: "", // Separate first and last name later
            userType: "",

            // issue: {} or []?
            // required

            type: 'Technical', // issue type, not user
            organization: '',
            project: '',
            subject: '',
            description: '',
            comment: [],
            owner: '',

            // optional in this version
            url: '',
            status: '',
            resolved: '',
            priority: '',
            targetResolutionDate: '',
            potentialImpact: '',
            image: '',
            partImpacted: ''
        }

        // This allows the functions to be passed via props.
        this.getUser = this.getUser.bind(this);
        this.determineView = this.determineView.bind(this);
        this.showSubmitIssue = this.showSubmitIssue.bind(this);
        this.showDashboard = this.showDashboard.bind(this);
        this.handleSubmitIssue = this.handleSubmitIssue.bind(this);
    };

    //-----------//
    // Functions //
    //-----------//

    // test only
    changeName = () => {
        this.setState({ name: 'Super Dan' })
        alert('name changed!')
    }

    // test2
    onChangeStudentName(e) {
        this.setState({ name: e.target.value })
    }

    getUser = () => {
        API.findOneUser(
            this.props.email
        )
            .then(res => {
                res.data ?
                    console.log('returned :', res.data[0])
                    // this.setState({
                    //   books: res.data
                    // })
                    : console.log('no one!', res.data)
            })
            .catch(() =>
                this.setState({
                    message: "No results. Please try another query."
                })
            );
    }

    showDashboard = () => {
        this.setState({ activeView: 'Dashboard' })
    }

    showSubmitIssue = () => {
        this.setState({ activeView: 'Submit Issue' })
    }

    showUserProfile = () => {
        this.setState({ activeView: 'User Profile' })
    }

    showOrganizationProfile = () => {
        this.setState({ activeView: 'Organization Profile' })
    }

    showProjectProfile = () => {
        this.setState({ activeView: 'Project Profile' })
    }

    handldIssueChange = (event) => {
        this.setState({ value: event.target.value });
    }

    handleSubmitIssue = (key, val) => {
        /*
        let issue = {};
        tempIssue = { ...this.state.issue }; // copy issue to prevent direct state update
        console.log('copied state issue:', tempIssue)
        if (this.state.issue.length) {
            let keys = Object.keys(this.state.issue) // get array of keys in object
            console.log("this issue's keys are ", keys) // array of strings            

            // for (let ea in this.state.issue) { // iterate over key-value pairs in object and give value
            // console.log('ea: ', ea) // object of key-val pairs
            // this.handleUserSave(ea); // SAVE FULL OBJECT TO DB

            for (let key in keys) { // iterate over key-value pairs in object and give value
                // 'key' comes out ot be index num
                console.log('For key ' + keys[key] + ', value is ', this.state.issue[keys[key]])
                // console.log('ea[key]: ', ea[key])
            }
        }
        */
        // const keys = [
        //     "type",
        //     "organization",
        //     "project",
        //     "subject",
        //     "description",
        //     "comment",
        //     "owner",

        //     // optional in this version
        //     "url",
        //     "status",
        //     "resolved",
        //     "priority",
        //     "targetResolutionDate",
        //     "potentialImpact",
        //     "image",
        //     "partImpacted"
        // ]

        this.setState({ [key]: val })
        //Object.keys(this.state) // may not secure sequence

        // this.setState({ arr }) // update state of "issue" with new variable "issue"
        // this.setState({ comment: [1, 2, "3"] }) // works
        // this.setState({ [key]: value })
        // this.setState({testArr: arr})

    }

    // can write promise this way
    // function signupUser() {
    //     return new Promise(resolve => {
    //       setTimeout(resolve, 1000);
    //     });
    //   }
    //   const handleSubmit = e => {
    //     e.preventDefault();
    //     signupUser().then(clearState);
    //   };

    determineView = (text) => {
        // console.log(`\n dev view got back `, text)
        // this.setState({ received: text })
        // if (this.props.activeView) {
        //     // console.log('\n DeveloperView sees this.props.activeView :', this.props.activeView);
        // }
        // let nextView;

        // switch (this.props.activeView) {
        //     case '/submitissue':
        //         nextView = <SubmitIssue />
        //         console.log(' nextView is: ', nextView);
        //         this.setState({ activeView: 'Submit Issue' })
        //         break;
        //     default:
        //         console.log('hitting default');
        //         this.setState({ activeView: 'Dashboard' })
        //         nextView = <Dashboard />
        // }
        // return nextView;
    }

    // Call this to run API method saveUser
    handleUserSave = (user) => {
        API.createUser({
            // "email": user[Object.keys(user)[0]],
            // "firstName": user[Object.keys(user)[1]],
            // "lastName": user[Object.keys(user)[2]],
            // "photoURL": user[Object.keys(user)[3]],
            // "submittedIssues": user[Object.keys(user)[4]],
            // "userType": user[Object.keys(user)[5]],
            // "affiliatedOrganization": user[Object.keys(user)[6]],
            // "affiliatedProject": user[Object.keys(user)[7]]
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


    // seed = () => {
    //     for (let ea of this.state.seedUsers) { // array
    //         // console.log('ea: ', ea) // object of key-val pairs
    //         this.handleUserSave(ea); // SAVE FULL OBJECT TO DB

    //         // let keys = Object.keys(ea) // array of keys
    //         // console.log("this person's keys are ", keys) // array of strings

    //         // for (let key in keys) { // iterate over key-value pairs in object and give value
    //         //     // key comes out ot be index num
    //         //     console.log('For key ' + keys[key] + ', value is ', ea[keys[key]])
    //         //     // console.log('ea[key]: ', ea[key])
    //         // }
    //     }
    // }

    checkNewUser = (authEmail) => {
        API.findOneUser(
            // If an email was passed, use it. If not use state.
            authEmail || this.state.email
        )
            .then(res => {
                // If user is found, save id to state. 
                // If not, send user to user profile for user creation.
                res.data ?
                    // console.log('User found :', res.data[0]['_id']) // works
                    this.setState({ 'id': res.data[0]['_id'] })
                    :
                    // console.log('User not found', res.data) // works
                    this.showUserProfile();
            })
            .catch(() =>
                this.setState({
                    message: "No results. Please try another query."
                })
            );
    }

    authenticate = () => {

        firebase.auth().onAuthStateChanged(user => {
            // console.log('\n DeveloperView sees user :', user.displayName, user.email, user.photoURL, user.emailVerified, user.uid)

            // Save signin data to state
            this.setState({
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                emailVerified: user.emailVerified,
                idToken: user.getIdToken()
            })

            // Process new user
            this.checkNewUser(user.email)
        });
    }
    //------------------//
    // End of functions //
    //------------------//

    //-------------------//
    // Lifecycle methods //
    //-------------------//

    componentDidMount(props) {
        // console.log("\n DeveloperView received these props : ", this.props);
        // console.log("\n DeveloperView finally sees this state : ", this.state); // anti-design to update state with non-changing values

        console.log('did mount. state =', this.state)

        // get auth info
        this.authenticate()

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
        // Keep using
        // console.log('DeveloperView state has :', this.state);
    }

    render() {
        const newView = this.state.activeView;
        let view;

        if (newView === 'Dashboard') {
            view = <Dashboard />
        } else if (newView === 'Submit Issue') {
            view = <SubmitIssue
                name={this.state.name}
                email={this.state.email}
                type={this.state.type}
                handleSubmitIssue={this.handleSubmitIssue}
            />
        }
        else if (newView === 'User Profile') {
            view = <UserProfile
                id={this.state.id}
                name={this.state.name}
                email={this.state.email}
                userType={this.state.userType}
                photoURL={this.state.photoURL}
            />
        }
        else if (newView === 'Organization Profile') {
            view = <OrganizationProfile
                id={this.state.id}
                name={this.state.name}
                email={this.state.email}
                userType={this.state.userType}
            />
        }
        else if (newView === 'Project Profile') {
            view = <ProjectProfile
                id={this.state.id}
            />
        }

        return (
            <React.Fragment>
                {console.log('state in render', this.state)}
                {/* {this.seed()}  // this works but wont use now */}
                <Sidebar
                    name={this.state.name}
                    changeName={this.changeName}
                    determineView={this.determineView}
                    showDashboard={this.showDashboard}
                    showSubmitIssue={this.showSubmitIssue}
                    showUserProfile={this.showUserProfile}
                    showOrganizationProfile={this.showOrganizationProfile}
                    showProjectProfile={this.showProjectProfile}
                >
                    {/* {this.props.children} // this works, kinda. */}
                    {/* {this.determineView(this.props)} // doesn't work? */}
                </Sidebar>
                {view}
                {/* <Dashboard /> */}
            </React.Fragment>
        );
    }
}

// Stateful Components (Class) cannot use Hooks such as useStyle.
export default withStyles(styles)(DeveloperView);
