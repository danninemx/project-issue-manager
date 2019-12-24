import React, { Component } from 'react';
import {
    // BrowserRouter as Router, Switch, Route,
    // Redirect
    // , useHistory, useLocation, withRouter, Link
} from "react-router-dom";

// Material UI
import { withStyles, makeStyles } from '@material-ui/core/styles';
// import { SnackbarProvider, useSnackbar } from 'notistack'; // later for feedback msg

// Pages
import Sidebar from '../../components/Sidebar';
import Dashboard from '../Dashboard';
import SubmitIssue from '../SubmitIssue';
import UserProfile from '../UserProfile';
import OrganizationProfile from '../OrganizationProfile';
import ProjectProfile from '../ProjectProfile';
import ManageIssue from '../ManageIssue';

// import BottomAppBar from '../../components/BottomAppBar';


// Auth
import firebase from "firebase";

import API from '../../utils/API'
// import isSignedIn from '../../utils/isSignedIn';


const styles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
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

            // user info
            id: "",
            email: "",
            name: "", // Separate first and last name later
            userType: 'Developer', // default should be Reporter
            // Case Sensitive

            // photoURL: '',

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
            partImpacted: '',

            // for dashboard
            //affiliatedOrgCount: 0,
            affiliatedOrgIds: [],
            affiliatedProjIds: [],
            relatedIssueIds: [],

            affiliatedOrgNames: [],
            affiliatedProjNames: [],
            relatedIssueNames: [],

            affiliatedProjCounts: [], // for charting

            relatedCommentObjects: [],

            relatedIssueCountUnresolved: 0,
            relatedIssueCountUnexamined: 0,

            relatedUnresolvedIssueCountsByAffiliatedOrgId: [],
            relatedUnexaminedIssueCountsByAffiliatedOrgId: []
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
    getUser = () => {
        API.findOneUser(
            this.props.email || this.state.email
        )
            .then(res => {
                // console.log('getUser returned :', res.data)
                res.data // If user data was returned, add to state.
                    ? this.setState({
                        ...this.state,
                        id: res.data[0]._id // Note that filter will be needed if later auto-generating Organization User Account for Orgs.
                    },
                        this.getUserOrgs() // use the id to get affiliated orgs
                    )
                    : console.log('Email not found in DB!'
                        // , res.data
                    )
            })
            .catch(() =>
                this.setState({
                    message: "No results. Please try another query."
                })
            );
    }

    showDashboard = () => {
        this.setState({ activeView: 'Dashboard' }
            , this.authenticate())
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

    showManageIssue = () => {
        this.setState({ activeView: 'Manage Issue' })
    }

    handldIssueChange = (event) => {
        this.setState({ value: event.target.value });
    }

    handleSubmitIssue = (key, val) => {
        this.setState({ [key]: val })
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

    // // Call this to run API method saveUser
    // handleUserSave = (user) => {
    //     API.createUser({
    //         // "email": user[Object.keys(user)[0]],
    //     })
    //     // .then(() => this.getBooks());

    //     // WILL NEED QUALIFIER LATER
    //     // const user = this.state.users.find(user => user.email === email);

    // };

    checkNewUser = (authEmail) => {
        let emailAddress = '';
        // If email was passed and is not blank, save it.
        if (this.props.email && this.props.email !== '') {
            emailAddress = this.props.email;
        } else { emailAddress = this.state.email } // If not, use the address in state.

        API.findOneUser(emailAddress)
            .then(res =>
                // If user is found, save id to state. 
                // If not, send user to user profile for user creation.
                // console.log('checking new user status.', res)
                res !== ''
                    ? this.setState({
                        ...this.state,
                        'id': res.data[0]['_id']
                    }
                        // , console.log('user found:', res.data)
                    )
                    // console.log('User found :', res.data[0]['_id']) // works
                    : () => {
                        // console.log('User NOT found', res.data) // works
                        this.showUserProfile();
                    }
            )
            .catch(() =>
                this.setState({
                    ...this.state,
                    message: "No results. Please try another query."
                })
            );
    }

    authenticate = () => {
        firebase.auth().onAuthStateChanged(user => {
            // console.log('\n DeveloperView sees user :', user.displayName, user.email, user.photoURL, user.emailVerified, user.uid)

            // Save signin data to state
            this.setState({
                isSignedIn: !!user, // Coerce the value to be a boolean regardless of original type
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                emailVerified: user.emailVerified,
                idToken: user.getIdToken()
            },
                () => {
                    // console.log('Authentication complete. Calling getUser...')
                    this.getUser()
                }
            )
        });
    }
    //--------------------------//
    // End of handler functions //
    //--------------------------//

    //------------------------//
    // Organization functions //
    //------------------------//
    getUserOrgs = () => {
        API.getOrgs() // works if {} is omitted
            .then(orgs => { // hits w no params for query
                // console.log('API getOrgs returned: ', orgs.data);
                let userOrgList = [], userOrgNames = [];
                for (let org of orgs.data) {
                    // console.log('each:', org);

                    if (org.member.includes(this.state.id)) {
                        userOrgList.push(org._id);
                        userOrgNames.push(org.name)
                    }
                }
                this.setState({
                    ...this.state,
                    affiliatedOrgIds: userOrgList.reverse(),
                    affiliatedOrgNames: userOrgNames.reverse()
                }
                    , () => this.getAllProj()
                )
            })
        // .then(() => console.log('state after getAllOrg:', this.state))
    }

    //-------------------//
    // Project functions //
    //-------------------//
    getAllProj = () => { // works w/o params
        API.getProjects(
            { // organization: this.state.orgId // non func
            })
            .then(projects => {
                // console.log('get all proj', projects);

                let objects = [], names = [], descriptions = [], affiliatedProjIds = [], affiliatedProjNames = [], affiliatedProjCounts = [];

                // console.log('proj query:', projects.data)
                for (let obj of projects.data) { // iterable array, so for-in does not work

                    for (let orgId of this.state.affiliatedOrgIds) {
                        // orgIds.includes(orgId) 
                        // console.log('obj shows:', obj.organization)
                        if (orgId === obj.organization) {
                            affiliatedProjIds.push(obj._id);
                            affiliatedProjNames.push(obj.name);
                        }
                    }

                    // if (obj.organization === this.state.orgId) {
                    //     objects.push({ [obj._id]: obj.name }) // projId : projName
                    //     names.push(obj.name); // save names separately // works
                    //     descriptions.push(obj.description); // save descriptions separately

                    //     // orgIds.push(obj.organization);
                    // }
                } // .map does not work since it may create "undefined" holes in output array
                // .filter does not work since condition sits on same level as data to save

                // for charting
                for (let orgId of this.state.affiliatedOrgIds) {

                    let count = 0;
                    for (let obj of projects.data) {
                        if (orgId === obj.organization) {
                            count++;
                        }
                    }
                    affiliatedProjCounts.push(count);
                }
                // console.log('counts array:', affiliatedProjCounts);
                objects.includes(undefined) ? // no longer need to check undefineds due to change above, but will leave for now
                    this.setState({
                        ...this.state,
                        projectList: [],
                        projectNames: [],
                        projectDesc: [],
                        affiliatedProjIds: [],
                        affiliatedProjNames: [],

                        affiliatedProjCounts: [],
                        // disableProjSelect: true // prevent proj pick due to lack of valid choice
                    }
                        // , console.log('No relevant project. ', objects, names, descriptions)
                        // console.log('No relevant project. ', o2, n2)
                    ) :
                    // If relevant projects are found, add list to state and enable project selection
                    // objects.length > 0 && names.length > 0 ?
                    this.setState({
                        ...this.state,
                        projectList: objects,
                        projectNames: names,
                        projectDesc: descriptions,

                        affiliatedProjIds: affiliatedProjIds.reverse(),
                        affiliatedProjNames: affiliatedProjNames.reverse(),

                        affiliatedProjCounts: affiliatedProjCounts, // for charting

                        // disableProjSelect: false // enables project select
                    }
                        // , console.log('Relevant projects found. Adding to state:', objects, names, descriptions)
                        // , console.log('Relevant projects found. Adding to state:', o2, n2)
                        , () => this.getAllIssues()
                    )

            })
            .catch(err => console.log(err));
    }

    //-----------------//
    // Issue functions //
    //-----------------//
    getAllIssues = () => {
        API.getIssues({
            // project: this.state.projId // may work but below logic is for unfiltered data
        })
            .then(issues => {
                // console.log('get all issues:', issues)

                let objects = [], // ObjId-Subject pair?
                    relatedIssueIds = [],
                    relatedIssueNames = [],
                    relatedIssueCountUnresolved = 0, // for dashboard total issue count
                    relatedIssueCountUnexamined = 0, // for dashboard total unexamined issue count
                    relatedUnresolvedIssueCountsByAffiliatedOrgId = [],
                    relatedUnexaminedIssueCountsByAffiliatedOrgId = [];

                for (let obj of issues.data) { // iterable array, so for-in does not work
                    // If issue is related to user, add to list for management and dashboard
                    if (this.state.affiliatedOrgIds.includes(obj.organization)) {
                        relatedIssueIds.push(obj._id);
                        relatedIssueNames.push(obj.subject);

                        relatedIssueCountUnresolved++;

                        if (obj.status === undefined || obj.status === 'Open') {
                            relatedIssueCountUnexamined++;
                        }
                    }
                } // .map does not work since it may create "undefined" holes in output array
                // .filter does not work since condition sits on same level as data to save

                // for each affiliated org..
                for (let affOrgId of this.state.affiliatedOrgIds) {
                    let relevantTotalCount = 0, relevantNewCount = 0;

                    for (let iss of issues.data) {
                        if (iss.organization === affOrgId) { // if its ID matches this aff org Id..
                            // +1 for each unresolved
                            if (iss.status !== 'Resolved' && iss.status !== 'Closed') {
                                relevantTotalCount++;
                            }
                            // +1 for each Open (unexamined)
                            if (iss.status === 'Open'
                                || iss.status === undefined) { // legacy rule protection
                                relevantNewCount++;
                            }
                        }
                    }
                    relatedUnresolvedIssueCountsByAffiliatedOrgId.push(relevantTotalCount);
                    relatedUnexaminedIssueCountsByAffiliatedOrgId.push(relevantNewCount);
                }

                // If blanks exist, this is remnant from relevant query
                objects.includes(undefined) ?  // This is not expected to occur
                    this.setState({
                        ...this.state
                    }
                        // , console.log('No relevant issues.')
                    ) :
                    this.setState({
                        ...this.state,
                        relatedIssueIds: relatedIssueIds.reverse(),
                        relatedIssueNames: relatedIssueNames.reverse(),

                        relatedIssueCountUnresolved,
                        relatedIssueCountUnexamined,

                        relatedUnresolvedIssueCountsByAffiliatedOrgId,
                        relatedUnexaminedIssueCountsByAffiliatedOrgId
                    },
                        () => {
                            // console.log('Relevant issues found. Adding to state.');
                            this.getAllComments();
                        }
                    )
            })
    }

    //--------------------//
    // Comments functions //
    //--------------------//
    getAllComments = async () => {
        await API.getComments({
            // project: this.state.projId // may work but below logic is for unfiltered data
        })
            // .sort({ _id: -1 }) // descending order.
            .then(comments => {
                // console.log('get all comments:', comments);
                let commentObjects = []
                for (let comment of comments.data) {
                    if (this.state.affiliatedOrgIds.includes(comment.organization)) {
                        commentObjects.push(comment)
                    }
                }

                // commentObjects.reverse();
                // commentObjects.length <= 10 ? 
                this.setState({
                    ...this.state,
                    relatedCommentObjects: commentObjects.reverse()
                })
            })
    }  // End of getAllComments function

    //-------------------//
    // Lifecycle methods //
    //-------------------//

    componentDidMount(props) {
        // check auth
        this.authenticate();
        // console.log('Did Mount. State:', this.state);

        this.checkNewUser();
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
        // console.log('Did Update. State has :', this.state);
    }

    render() {
        // const { classes } = this.props;
        const newView = this.state.activeView;
        let view;

        if (newView === 'Dashboard') {
            view = <Dashboard
                orgCount={this.state.affiliatedOrgIds.length}
                projCount={this.state.affiliatedProjIds.length}
                issueCount={this.state.relatedIssueIds.length}
                commentObjects={this.state.relatedCommentObjects}
                orgNames={this.state.affiliatedOrgNames}

                projNames={this.state.affiliatedProjNames}
                issueSubjects={this.state.relatedIssueNames}

                projCountByOrg={this.state.affiliatedProjCounts}

                totalIssues={this.state.relatedIssueCountUnresolved} // number
                totalNewIssues={this.state.relatedIssueCountUnexamined}

                totalIssuesArray={this.state.relatedUnresolvedIssueCountsByAffiliatedOrgId} // arr of nums
                totalNewIssuesArray={this.state.relatedUnexaminedIssueCountsByAffiliatedOrgId}

            // totalIssuesArray={}
            // totalNewIssuesArray={}
            />
        } else if (newView === 'Submit Issue') {
            view = <SubmitIssue
                style={[styles.content]}

                name={this.state.name}
                email={this.state.email}
                type={this.state.type}
                userId={this.state.id} // ObjectId of user
                photoURL={this.state.photoURL}
                isSignedIn={this.state.isSignedIn}
                handleSubmitIssue={this.handleSubmitIssue}
                showDashboard={this.showDashboard}
            />
        }
        else if (newView === 'User Profile') {
            view = <UserProfile
                id={this.state.id}
                name={this.state.name}
                email={this.state.email}
                userType={this.state.userType}
                photoURL={this.state.photoURL}
                isSignedIn={this.state.isSignedIn}
                showDashboard={this.showDashboard}
            />
        }
        else if (newView === 'Organization Profile') {
            view = <OrganizationProfile
                id={this.state.id}
                name={this.state.name}
                email={this.state.email}
                userType={this.state.userType}
                isSignedIn={this.state.isSignedIn}
                showDashboard={this.showDashboard}
            />
        }
        else if (newView === 'Project Profile') {
            view = <ProjectProfile
                id={this.state.id}
                isSignedIn={this.state.isSignedIn}
                showDashboard={this.showDashboard}
            />
        }
        else if (newView === 'Manage Issue') {
            view = <ManageIssue
                userId={this.state.id}
                userName={this.state.name}
                photoURL={this.state.photoURL}
                isSignedIn={this.state.isSignedIn}
                showDashboard={this.showDashboard}
            />
        } else {
            view = <br />
        }

        return (
            <div>
                <React.Fragment>
                    {/* <BottomAppBar> */}
                    <Sidebar
                        activeView={this.state.activeView}
                        name={this.state.name}
                        userType={this.state.userType}
                        determineView={this.determineView}
                        showDashboard={this.showDashboard}
                        showSubmitIssue={this.showSubmitIssue}
                        showUserProfile={this.showUserProfile}
                        showOrganizationProfile={this.showOrganizationProfile}
                        showProjectProfile={this.showProjectProfile}
                        showManageIssue={this.showManageIssue}
                    >
                        {/* {this.props.children} // this works somewhat */}
                        {view}
                    </Sidebar>
                    {/* </BottomAppBar> */}
                </React.Fragment>
            </div>
        );
    }
}

// Stateful Components (Class) cannot use Hooks such as useStyle.
export default withStyles(styles)(DeveloperView);
