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
import Paper from '@material-ui/core/Paper';

// Future scope: developer-only entry fields toggle
// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Switch from '@material-ui/core/Switch';

import API from '../../utils/API';
// import { minHeight } from '@material-ui/system';

const styles = theme => ({
    // const styles = makeStyles(theme => ({
    // const useStyles = makeStyles(theme => ({
    topContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        height: '100vh',
        alignItems: 'flex-start',
    },

    containerOne: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        padding: theme.spacing(0, 5),
        ...theme.mixins.toolbar,
        // paddingLeft: 240,
        paddingTop: '10vh',
        width: '55vw', // split left & right
        height: '100%',
    },
    containerTwo: { // comments section
        width: '35vw',
        paddingTop: '10vh',
        paddingLeft: '1vw',
        paddingRight: '1vw',
        backgroundColor: '#bbdefb',

        // make scrollable
        maxHeight: window.screen.availHeight,
        overflow: 'auto',
        // ADD MEDIA QUERY FOR SMALL VIEWPORT. MOVE TO BOTTOM or ADD BTN THAT OPENS MODAL
        minHeight: window.screen.availHeight,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '40%',
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
        minWidth: '55%',
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
    grouping: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
    },

    wideTextField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '55%',
    },
})

class ManageIssue extends Component {
    // function SubmitIssue(props) {

