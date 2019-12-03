// React
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { Divider } from '@material-ui/core';
import 'date-fns';
// import DateTimePicker from '../../components/DateTimePicker/DateTimePicker';

import CommentCard from '../../components/CommentCard'

import API from '../../utils/API';

const styles = theme => ({
    // const styles = makeStyles(theme => ({
    // const useStyles = makeStyles(theme => ({
    containerOne: {
        display: 'flex',
        flexWrap: 'wrap',

        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        paddingLeft: 240,
        paddingTop: '12vh',

        // width: '50vw', // split left & right
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300,
    },

    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },

    wrapper: {
        position: 'relative',
    },
    button: {
        margin: theme.spacing(1),
    },
    // For Select
    formControl: {
        margin: theme.spacing(1),
        // marginTop: theme.spacing(2), // lines up verically w textfields
        minWidth: 300,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },

    divider: {
        margin: '20px 0 20px 0',
    },

    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    containerTwo: { // comments section
        width: '50vw',
        // ADD MEDIA QUERY FOR SMALL VIEWPORT. MOVE TO BOTTOM THAT OPENS MODAL?
    },
})

class ManageIssue extends Component {
    // function SubmitIssue(props) {

    constructor(props) {
        super(props);
        this.state = {
            selectedDate: '-',
            userId: '',
            // new Date(), // picker debugging

            // organization info //
            // orgId: '', // ObjectId of org. For now, do not force clear?
            // orgId: 'unknown' // initializing orgId prevents selection from staying

            // project info //
            projId: '', // ObjectId of project
            projName: '', // unique
            // projDescription: '',

            // version info //
            verId: '', // ObjectId of version
            verName: '',
            // verDescription: '',
            // Also needs project ObjectId as ref. Use id above

            // cache //
            organizationList: [], // should not be reset unless query auto restarts
            organizationNames: [],
            organizationDesc: [],

            projectList: [],
            projectNames: [],
            projectDesc: [],

            versionList: [],
            versionNames: [],
            versionDesc: [],

            // issue query result
            issueReporters: [],
            issueOwners: [],
            issueResolved: [],
            issuePriorities: [],
            issueTargetRes: [],
            issueTypes: [],
            issueStatus: [],
            issueList: [],
            issueNames: [],
            issueDesc: [],
            issueDates: [],
            issueURLs: [],
            issueImageURLs: [],
            issueCommentIds: [],
            issueImpacts: [],

            issueObjectList: [],

            // Toggle these to disable Select tag below un-selected higher category
            disableProjSelect: true, // string data type seems to work as well
            disableVerSelect: true,
            disableIssueSelect: true,

            // issue

            issuePreState: {}, // GET query result
            // issuePostState: {}, // updated on input change; used for POST req & for actionDesc array.
            issueStatusChoices: ['Open', 'Investigating', 'Implementing', 'Escalated', 'Resolved', 'Closed'], // do not clear
            issuePriorityChoices: ['Critical', 'High', 'Medium', 'Low', 'Future'],  // do not clear

            issueAspects: [ // prioritized list used for Comment's actionDescription
                'reporter', // basically immutable
                'owner',
                'resolved',
                'priority',
                'targetResolutionDate',
                'type',
                'status',
                'subject',
                'description',
                'potentialImpact',
                'timing',
                'url',
                'imageURL',
                'comments' // ObjectId array. 
            ],

            reporter: '', // basically immutable
            owner: '',
            resolved: false, // Boolean. Updated if status if Resolved/Closed.
            priority: '', // one from issuePriorityChoices
            targetResolutionDate: '',
            type: 'Technical', // restricted in current scope
            status: '',
            subject: '', // equivalent to issue name
            description: '', // only issue needs desc on this page
            potentialImpact: '',
            timing: '',
            url: '',
            imageURL: '',
            comment: '', // accept string & commit into Comment model's array

            // also Id for org, proj & ver as ref

            // comment info //

            commentVisibilityChoices: [  // do not clear
                // 'Everyone', 
                'Organization members and reporter' // locked in current scope
                // 'Organization members only'
                // 'Project members only'
                // 'Project members and reporter', etc. in plans
            ],

            issue: '', // ObjectId. Issue ref
            commenter: '', // ObjectId. User ref
            actionDesc: [], // prioritized list of issue aspect changes in string format
            // If issue status is Resolved/Closed, CAN take final item (or the final comment?) as Final Resolution.
            visibility: '', // one from commentVisibilityChoices
            image: '', // from User Profile
            // timestamps
            createdAt: '', // to be read from db only
            updatedAt: '' // to be read from db only
        }
    }

