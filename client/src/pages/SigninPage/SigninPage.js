import React, {
    Component
    // , useRef 
} from "react"
import { Redirect } from 'react-router-dom'

// Firebase Authentication
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
// import config from '../../../../config' (CRA app cannot reach outside /src)

// Material UI
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import API from '../../utils/API'

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

    // *** Not in use. USE THIS SOMEWHERE TO INITIATE NEW USER PROTOCOL *** //
    // checkNewUser = (authEmail) => {
    //     API.findOneUser(
    //         // If an email was passed, use it. If not use state.
    //         authEmail || this.state.email
    //     )
    //         .then(res => {
    //             // If user is found, save id to state. 
    //             // If not, send user to user profile for user creation.
    //             console.log('SigninPage is checking new user status.', res)
    //             // res !== '' ? () => {
    //             //     console.log('user found:', res.data)
    //             //     // console.log('User found :', res.data[0]['_id']) // works
    //             //     this.setState({ 'id': res.data[0]['_id'] })
    //             // }
    //             //     : () => {
    //             //         console.log('User NOT found', res.data) // works
    //             //         this.showUserProfile();
    //             //     }
    //         })
    //         .catch(() =>
    //             this.setState({
    //                 message: "No results. Please try another query."
    //             })
    //         );
    // }
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

    //-------------------//
    // Lifecycle Methods //
    //-------------------//
    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({
                // Coerce the value to be a boolean regardless of original type
                isSignedIn: !!user
            })
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
            <React.Fragment>
                <CssBaseline />
                <Container
                    // maxWidth="sm"
                    style={{
                        backgroundColor: '#cfe8fc'
                        , height: '100vh'
                        , width: '100vw'
                        , textAlign: 'center',
                    }}>
                    <Typography component="div" style={{ paddingTop: '2rem' }}
                    >
                        <h3>Please sign in to proceed.</h3>
                        <h4>(If you do not have an account, one will be created for you.)</h4>
                        {/* If auth succeeded, render DeveloperView */}
                        {this.state.isSignedIn ? (
                            <Redirect
                                to={{
                                    pathname: "/developerview",
                                    state: {
                                        referrer: "/signinpage",
                                        wasAuthenticated: true
                                        // email: this.state.email
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
                    </Typography>
                </Container>
            </React.Fragment> // </div>
        )
    }
}

export default SigninPage;
