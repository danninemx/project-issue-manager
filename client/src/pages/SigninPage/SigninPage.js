import React, { Component } from "react"
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import { Redirect } from 'react-router-dom'
// import config from '../../../../config'

import Button from '@material-ui/core/Button';

// import App from '../../App';
// import DeveloperView from '../DeveloperView';

require('dotenv').config();
// If running in non-production environment, load .env variables
// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config();
// }

// console.log("\n Environment variables :", process.env);
// console.log("\n Exported environment variables :", config);

// let API_Key = process.env.Firebase_apiKey;
// console.log("\n API_Key : ", config.API_KEY);

// These credentials are necessary and safe to be exposed to the client, as true backend is provided by Firebase
firebase.initializeApp({
    // Firebase Console > Project Settings > Your project > Web API Key
    apiKey: "AIzaSyCzm64_uz3vESpXIPdgcOeeSFouv-fT5Gw",
    // Firebase Console > Authentication > Authorized Domains
    authDomain: "project-issue-manager.firebaseapp.com"

})

class SigninPage extends Component {

    constructor(props) {
        super(props);

        // Set default auth state of false
        this.state = {
            isSignedIn: false,
            // isAuthenticated: false,
        };

        // this.routeChange = this.routeChange.bind(this); //testing
    }

    /*
    routeChange() { // testing
        // let path = `/`;
        // this.props.history.push(path);
        // this.props.history.push({
        //     pathname: path,
        //     state: {isAuthenticated: true}
        // })
        <App
            isAuthenticated='true' />
    }
    */

    // state = { isSignedIn: false }; // signed out by default

    // Firebase UI signin configuration
    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            // Return false means user-determined redirect, not auto-redirect.
            signInSuccessWithAuthResult: () => {
                // Determine here whether this is new user. 
                // If so, open details page.
                // If not, proceed to appropriate data view.
                return false;
            }
        }
    }

    componentDidMount = () => {

        firebase.auth().onAuthStateChanged(user => {
            this.setState({
                // Coerce the value to be a boolean regardless of original type
                isSignedIn: !!user
            });
            // console.log('this.props is :', this.props);
            // console.log('this.props.handler is :', this.props.handler);
            // console.log("\n SigninPage sees this state : ", this.state);


            // console.log('this.props.handleSignIn is :', this.props.handleSignIn);
            // console.log('SigninPage sees "isSignin" in state : ', this.state.isSignedIn);
            // console.log("SigninPage sees this user : ", user);
        })


    }

    componentDidUpdate = () => {
        // console.log('this.props.handler is :', this.props.handler)


        // Consider adding "keep me signed in" checkbox which will enable this

        // Change persistence from local storage to session storage
        // Per https://firebase.google.com/docs/auth/web/auth-state-persistence
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(function () {
                // Existing and future Auth states are now persisted in the current
                // session only. Closing the window would clear any existing state even
                // if a user forgets to sign out.
                // ...
                // New sign-in will be persisted with session persistence.}
            })
            .catch(function (error) {
                // Handle Errors here.
                // let errorCode = error.code;
                // let errorMessage = error.message;
                console.log(`\n error code : ${error.code}`,
                    `\n error message : ${error.message}`)
            })
    }

    render() {
        return (
            <div className="App">
                <h3>Please sign in to proceed.</h3>
                <h4>(If you do not have an account, one will be created for you.)</h4>
                <Button onClick={this.props.handler}>
                    {/*
                    // this.routeChange
                    
                    // <Redirect
                    //     to={{
                    //         pathname: "/",
                    //         state: {
                    //             isAuthenticated: true,
                    //             referrer: "/signinpage"
                    //         }
                    //     }}
                    // />



                    // this.props.handler();

                    // this.props.history.push({
                    //     pathname: '/',
                    //     state: { isAuthenticated: true }
                    // }); // redirect to LandingPage

                    // console.log(this.props)

                    // return <Redirect
                    // to={{
                    //     pathname: "/",
                    //     state: {
                    //         referrer: "/signinpage"
                    //     }
                    // }}
                    // />
                }>
                */}
                    test button</Button>
                {/* If auth succeeded, render DeveloperView */}
                {this.state.isSignedIn ? (
                    <Redirect
                        to={{
                            pathname: "/developerview",
                            state: {
                                // name: this.state.name,
                                // email: this.state.email,
                                // photoUrl: this.state.photoUrl,
                                // emailVerified: this.state.emailVerified,
                                // idToken: this.state.idToken,
                                referrer: "/signinpage"
                            }
                        }}
                    />

                    // <DeveloperView
                    //     userName={firebase.auth().currentUser.displayName}
                    //     signOutFunction={() => firebase.auth().signOut()}
                    //     profileImgSrc={firebase.auth().currentUser.photoURL}
                    // >
                    // </DeveloperView>

                ) : (
                        <StyledFirebaseAuth
                            uiConfig={this.uiConfig}
                            firebaseAuth={firebase.auth()}
                        />
                    )
                }
            </div>
        )
    }
}

export default SigninPage;



// React and related libraries
// import React from 'react'
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link,
//     Redirect,
//     useHistory,
//     useLocation
// } from "react-router-dom";


// function LoginPage() {
//     let history = useHistory();
//     let location = useLocation();

//     let { from } = location.state || { from: { pathname: "/" } };
//     let login = () => {
//         authentication.authenticate(() => {
//             history.replace(from);
//         });
//     };

//     return (
//         <div>
//             <p>You must log in to view the page at {from.pathname}</p>
//             <button onClick={login}>Log in</button>
//         </div>
//     );
// }

// export default LoginPage;
// //   export default withRouter(withStyles(styles, { withTheme: true })(LoginPage))