    //-------------------//
    // Handler functions //
    //-------------------//
    handleFieldChange = event => {
        // for a regular input field, read field name and value from the event
        const fieldId = event.target.id;
        const fieldValue = event.target.value;
        // this.props.onChange(fieldName, fieldValue); // could use if updating parent state
        // this.state.onChange(fieldName, fieldValue);

        // console.log(fieldId, fieldValue);
        this.setState(
            { [fieldId]: fieldValue } // this works
        );
    }

    handleDateChange = date => {
        console.log('handleDateChange got date:', date)
        this.setState({
            ...this.state,
            // timing: date
            selectedDate: date
        })
    };

    handleOrgSelect = event => {
        console.log('selected org target: ', event.target)
        // console.log(this.state.organizationNames.indexOf(event.target.value)) // check index by name
        let ind = this.state.organizationNames.indexOf(event.target.value)
        // console.log(this.state.organizationList[ind]) // shows the object at index
        // this.setState({org: event.target.value})
        // console.log(Object.keys(this.state.organizationList[ind])) // shows array containing keys from the object
        // console.log(Object.keys(this.state.organizationList[ind])[0]) // first key (in ObjectId form) in a string

        let selectedId = ''; // must initialize as string
        // If index was found, get the key. If not, keep blank.
        ind !== '' ? selectedId = Object.keys(this.state.organizationList[ind])[0] : selectedId = ''
        console.log('selected org:', selectedId);
        this.setState({
            ...this.state,
            orgId: selectedId,

            // If any proj is selected, remove it
            projId: '',
            projName: '',
            projDescription: '',

            // If any version is selected, remove it
            verId: '',
            verName: '',
            verDescription: '',

            // If any issue is selected, remove it
            reporter: '',
            owner: '',
            resolved: '',
            priority: '',
            targetResolutionDate: '',
            type: 'Technical', // fixed in current scope
            status: '',
            subject: '',
            description: '',
            potentialImpact: '',
            timing: '',
            url: '',
            imageURL: '',
            comments: [], // ObjectIds of Comment

            // If any comment data is there, remove it
            issue: '',
            commenter: '',
            actionDesc: [],
            visibility: '',
            comment: '' // String on a Comment object
        }
            , () => { this.getAllProj() } // on org select, query proj list
        );
    };

    handleProjSelect = event => {
        console.log('select proj target: ', event.target)
        let ind = this.state.projectNames.indexOf(event.target.value) // index of selected item in array
        let selectedId = Object.keys(this.state.projectList[ind])[0]; // ObjectId from DB
        let selectedName = this.state.projectNames[ind]; // Name from DB
        let selectedDesc = this.state.projectDesc[ind]; // Description from DB
        console.log('selected proj:', selectedId)
        this.setState({
            ...this.state,
            projId: selectedId,
            projName: selectedName,
            projDescription: selectedDesc,

            // If any version is selected, remove it
            verId: '',
            verName: '',
            verDescription: ''
        }
            , () => this.getAllVers()) // on proj select, query version list
    };

    handleVerSelect = event => {
        console.log('select ver target: ', event.target)
        let ind = this.state.versionNames.indexOf(event.target.value) // get the index of selected item from array
        let selectedId = '';
        let selectedName = '';
        let selectedDesc = '';
        // If index was found, get the key, name and desc. For some reason not, keep blank.
        ind !== -1 ? selectedId = Object.keys(this.state.versionList[ind])[0] : selectedId = ''
        ind !== -1 ? selectedName = this.state.versionNames[ind] : selectedName = ''
        ind !== -1 ? selectedDesc = this.state.versionDesc[ind] : selectedDesc = ''
        ind !== -1 ? console.log('selected vers:', selectedId) : console.log('Version index not found.')

        this.setState({
            ...this.state,
            verId: selectedId,
            verName: selectedName,
            verDescription: selectedDesc
        }
            , () => this.getAllIssues()) // on ver select, query issue list
    };