    constructor(props) {
        super(props);
        this.state = {
            selectedDate: '-',
            userId: '',

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
            issueList: [], // objects (of objid-subject pairs?)
            issueNames: [],
            issueDesc: [],

            issueDates: [],
            issueURLs: [],
            issueImageURLs: [],
            issueCommentIds: [],
            issueImpacts: [],

            issueReporterNames: [],

            issueObjectList: [],
            // issue now has reporter name. use it?

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
                'organization',
                'project',

                'version',
                'comments', // ObjectId array. 
                'reporterName'
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
            timing: '', // vs selectedDate?
            url: '',
            imageURL: '',
            comment: '', // accept string & commit into Comment model's array
            reporterName: '',

            developerMode: false, // If true, allow updates to restricted fields

            // also Id for org, proj & ver as ref

            // comment creation info //

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
            updatedAt: '', // to be read from db only
            commenterName: this.props.userName,

            // comment query info //

            commentOrgIds: [],
            commentProjIds: [],
            commentVerIds: [],
            commentIssueIds: [],
            commentCommenterIds: [],

            commentActionsDescriptions: [],
            commentTexts: [],
            commentVisibilities: [],
            commentPhotoURLs: [],
            commentTimestamps: [],

            commentFullObjects: [],

            commentAuthors: [], // displayName
            commentOrgNames: [],
            commentProjNames: [],
            commentVerNames: [],
            commentIssueSubjects: []

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

        let selectedId = '', selectedOrgName = ''; // must initialize as string
        // If index was found, get the key. If not, keep blank.
        ind !== '' ? selectedId = Object.keys(this.state.organizationList[ind])[0] : selectedId = '';
        ind !== '' ? selectedOrgName = this.state.organizationNames[ind] : selectedOrgName = '';
        console.log('selected org:', selectedId);
        this.setState({
            ...this.state,
            orgId: selectedId,
            orgName: selectedOrgName,

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

            // CLEAR ISSUES AND COMMENTS INFO AS WELL //
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

            // CLEAR ISSUES AND COMMENTS INFO AS WELL // 
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

            // CLEAR ISSUES AND COMMENTS INFO AS WELL //
        }
            , () => this.getAllIssues()) // on ver select, query issue list
    };

    handleIssueSelect = event => {
        console.log('select issue event.target: ', event.target);
        let ind = this.state.issueNames.indexOf(event.target.value); // get the index of selected item from array
        let id = '',
            name = '', // subject
            desc = '',
            timing = '',
            URL = '',
            ImageURL = '',
            Comment = '', // ObjectId in Comment schema
            Reporter = '',
            owner = '',
            resolved = false,
            priority = '',
            targetRes = '',
            type = '',
            status = '',
            impact = '',
            reporterName = ''

        // If index was found, get the key, name and desc. For some reason not, keep blank.
        ind !== -1 ? id = Object.keys(this.state.issueList[ind])[0] : id = '';
        ind !== -1 ? console.log('selected issue Id:', id) : console.log('Issue index not found.');

        ind !== -1 ? Reporter = this.state.issueReporters[ind] : Reporter = '';
        ind !== -1 ? owner = this.state.issueOwners[ind] : owner = '';
        ind !== -1 ? resolved = this.state.issueResolved[ind] : resolved = '';
        ind !== -1 ? priority = this.state.issuePriorities[ind] : priority = '';
        ind !== -1 ? targetRes = this.state.issueTargetRes[ind] : targetRes = '';

        ind !== -1 ? type = this.state.issueTypes[ind] : type = '';
        ind !== -1 ? status = this.state.issueStatus[ind] : status = 'Open';
        ind !== -1 ? name = this.state.issueNames[ind] : name = '';
        ind !== -1 ? desc = this.state.issueDesc[ind] : desc = '';
        ind !== -1 ? timing = this.state.issueDates[ind] : timing = '';
        ind !== -1 ? URL = this.state.issueURLs[ind] : URL = '';
        ind !== -1 ? ImageURL = this.state.issueImageURLs[ind] : ImageURL = '';
        ind !== -1 ? Comment = this.state.issueCommentIds[ind] : Comment = '';
        ind !== -1 ? impact = this.state.issueImpacts[ind] : impact = '';
        ind !== -1 ? reporterName = this.state.issueReporterNames[ind] : reporterName = '';

        this.setState({
            ...this.state,
            issue: id,
            subject: name,
            description: desc,
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
            potentialImpact: impact,
            reporterName: reporterName

            // CLEAR COMMENTS INFO AS WELL //
        },
            () => this.getAllComments())
    };

    handleStatusSelect = event => {
        // console.log('select status target: ', event.target)
        this.setState({
            ...this.state,
            status: event.target.value
        })
    }

    // handleSubmit = () => {
    //     await 
    // }

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

            // comment creation info //

            issue: '', // ObjectId. Issue ref
            commenter: '', // ObjectId. User ref
            actionDesc: [], // prioritized list of issue aspect changes in string format
            // If issue status is Resolved/Closed, CAN take final item (or the final comment?) as Final Resolution.
            visibility: '', // all, organization, project
            image: '', // from User Profile

            // timestamps
            createdAt: '', // read from db only
            updatedAt: '', // read from db only

            // comment query info //

            commentOrgIds: [],
            commentProjIds: [],
            commentVerIds: [],
            commentIssueIds: [],
            commentCommenterIds: [],

            commentActionsDescriptions: [],
            commentTexts: [],
            commentVisibilities: [],
            commentPhotoURLs: [],
            commentTimestamps: [],

            commentFullObjects: [],
            commentAuthors: []
        })
    };

    //------------------------//
    // Organization functions //
    //------------------------//
    getAllOrgs = () => {
        API.getOrgs() // works if {} is omitted
            .then(orgs => { // hits w no params for query
                // console.log('API getOrgs returned: ', orgs.data);
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
        // .then(() => console.log('state after getAllOrg:', this.state))
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
                // console.log('get all proj', projects);

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
            // .then(() => console.log('state after getAllProj, filtered :', this.state))
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
            // .then(res => console.log('Version saved.', res))
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
                // console.log('get all vers', versions)
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

    // *** add dev fields as well? *** //
    getAllIssues = () => {
        API.getIssues({
            // project: this.state.projId // may work but below logic is for unfiltered data
        })
            .then(issues => {
                console.log('get all issues:', issues)
                let reporters = []
                    , owners = []
                    , resolved = []
                    , priority = []
                    , targetResolutionDate = []

                    , type = []
                    , status = []
                    , subject = []
                    , description = []
                    , potentialImpact = []

                    , timing = []
                    , url = []
                    , imageURL = []
                    , comments = [] // ObjectId array.
                    , reporterNames = []

                let objects = []; // ObjId-Subject pair?

                let fullObjects = []; // useful?
                // let names = [];
                // let descriptions = [];
                // let dates = [];
                // let URLs = [];
                // let imageURLs = [];
                // let comments = []; // ObjectIds from Comment schema

                for (let obj of issues.data) { // iterable array, so for-in does not work
                    if (obj.version === this.state.verId) {
                        console.log('pushing object to State issue arrays', obj);
                        reporters.push(obj.reporter);
                        owners.push(obj.owner);
                        resolved.push(obj.resolved);
                        priority.push(obj.priority);
                        targetResolutionDate.push(obj.targetResolutionDate);

                        type.push(obj.type);
                        status.push(obj.status);
                        subject.push(obj.subject);
                        // alert(subject + ' was pushed as subject');
                        description.push(obj.description);
                        potentialImpact.push(obj.potentialImpact);

                        timing.push(obj.timing);
                        url.push(obj.url);
                        imageURL.push(obj.imageURL);
                        comments.push(obj.comments);
                        reporterNames.push(obj.reporterName); // displayNames

                        objects.push({ [obj._id]: obj.subject })
                        console.log('issue object is now == ', objects) // key is issue ObjectId : value is issue subject
                        fullObjects.push(obj); // full issue object

                        // names.push(obj.subject); // save subjects separately
                        // descriptions.push(obj.description); // save descriptions separately
                        // dates.push(obj.timing); // save dates(timing) separately
                        // URLs.push(obj.url);
                        // imageURLs.push(obj.imageURL);
                        // comments.push(obj.comments); // makes array of arrays
                    }
                } // .map does not work since it may create "undefined" holes in output array
                // .filter does not work since condition sits on same level as data to save

                // If blanks exist, this is remnant from relevant query
                objects.includes(undefined) ?
                    this.setState({

                        issueReporters: [],
                        issueOwners: [],
                        issueResolved: [],
                        issuePriorities: [],
                        issueTargetRes: [],

                        issueTypes: [],
                        issueStatus: [],
                        issueList: [], // objects (of objid-subject pairs?)
                        issueNames: [], // subjects
                        issueDesc: [],

                        issueDates: [],
                        issueURLs: [],
                        issueImageURLs: [],
                        issueCommentIds: [],
                        issueImpacts: [],

                        issueObjectList: [],
                        issueReporterNames: [],

                        disableIssueSelect: true // prevent select due to lack of valid choice
                    },
                        console.log('No relevant issues.'
                            // , objects, names, descriptions, dates, URLs, comments, fullObjects
                        )
                    ) :
                    // If relevant result is found, add list to state and enable selection
                    this.setState({
                        issueReporters: reporters,
                        issueOwners: owners,
                        issueResolved: resolved,
                        issuePriorities: priority,
                        issueTargetRes: targetResolutionDate,

                        issueTypes: type,
                        issueStatus: status,
                        issueList: objects, // objects (of objid-subject pairs?)
                        issueNames: subject, // subjects
                        issueDesc: description,

                        issueDates: timing,
                        issueURLs: url,
                        issueImageURLs: imageURL,
                        issueCommentIds: comments,
                        issueImpacts: potentialImpact,

                        issueObjectList: fullObjects,
                        issueReporterNames: reporterNames,

                        disableIssueSelect: false // enables select

                        // issueDesc: descriptions,
                        // issueDates: dates,
                        // issueURLs: URLs,
                        // issueImageURLs: imageURLs,
                        // issueCommentIds: comments,


                    }, console.log('Relevant issues found. Adding to state.'
                        // , objects, names, descriptions, dates, URLs, comments, fullObjects
                    )
                    )
            })
    }

    updateIssue = async () => {
        await API.updateIssue(this.state.issue, {
            reporter: this.props.userId, // ObjectId
            type: this.state.issueType,
            timing: this.state.selectedDate,

            organization: this.state.orgId, // ObjectId
            project: this.state.projId, // ObjectId
            version: this.state.verId, // ObjectId

            subject: this.state.subject,
            description: this.state.description,
            url: this.state.url,

            status: this.state.status,
            resolved: this.state.resolved,
            owner: this.state.owner, // ObjectId

            priority: this.state.priority,
            targetResolutionDate: this.state.targetResolutionDate,
            potentialImpact: this.state.potentialImpact,

            imageURL: this.state.imageURL,
            partImpacted: this.state.partImpacted

            // comment should be added separately.
            // findOneAndUpdate does not remove omitted prop
            // displayNames(reporterName) does not change.

        }).then((res) => {
            // this.setState({
            //     ...this.state,
            //     issueId: res.data._id})
            console.log('updateIssue has run.', res);
            this.createComment();
        })

    }

    //-------------------//
    // Comment functions //
    //-------------------//

    findCommenter = async (id) => {
        await API.findUserById(id)
            .then(res => {
                console.log('findCommenter returned :', res.data)
                return res.data.displayName
                // let tempCommenters = this.state.commentAuthors;
                // tempCommenters.push(res.data.displayName);
                // res.data // If user data was returned, add to state.
                //     ? this.setState({
                //         ...this.state,
                //         commentAuthors: tempCommenters // Note that filter will be needed if later auto-generating Organization User Account for Orgs.
                //     })
                //     : console.log('Id not found in DB!', res.data)
            })
            .catch((err) => console.log(err)
                // this.setState({
                //     message: "No results. Please try another query."
                // })
            );
    }

    getAllComments = async () => {
        await API.getComments({
            // project: this.state.projId // may work but below logic is for unfiltered data
        })
            .then(comments => {
                console.log('get all comments:', comments)

                let orgIds = [], projIds = [], verIds = [], // issueIds is above
                    issueIds = [], // ObjectIds from Comment schema
                    commenterIds = [], // ObjectIds from User

                    actions = [], // contains arrays of string
                    commentTexts = [], // string
                    visibilities = [], // string
                    photoURLs = [], // string
                    timestamps = [], // obj

                    fullObjects = [],
                    commenterNames = [],
                    objects = []; // key-val pairs

                // let prettyDate = {};

                (async () => {
                    for (let obj of comments.data) { // iterable array, so for-in does not work
                        if (obj.issue === this.state.issue) { // match issue Id
                            orgIds.push(obj.organization);
                            projIds.push(obj.project);
                            verIds.push(obj.version);
                            issueIds.push(obj.issue);
                            await commenterIds.push(obj.commenter); // allows "undefined" from anonymous issue submit

                            actions.push(obj.actionDescription);
                            commentTexts.push(obj.comment);
                            visibilities.push(obj.visibility);
                            photoURLs.push(obj.avatar);

                            // let tempTime = Date.parse(obj.timestamps.created_at); // convert to ms
                            // console.log(typeof tempTime, tempTime)
                            // prettyDate = new Date(tempTime); // convert to Date obj
                            // console.log('pretty date :', prettyDate);
                            // timestamps.push(prettyDate);
                            timestamps.push(obj.timestamps);

                            fullObjects.push(obj); // full issue object
                            // commenterNames.push()

                            objects.push({ [obj._id]: obj.subject }) // key is comment ObjectId : value is comment subject
                            // Just for undefined checker
                            commenterNames.push(obj.commenterName);


                        }
                    } // .map does not work since it may create "undefined" holes in output array
                    // .filter does not work since condition sits on same level as data to save

                    console.log('commenterIds after:', commenterIds);

                    // for (let id of commenterIds) {
                    //     let val = this.findCommenter(id);
                    //     await commenterNames.push(val);
                    // }

                    console.log('commenterNames was filled!', commenterNames)
                    // commenterNames = await commenterIds.map(function (commenterId) {
                    //     this.findCommenter(commenterId)
                    // })

                    fullObjects.reverse(); // latest first. changes original array

                    // let tempAuthors = this.state.commentAuthors;
                    // tempAuthors.push(res.data.displayName);
                    // this.setState({
                    //     ...this.state,
                    //     commentAuthors: tempAuthors
                    // })

                    // Blank ObjectId shouldn't exist, but if found, this is remnant from earlier test query.
                    objects.includes(undefined) ?
                        await this.setState({
                            commentOrgIds: [],
                            commentprojIds: [],
                            commentverIds: [],
                            commentIssueIds: [],
                            commentCommenterIds: [],

                            commentActionsDescriptions: [],
                            commentTexts: [],
                            commentVisibilities: [],
                            commentPhotoURLs: [],
                            commentTimestamps: [],

                            commentAuthors: [],
                            commentfullObjects: []
                        },
                            console.log('No relevant comments.', fullObjects)
                        ) :
                        // If relevant result is found, add list to state and enable selection
                        await this.setState({
                            commentOrgIds: orgIds,
                            commentProjIds: projIds,
                            commentVerIds: verIds,
                            commentIssueIds: issueIds,
                            commentCommenterIds: commenterIds,

                            commentActionsDescriptions: actions,
                            commentTexts: commentTexts,
                            commentVisibilities: visibilities,
                            commentPhotoURLs: photoURLs,
                            commentTimestamps: timestamps,

                            commentAuthors: commenterNames,
                            commentFullObjects: fullObjects // the only one that matters
                        },
                            () => {
                                this.state.commentFullObjects.length > 0
                                    ? console.log('Relevant comments found and added to state:', fullObjects)
                                    : console.log('No comments found.')
                            }
                        )
                })()

            })
    }  // End of getAllComments function

    createComment = async () => { // works

        await API.createComment({
            organization: this.state.orgId, // ObjectId
            project: this.state.projId, // ObjectId
            version: this.state.verId, // ObjectId
            issue: this.state.issue, // ObjectId
            commenter: this.props.userId, // ObjectId

            actionDescription: ['Commented'], // EXPAND ON THIS W PRE STATE //
            comment: this.state.comment,
            visibility: 'Organization members and reporter',
            avatar: this.props.photoURL,

            timestamps: { updated_at: this.state.selectedDate },
            commenterName: this.props.userName,

            organizationName: this.state.orgName,
            projectName: this.state.projName,
            versionName: this.state.verName,
            issueSubject: this.state.subject

            // ADD ISSUE ID TO REFS IN USER AND ISSUE?

        })
            .then((res) => {
                console.log('createComment has run.', res);
                this.getAllComments();
                // Query relevant comments & display.
                // await API.getComments()
                // this.clearState(); 
            })

        // for (let id of this.state.commentCommenterIds) {
        //     await this.findCommenter(id);
        // }
        // console.log('renderComments collected commenter names:', this.state.commentAuthors);


        // let x = await this.state.commentFullObjects.map(function (commentObj, index) {
        // this.findCommenter(commentObj.commenter)
    }
    // this.props.showDashboard // forward to main view

    // // 12/9/19 No use case at this time
    // updateComment = async (id, data) => {
    //     console.log(`update proj w/ ${id} and this data:`, data)
    //     await API.updateComment(id, data)
    //         .then(result => {
    //             console.log('updateComment returned data: ', result.data)
    //             return result
    //         })
    //         .catch(error => console.log('error occurred!', error));
    // }

    // renderComments = async () => {
    //     // for (let i of this.state.commentFullObjects) {
    //     //     console.log('RENDERING:', i)
    //     //     return <CommentCard
    //     //         displayName={this.findCommenter(i.commenter)}
    //     //         photoURL={i.avatar}
    //     //         createdAt={i.timestamps.created_at}
    //     //         actionDesc={i[0]} // for now, just 1st action //
    //     //         comment={i.comment}
    //     //     />
    //     // }

    //     this.state.commentFullObjects.map(function (commentObj, index) {
    //         console.log('RENDERING:', commentObj)
    //         return <CommentCard
    //             key={index}
    //             displayName="test name"
    //             // {this.state.commentCommenterIds[0]} // need names, not id
    //             photoURL={commentObj.avatar}
    //             createdAt={commentObj.timestamps.created_at}
    //             actionDesc={commentObj.actionDescription[0]} // for now, just 1st action //
    //             comment={commentObj.comment}
    //         />
    //     })
    // }

    //--------------------//
    //  Lifecyle Methods  //
    //--------------------//
    componentDidMount() {
        this.setState({
            ...this.state,
            userId: this.props.userId,
            developerMode: false, // If true, allow updates to restricted fields
        },
            () => {
                console.log('component did mount :', this.state);
                this.getAllOrgs() // adds to state the list of org objects and array of org names
            })
    }

    componentDidUpdate() {
        console.log('component did update :', this.state);
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.topContainer}>
                <form className={classes.containerOne} noValidate autoComplete="off" >
                    <div className={classes.grouping}>
                        <Typography variant='body2' className={classes.textField}>Asterisk(*) denotes required fields.</Typography>
                    </div>
                    <Divider className={classes.divider} />

                    {/* Organization */}
                    <div className={classes.grouping}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel
                                // ref={inputLabel} 
                                id="simple-select-outlined-label-org"
                                required>
                                Provider
                            </InputLabel>
                            <Select
                                labelId="simple-select-outlined-label-org-ManageIssue"
                                id={"simple-select-outlined-ManageIssue"}
                                key={'simple-select-outlined-ManageIssue'}
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
                        <TextField
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
                        />
                    </div>


                    {/* Project */}
                    <div className={classes.grouping}>
                        <FormControl variant="outlined"
                            className={classes.formControl}
                        // {this.state.projectList ? null : disabled}
                        >
                            <InputLabel
                                // ref={inputLabel} 
                                id="simple-select-outlined-label-proj-ManageIssue"
                                required>
                                Project/Product
                        </InputLabel>
                            <Select
                                labelId="simple-select-outlined-label-proj-ManageIssue"
                                // id={this.state.orgId || "simple-select-outlined"}
                                id={"simple-select-outlined-proj-ManageIssue"}
                                key={'simple-select-outlined-proj-ManageIssue'}
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
                                                {/* {console.log('proj list at render:', this.state.projectList[i])} */}
                                            </MenuItem>
                                        }) : <br />
                                    // 'None' should not be an option. Create org first if missing.
                                }
                            </Select>
                            {/* {console.log('Disable project selection at render is:', this.state.disableProjSelect)} */}
                        </FormControl>
                        <TextField
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
                        />
                    </div>

                    {/* Version */}
                    <div className={classes.grouping}>
                        <FormControl variant="outlined" className={classes.formControl}

                        >
                            <InputLabel id="simple-select-outlined-label-ver" required>
                                Version/Specification
                        </InputLabel>
                            <Select
                                labelId="simple-select-outlined-label-ver"
                                id={"simple-select-outlined-ver"}
                                placeholder='Version / Specification'
                                // value={this.state.verName}
                                onChange={
                                    this.handleVerSelect
                                }
                            >
                                {
                                    this.state.versionNames ?
                                        this.state.versionNames.map((ver, i) => {
                                            return <MenuItem
                                                id={ver}
                                                key={Math.random()}
                                                name={ver}
                                                value={ver}
                                                disabled={
                                                    this.state.disableVerSelect ? true : false
                                                }
                                            >
                                                {ver}
                                                {/* {console.log('ver list at render:', this.state.versionList[i])} */}
                                            </MenuItem>
                                        }) : <br />
                                    // 'None' should not be an option. Create org first if missing.
                                }
                            </Select>
                            {/* {console.log('Disable version selection at render is:', this.state.disableVerSelect)} */}
                        </FormControl>
                        <TextField
                            id="verId"
                            disabled
                            className={classes.textField}
                            label="Version ID"
                            value={this.state.verId}
                            style={{ margin: 8 }}
                            margin="normal"
                            InputLabelProps={{ shrink: true, }}
                            onChange={this.handleFieldChange.bind(this)}
                            variant="filled"
                        />
                    </div>
                    <Divider className={classes.divider} />

                    {/* Issue */}
                    <div className={classes.grouping}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="simple-select-outlined-label-issue" required>
                                Issue
                            </InputLabel>
                            <Select
                                labelId="simple-select-outlined-label-issue"
                                id={"simple-select-outlined-issue"}
                                placeholder='Issue'
                                onChange={
                                    this.handleIssueSelect
                                }
                            // labelWidth={'500px'}
                            >
                                {
                                    this.state.issueNames ?
                                        this.state.issueNames.map((iss, i) => {
                                            return <MenuItem
                                                id={iss}
                                                key={Math.random()}
                                                name={iss}
                                                value={iss}
                                                disabled={
                                                    this.state.disableIssueSelect ? true : false
                                                }
                                            >
                                                {iss}
                                                {/* {console.log('issue list at render:', this.state.issueList[i])} */}
                                            </MenuItem>
                                        }) : <br />
                                    // 'None' should not be an option. Create org first if missing.
                                }
                            </Select>
                            {/* {console.log('Disable issue selection at render is:', this.state.disableIssueSelect)} */}
                        </FormControl>
                        <TextField
                            id="issue"
                            disabled
                            label="Issue ID"
                            className={classes.textField}
                            value={this.state.issue}
                            style={{ margin: 8 }}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                        />
                    </div>
                    <div className={classes.grouping}>
                        <TextField
                            id="subject"
                            // Enable update for developer+
                            required
                            disabled={this.props.userType === 'Reporter' ? true : false}
                            fullWidth
                            multiline
                            label="Issue Subject"
                            value={this.state.subject}
                            // className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleFieldChange.bind(this)}
                            style={{ margin: 8 }}
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
                            className={classes.wideTextField}
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

                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="simple-select-outlined-label-issue-status">
                                Status
                            </InputLabel>
                            <Select
                                labelId="simple-select-outlined-label-issue-status"
                                id={"simple-select-outlined-issue-status"}
                                placeholder='e.g. Resolved'
                                onChange={this.handleStatusSelect}
                                value={this.state.status}
                            >
                                {
                                    this.state.issueStatusChoices ?
                                        this.state.issueStatusChoices.map((status, i) => {
                                            return <MenuItem
                                                id={status}
                                                key={Math.random()}
                                                name={status}
                                                value={status}
                                                disabled={this.state.disableIssueSelect ? true : false}
                                            >
                                                {status}
                                            </MenuItem>
                                        }) : <br />
                                    // 'None' should not be an option. Default is "Open".
                                }
                            </Select>
                        </FormControl>

                        <TextField
                            id="url"
                            // fullWidth
                            label="URL"
                            // placeholder="Any thoughts?"
                            value={this.state.url}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleFieldChange.bind(this)}
                            style={{ margin: 8 }}
                        />

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
                            style={{ margin: 8 }}
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
                                    this.updateIssue
                                    //     this.state.issue.length > 0
                                    //     ? async () => {
                                    //         await this.updateIssue();
                                    //         await this.createComment();
                                    //     }
                                    //     : this.createComment()
                                }
                            > Submit
                                    </Button>
                        </div>
                        {/* end of button-group */}
                    </div>

                    {/* End of containerOne */}
                </form>

                <div width='1vw'>
                    <Divider orientation="vertical" />
                </div>

                <div className={classes.containerTwo}>
                    {this.state.commentAuthors.length > 0
                        ? this.state.commentFullObjects.map(function (commentObj, index) {
                            // console.log('RENDERING:', commentObj)
                            return <CommentCard
                                key={index}
                                displayName={commentObj.commenterName
                                    // this.state.commentAuthors.reverse()[index]
                                }
                                photoURL={commentObj.avatar}
                                createdAt={commentObj.timestamps.created_at}
                                actionDesc={commentObj.actionDescription[0]} // for now, just 1st action //
                                comment={commentObj.comment}
                            />
                        })

                        // ()=>this.renderComments()
                        : <Typography>(No Comments to Display.)</Typography>
                    }

                </div>
            </Paper>
        )

    }
}

// export default withRouter(SubmitIssue)
export default withRouter(withStyles(styles, { withTheme: true })(ManageIssue))