    handleIssueSelect = event => {
        console.log('select issue event.target: ', event.target)
        let ind = this.state.issueNames.indexOf(event.target.value) // get the index of selected item from array
        let Id = '';
        let Name = ''; // subject
        let Desc = '';
        let timing = '';
        let URL = '';
        let ImageURL = '';
        let Comment = ''; // ObjectId in Comment schema
        let Reporter = '';
        let owner = '';
        let resolved = false;
        let priority = '';
        let targetRes = '';
        let type = '';
        let status = '';
        let impact = '';

        // If index was found, get the key, name and desc. For some reason not, keep blank.
        ind !== -1 ? Id = Object.keys(this.state.issueList[ind])[0] : Id = '';
        ind !== -1 ? console.log('selected issue Id:', Id) : console.log('Issue index not found.');
        ind !== -1 ? Name = this.state.issueNames[ind] : Name = '';
        ind !== -1 ? Desc = this.state.issueDesc[ind] : Desc = '';
        ind !== -1 ? timing = this.state.issueDates[ind]
            // Date.parse
            // new Date(this.state.issueDates[ind])  // convert string to Date object in ms unit
            : timing = '';
        ind !== -1 ? URL = this.state.issueURLs[ind] : URL = '';
        ind !== -1 ? ImageURL = this.state.issueImageURLs[ind] : ImageURL = '';
        ind !== -1 ? Comment = this.state.issueCommentIds[ind] : Comment = '';
        ind !== -1 ? Reporter = this.state.issueReporters[ind] : Reporter = '';
        ind !== -1 ? owner = this.state.issueOwners[ind] : owner = '';
        ind !== -1 ? resolved = this.state.issueResolved[ind] : resolved = '';
        ind !== -1 ? priority = this.state.issuePriorities[ind] : priority = '';
        ind !== -1 ? targetRes = this.state.issueTargetRes[ind] : targetRes = '';
        ind !== -1 ? type = this.state.issueTypes[ind] : type = '';
        ind !== -1 ? status = this.state.issueStatus[ind] : status = '';
        ind !== -1 ? impact = this.state.issueImpacts[ind] : impact = '';


        this.setState({
            ...this.state,
            issue: Id,
            subject: Name,
            description: Desc,
            // timing: timing,
            selectedDate: timing,
            url: URL,
            imageURL: ImageURL,
            comments: Comment,
            reporter: Reporter,
            owner: owner,
            resolved: resolved,
            priority: priority,
            targetResolutionDate: targetRes,
            type: type,
            status: status,
            potentialImpact: impact
        },
            () => this.getAllComments())
    };

    clearState = () => {
        this.setState({
            ...this.state,
            // selectedDate: '',

            // organization info //
            // orgId: '', // ObjectId of org. For now, do not force clear?
            // orgId: 'unknown' // initializing orgId prevents selection from staying

            // project info //
            projId: '', // ObjectId of project
            projName: '', // unique
            // projDescription: '',

            // version info //
            verId: '', // ObjectId of version
            verName: '',
            // verDescription: '',
            // Also needs project ObjectId as ref. Use id above

            // cache //
            // organizationList: [], // should not be reset unless query auto restarts
            // organizationNames: [],
            // organizationDesc: [],

            projectList: [],
            projectNames: [],
            projectDesc: [],

            versionList: [],
            versionNames: [],
            versionDesc: [],

            // issue info
            issueList: [],
            issueNames: [],
            issueDesc: [],

            issueObjectList: [],

            // Toggle these to disable Select tag below un-selected higher category
            disableProjSelect: true, // string data type seems to work as well
            disableVerSelect: true,
            disableIssueSelect: true,

            issuePreState: {}, // GET query result
            // issuePostState: {}, // updated on input change; used for POST req & for actionDesc array. (useful?)

            issueAspects: [ // prioritized list used for Comment's actionDescription
                'reporter', // basically immutable
                'owner',
                'resolved',
                'priority',
                'targetResolutionDate',
                'type',
                'status',
                'subject',
                'description',
                'potentialImpact',
                'timing',
                'url',
                'imageURL',
                'comments' // ObjectId array. 
            ],

            reporter: '', // basically immutable
            owner: '',
            resolved: '', // 
            priority: '',
            targetResolutionDate: '',
            type: 'Technical', // fixed in current scope
            status: '',
            subject: '',
            description: '',
            potentialImpact: '',
            timing: '',
            url: '',
            imageURL: '',
            comment: [], // accept string & commit into Comment model's array
            // also Id for org, proj & ver as ref

            // comment info //

            issue: '', // ObjectId. Issue ref
            commenter: '', // ObjectId. User ref
            actionDesc: [], // prioritized list of issue aspect changes in string format
            // If issue status is Resolved/Closed, CAN take final item (or the final comment?) as Final Resolution.
            visibility: '', // all, organization, project
            image: '', // from User Profile

            // timestamps
            createdAt: '', // read from db only
            updatedAt: '' // read from db only
        })
    };

    //------------------------//
    // Organization functions //
    //------------------------//
    getAllOrgs = () => {
        API.getOrgs() // works if {} is omitted
            .then(orgs => { // hits w no params for query
                console.log('API getOrgs returned: ', orgs.data);
                let objects = orgs.data.map(obj => {
                    return { [obj._id]: obj.name } // orgId : orgName
                })
                let names = orgs.data.map(obj => {
                    return obj.name // orgId : orgName
                })
                this.setState({
                    organizationList: objects,
                    organizationNames: names
                })
            })
            .then(() => console.log('state after getAllOrg:', this.state))
    }

    // NEEDS DUPLICATION PREVENTION
    saveOrg = () => {
        API.createOrganization({
            name: this.state.orgName,
            description: this.state.orgDescription,
            url: this.state.orgUrl,
            member: [this.props.id] // user Id
        }).then(() => console.log('Org saved.'))
    }

    //-------------------//
    // Project functions //
    //-------------------//

    createProj = () => {  // works
        console.log('creating new project')
        API.createProject({
            name: this.state.projName,
            description: this.state.projDescription,
            organization: [this.state.orgId] // user Id
        })
            .then((res) => console.log('Project saved.', res))
            .catch(error => console.log(error))
            .then(() => this.getAllProj()) // refresh proj list
    }

    updateProject = async (id, data) => { // works
        console.log(`update proj w/ ${id} and this data:`, data)
        await API.updateProject(id, data)
            .then(result => {
                console.log('updateProject returned data: ', result.data)
                return result
            })
            .catch(error => console.log('error occurred!', error));
    }

    // Query projects matching selected organization
    getAllProj = () => { // works w/o params
        API.getProjects(
            { // organization: this.state.orgId // non func
            })
            .then(projects => {
                console.log('get all proj', projects);

                let objects = [];
                let names = [];
                let descriptions = [];

                for (let obj of projects.data) { // iterable array, so for-in does not work
                    if (obj.organization === this.state.orgId) {
                        objects.push({ [obj._id]: obj.name }) // projId : projName
                        names.push(obj.name); // save names separately // works
                        descriptions.push(obj.description); // save descriptions separately
                    }
                } // .map does not work since it may create "undefined" holes in output array
                // .filter does not work since condition sits on same level as data to save

                objects.includes(undefined) ? // no longer need to check undefineds due to change above, but will leave for now
                    this.setState({
                        ...this.state,
                        projectList: [],
                        projectNames: [],
                        projectDesc: [],
                        disableProjSelect: true // prevent proj pick due to lack of valid choice
                    },
                        console.log('No relevant project. ', objects, names, descriptions)
                        // console.log('No relevant project. ', o2, n2)
                    ) :
                    // If relevant projects are found, add list to state and enable project selection
                    // objects.length > 0 && names.length > 0 ?
                    this.setState({
                        ...this.state,
                        projectList: objects,
                        projectNames: names,
                        projectDesc: descriptions,
                        disableProjSelect: false // enables project select
                    }
                        , console.log('Relevant projects found. Adding to state:', objects, names, descriptions)
                        // , console.log('Relevant projects found. Adding to state:', o2, n2)
                    )

            })
            .then(() => console.log('state after getAllProj, filtered :', this.state))
            .then(this.getAllVers()) // query matching versions on proj select // works?
            .catch(err => console.log(err));
    }


    //-------------------//
    // Version functions //
    //-------------------//
    createVer = () => {
        API.createVersion({
            name: this.state.verName,
            description: this.state.verDescription,
            project: [this.state.projId] // project Id as ref
        })
            .then(res => console.log('Version saved.', res))
            .catch(error => console.log(error))
    }

    updateVersion = async (id, data) => { // works
        console.log(`update version w/ ${id} and this data:`, data)
        await API.updateVersion(id, data)
            .then(result => {
                console.log('updateVersion returned data: ', result.data)
                return result
            })
            .catch(error => console.log(error));
    }

    getAllVers = () => {
        API.getVersions({
            // project: this.state.projId // seems to work but below logic is for unfiltered data
        })
            .then(versions => {
                console.log('get all vers', versions)
                let objects = [];
                let names = [];
                let descriptions = [];

                for (let obj of versions.data) { // iterable array, so for-in does not work
                    if (obj.project === this.state.projId) {
                        objects.push({ [obj._id]: obj.name }) // verId : verName
                        names.push(obj.name); // save names separately
                        descriptions.push(obj.description); // save descriptions separately
                    }
                } // .map does not work since it may create "undefined" holes in output array
                // .filter does not work since condition sits on same level as data to save

                // If blanks exist, this is remnant from relevant query
                objects.includes(undefined) ?
                    this.setState({
                        versionList: [],
                        versionNames: [],
                        versionDesc: [],
                        disableVerSelect: true // prevent select due to lack of valid choice
                    },
                        console.log('No relevant version. ', objects, names, descriptions)
                    ) :
                    // If relevant result is found, add list to state and enable selection
                    this.setState({
                        versionList: objects,
                        versionNames: names,
                        versionDesc: descriptions,
                        disableVerSelect: false // enables select
                    }, console.log('Relevant versions found. Adding to state:', objects, names, descriptions)
                    )
            })
    }

    getOneVer = () => {
        API.findOneVersion(this.state.verId)
            .then(ver => console.log('get one ver', ver))
    }

    //-----------------//
    // Issue functions //
    //-----------------//

    // *** add dev fields as well *** //
    getAllIssues = () => {
        API.getIssues({
            // project: this.state.projId // may work but below logic is for unfiltered data
        })
            .then(issues => {
                console.log('get all issues:', issues)
                let objects = [];
                let fullObjects = [];
                let names = [];
                let descriptions = [];
                let dates = [];
                let URLs = [];
                let imageURLs = [];
                let comments = []; // ObjectIds from Comment schema

                for (let obj of issues.data) { // iterable array, so for-in does not work
                    if (obj.version === this.state.verId) {
                        objects.push({ [obj._id]: obj.subject }) // key is issue ObjectId : value is issue subject
                        fullObjects.push(obj); // full issue object
                        names.push(obj.subject); // save subjects separately
                        descriptions.push(obj.description); // save descriptions separately
                        dates.push(obj.timing); // save dates(timing) separately
                        URLs.push(obj.url);
                        imageURLs.push(obj.imageURL);
                        comments.push(obj.comments);
                    }
                } // .map does not work since it may create "undefined" holes in output array
                // .filter does not work since condition sits on same level as data to save

                // If blanks exist, this is remnant from relevant query
                objects.includes(undefined) ?
                    this.setState({
                        issueList: [],
                        issueNames: [],
                        issueDesc: [],
                        issueDates: [],
                        issueURLs: [],
                        issueImageURLs: [],
                        issueCommentIds: [],

                        issueObjectList: [],

                        disableIssueSelect: true // prevent select due to lack of valid choice
                    },
                        console.log('No relevant issues.', objects, names, descriptions, dates, URLs, comments, fullObjects)
                    ) :
                    // If relevant result is found, add list to state and enable selection
                    this.setState({
                        issueList: objects,
                        issueNames: names,
                        issueDesc: descriptions,
                        issueDates: dates,
                        issueURLs: URLs,
                        issueImageURLs: imageURLs,
                        issueCommentIds: comments,

                        issueObjectList: fullObjects,

                        disableIssueSelect: false // enables select
                    }, console.log('Relevant issues found. Adding to state:', objects, names, descriptions, dates, URLs, comments, fullObjects)
                    )
            })
    }

    // Comment functions //

    getAllComments = () => { // FINISH THIS.
        API.getComments({
            // project: this.state.projId // may work but below logic is for unfiltered data
        })
            .then(comments => {
                console.log('get all comments:', comments)
                let objects = [];
                let fullObjects = [];
                let names = [];
                let descriptions = [];
                let dates = [];
                let URLs = [];
                let imageURLs = [];

                let issueIds = []; // ObjectIds from Comment schema
                let commenterIds = []; // ObjectIds from User
                let actions = []; // contains arrays of string
                let commentTexts = []; // string
                let visibilities = []; // string
                let photoURLs = []; // string
                let creationDates = [];
                let updateDates = [];
                let orgIds = [], projIds = [], verIds = []; // issueIds is above

                for (let obj of comments.data) { // iterable array, so for-in does not work
                    if (obj.version === this.state.verId) {
                        objects.push({ [obj._id]: obj.subject }) // key is issue ObjectId : value is issue subject
                        fullObjects.push(obj); // full issue object
                        names.push(obj.subject); // save subjects separately
                        descriptions.push(obj.description); // save descriptions separately
                        dates.push(obj.timing); // save dates(timing) separately
                        URLs.push(obj.url);
                        imageURLs.push(obj.imageURL);

                        issueIds.push(obj.issue);
                        commenterIds.push(obj.commenter);
                        actions.push(obj.actionsDescription);
                        commentTexts.push(obj.comment);
                        visibilities.push(obj.visibility);
                        photoURLs.push(obj.avatar);
                        creationDates.push(obj.createdAt);
                        updateDates.push(obj.updatedAt);

                        orgIds.push(obj.organization);
                        projIds.push(obj.project);
                        verIds.push(obj.version);
                        issueIds.push(obj.issue);
                    }
                } // .map does not work since it may create "undefined" holes in output array
                // .filter does not work since condition sits on same level as data to save

                // If blanks exist, this is remnant from relevant query
                objects.includes(undefined) ?
                    this.setState({
                        issueList: [],
                        issueNames: [],
                        issueDesc: [],
                        issueDates: [],
                        issueURLs: [],
                        issueImageURLs: [],
                        issueCommentIds: [],

                        issueObjectList: [],

                        disableIssueSelect: true // prevent select due to lack of valid choice
                    },
                        console.log('No relevant issues.', objects, names, descriptions, dates, URLs, comments, fullObjects)
                    ) :
                    // If relevant result is found, add list to state and enable selection
                    this.setState({
                        issueList: objects,
                        issueNames: names,
                        issueDesc: descriptions,
                        issueDates: dates,
                        issueURLs: URLs,
                        issueImageURLs: imageURLs,
                        issueCommentIds: comments,

                        issueObjectList: fullObjects,

                        disableIssueSelect: false // enables select
                    }, console.log('Relevant issues found. Adding to state:', objects, names, descriptions, dates, URLs, comments, fullObjects)
                    )
            })
    }

    createComment = async () => { // works
        // (async () => {
        //     await alert('hi')
        //     await alert('2')
        // })()

        await API.createComment({
            organization: this.state.orgId, // ObjectId
            project: this.state.projId, // ObjectId
            version: this.state.verId, // ObjectId
            issue: this.state.issue, // ObjectId
            commenter: this.props.userId, // ObjectId

            actionDescription: this.state.actionDesc,
            comment: this.state.comment,
            visibility: this.state.visibility,
            avatar: this.props.photoURL,

        })
            .then(() => {
                console.log('createComment has run.');
                // Query relevant comments & display.
                // await API.getComments()

                // this.clearState(); 

            })
        // this.props.showDashboard // forward to main view
    }

    //--------------------//
    //  Lifecyle Methods  //
    //--------------------//
    componentDidMount() {
        // this.setState({
        //     ...this.state,
        //     userId: this.props.userId
        // }, 
        console.log('component did mount :', this.state)
        // )
        this.getAllOrgs() // adds to state the list of org objects and array of org names
    }

    componentDidUpdate() {
        console.log('component did update :', this.state
            // 'typeof this.state.selectedDate:', typeof this.state.selectedDate,
            // 'typeof this.state.timing:', typeof this.state.timing,
        );
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>x
            <form className={classes.containerOne} noValidate autoComplete="off" >
                    <div>
                        <Typography variant='body2' className={classes.textField}>Asterisk(*) denotes required fields.</Typography>
                    </div>

                    <div>
                        <Divider className={classes.divider} />
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel
                                // ref={inputLabel} 
                                id="demo-simple-select-outlined-label-org"
                                required>
                                Provider
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label-org-ManageIssue"
                                id={"demo-simple-select-outlined-ManageIssue"}
                                key={'demo-simple-select-outlined-ManageIssue'}
                                placeholder='Provider Name'
                                value={
                                    this.state.orgId !== '' ? this.state.orgId : '' // does not change display
                                    // collin tried: this.state.orgId
                                }
                                onChange={this.handleOrgSelect
                                    // this.handleFieldChange // not reading correctly
                                }
                            >
                                {
                                    this.state.organizationNames ?
                                        this.state.organizationNames.map((org, ind) => {
                                            // console.log(Object.keys(this.state.organizationList[ind])[0])
                                            // console.log(org)
                                            // <option key={org.key} value={org.key}>{org.value}</option>
                                            return < MenuItem
                                                id={Object.keys(this.state.organizationList[ind])[0]}
                                                // id={org} // collin tried
                                                key={org}
                                                name={org}
                                                value={org} >
                                                {/* error: you have provided an out-of-range value `undefined` for the select component. */}
                                                {org}
                                            </MenuItem>
                                        })
                                        : () => console.log('state during MenuItem render', this.state)
                                    // None should not be an option. Create org first if missing.
                                }
                            </Select>
                        </FormControl>
                        {/* <TextField
                        id="orgId"
                        // REMEMBER, LIST IS FOR NAME BUT SAVES ID
                        disabled
                        // fullWidth
                        className={classes.textField}
                        label="Provider ID"
                        value={this.state.orgId}
                        style={{ margin: 8 }}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="filled"
                        onChange={this.handleFieldChange.bind(this)}
                    /> */}
                    </div>

                    <div>

                        {/* Project */}

                        <FormControl variant="outlined"
                            className={classes.formControl}
                        // {this.state.projectList ? null : disabled}
                        >
                            <InputLabel
                                // ref={inputLabel} 
                                id="demo-simple-select-outlined-label-proj-ManageIssue"
                                required>
                                Project/Product
                        </InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label-proj-ManageIssue"
                                // id={this.state.orgId || "demo-simple-select-outlined"}
                                id={"demo-simple-select-outlined-proj-ManageIssue"}
                                key={'demo-simple-select-outlined-proj-ManageIssue'}
                                placeholder='Project Name'
                                // value={this.state.orgName}
                                onChange={
                                    // onOpen={ // doesn't work but unsure if due to choice
                                    // this.handleFieldChange // not reading correctly?
                                    // this.setState({ event.target.value })
                                    this.handleProjSelect
                                }
                            // labelWidth={'500px'}
                            >
                                {
                                    this.state.projectNames ?
                                        this.state.projectNames.map((proj, i) => {
                                            // this.state.projectList ? // unexpected
                                            // Object.keys(this.state.projectList[i])[0]: 
                                            return <MenuItem
                                                id={proj}
                                                key={`MI-proj-select-${i}`}
                                                name={proj}
                                                value={proj}
                                                disabled={
                                                    this.state.disableProjSelect ? true : false
                                                    // this.state.orgId !== '' ? 'false' : 'true'
                                                }
                                            >
                                                {proj}
                                                {console.log('proj list at render:', this.state.projectList[i])}
                                            </MenuItem>
                                        }) : <br />
                                    // 'None' should not be an option. Create org first if missing.
                                }
                            </Select>
                            {console.log('Disable project selection at render is:', this.state.disableProjSelect)}
                        </FormControl>
                        {/* <TextField
                        id="projId"
                        // REMEMBER, LIST IS FOR NAME BUT SAVES ID
                        disabled
                        // fullWidth
                        label="Project ID"
                        className={classes.textField}
                        value={this.state.projId}
                        style={{ margin: 8 }}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="filled"
                        onChange={this.handleFieldChange.bind(this)}
                    /> */}
                    </div>
                    <div>

                        {/* Version */}

                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label-ver" required>
                                Version/Specification
                        </InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label-ver"
                                // id={this.state.orgId || "demo-simple-select-outlined"}
                                id={"demo-simple-select-outlined-ver"}
                                placeholder='Version / Specification'
                                // value={this.state.verName}
                                onChange={
                                    // onOpen={ // doesn't work but unsure if due to choice
                                    // this.handleFieldChange // not reading correctly?
                                    // this.setState({ event.target.value })
                                    this.handleVerSelect
                                }
                            // labelWidth={'500px'}
                            >
                                {
                                    this.state.versionNames ?
                                        this.state.versionNames.map((ver, i) => {
                                            // this.state.versionList ? // unexpected
                                            // Object.keys(this.state.versionList[i])[0]: 
                                            return <MenuItem
                                                id={ver}
                                                key={ver}
                                                name={ver}
                                                value={ver}
                                                disabled={
                                                    this.state.disableVerSelect ? true : false
                                                }
                                            >
                                                {ver}
                                                {console.log('ver list at render:', this.state.versionList[i])}
                                            </MenuItem>
                                        }) : <br />
                                    // 'None' should not be an option. Create org first if missing.
                                }
                            </Select>
                            {console.log('Disable version selection at render is:', this.state.disableVerSelect)}
                        </FormControl>
                        {/* <TextField
                        id="verId"
                        // REMEMBER, LIST IS FOR NAME BUT SAVES ID
                        disabled
                        className={classes.textField}
                        label="Version ID"
                        value={this.state.verId}
                        style={{ margin: 8 }}
                        margin="normal"
                        InputLabelProps={{ shrink: true, }}
                        onChange={this.handleFieldChange.bind(this)}
                        variant="filled"
                    /> */}
                        <Divider className={classes.divider} />
                    </div>

                    {/* Issue */}

                    <div>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label-issue" required>
                                Issue
                        </InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label-issue"
                                // id={this.state.orgId || "demo-simple-select-outlined"}
                                id={"demo-simple-select-outlined-issue"}
                                placeholder='Issue'
                                // value={this.state.verName}
                                onChange={
                                    // onOpen={ // doesn't work but unsure if due to choice
                                    // this.handleFieldChange // not reading correctly?
                                    // this.setState({ event.target.value })
                                    this.handleIssueSelect
                                }
                            // labelWidth={'500px'}
                            >
                                {
                                    this.state.issueNames ?
                                        this.state.issueNames.map((iss, i) => {
                                            return <MenuItem
                                                id={iss}
                                                key={iss}
                                                name={iss}
                                                value={iss}
                                                disabled={
                                                    this.state.disableIssueSelect ? true : false
                                                }
                                            >
                                                {iss}
                                                {console.log('issue list at render:', this.state.issueList[i])}
                                            </MenuItem>
                                        }) : <br />
                                    // 'None' should not be an option. Create org first if missing.
                                }
                            </Select>
                            {console.log('Disable issue selection at render is:', this.state.disableIssueSelect)}
                        </FormControl>
                    </div>
                    <div>
                        <TextField
                            id="subject"
                            // Enable update for developer+
                            disabled={this.props.userType === 'Reporter' ? true : false}
                            fullWidth
                            multiline
                            label="Issue Subject"
                            // placeholder="Any thoughts?"
                            value={this.state.subject}
                            // className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleFieldChange.bind(this)}
                        />
                        <TextField
                            id="description"
                            required
                            multiline
                            fullWidth
                            rows="4"
                            key="outlined-multiline-static"
                            label="Issue Description"
                            value={this.state.description}
                            style={{ margin: 8 }}
                            // placeholder="Placeholder"
                            // helperText="What seems to be the trouble?"
                            margin="normal"
                            onChange={this.handleFieldChange.bind(this)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                        />
                        <TextField
                            id="type"
                            disabled
                            label="Issue Type"
                            defaultValue={this.state.type}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleFieldChange.bind(this)}
                        />
                        <TextField
                            id="timing"
                            disabled
                            label="Timing"
                            value={this.state.selectedDate}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleFieldChange.bind(this)}
                        />
                        {/* <Typography>Timing:  {this.state.selectedDate}</Typography> */}
                        {/* <DateTimePicker
                        selectedDate=
                        {this.state.selectedDate}
                        // {this.state.timing} // naming seems to interfere. debug
                        handleDateChange={this.handleDateChange}
                    /> */}
                        <TextField
                            id="url"
                            fullWidth
                            label="URL"
                            // placeholder="Any thoughts?"
                            value={this.state.url}
                            // className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleFieldChange.bind(this)}
                        />
                        {/* <TextField
                        id="imageURL" // excess separation?
                        fullWidth
                        label="Image URL"
                        // placeholder="Any thoughts?"
                        value={this.state.imageURL}
                        // className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleFieldChange.bind(this)}
                    /> */}
                        <TextField
                            id="comment"
                            fullWidth
                            multiline
                            label="Comment"
                            placeholder="Any thoughts?"
                            value={this.state.comment}
                            // className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleFieldChange.bind(this)}
                        />
                        <div className='button-group'>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                endIcon={<RotateLeftIcon>Reset Form</RotateLeftIcon>}
                                onClick={
                                    () => {
                                        console.log('clicked reset while state is', this.state)
                                        this.clearState()
                                    }
                                }
                            > Reset Form
                    </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                endIcon={<Icon>send</Icon>}
                                onClick={
                                    () => {
                                        this.createIssue();
                                        console.log('MAKE COMMENT HERE')// this.createComment();
                                    }
                                }
                            > Submit
                                    </Button>
                        </div>
                        {/* end of button-group */}
                    </div>

                </form>
                <div className="containerTwo">
                    <CommentCard />
                    <CommentCard />
                    <CommentCard />
                </div>
            </React.Fragment>
        )

    }
}

// export default withRouter(SubmitIssue)
export default withRouter(withStyles(styles, { withTheme: true })(ManageIssue))
