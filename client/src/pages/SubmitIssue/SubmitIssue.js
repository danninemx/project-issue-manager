// React
import React
, {
    Component,
    // useState
}
    from 'react';
import { withRouter } from 'react-router-dom';

// Material UI
import {
    // makeStyles, // used in functional component
    // useStyles, // Stateful Components cannot use Hooks such as useStyles.
    withStyles
} from '@material-ui/core/styles';
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
// import Grid from '@material-ui/core/Grid';
// import {
//     MuiPickersUtilsProvider,
//     KeyboardTimePicker,
//     KeyboardDatePicker,
// } from '@material-ui/pickers';
import 'date-fns';
// import DateFnsUtils from '@date-io/date-fns';

// import { DateTimePicker } from "@material-ui/pickers";
import DateTimePicker from '../../components/DateTimePicker/DateTimePicker';

import API from '../../utils/API';

// Components
// import Sidebar from '../../components/Sidebar';

const styles = theme => ({
    // const styles = makeStyles(theme => ({
    // const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',

        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        paddingLeft: 240,
        paddingTop: '12vh',

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
        // marginTop: theme.spacing(2),
        minWidth: 300,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },

    divider: {
        margin: '20px 0 20px 0',
    },
})

class SubmitIssue extends Component {
    // function SubmitIssue(props) {

    constructor(props) {
        super(props);
        // State updater function to be passed down into the context provider per https://reactjs.org/docs/context.html
        this.state = {
            selectedDate: new Date(),
            // .toLocaleDateString('en-US'),
            // selectedTime: new Date().toLocaleTimeString('en-US')
            // name: this.props.name,
            // email: this.props.email,
            // type: 'Technical'

            // organization info
            // orgId: '', // ObjectId of org. For now, do not force clear?
            // orgId: 'unknown' // initializing orgId prevents selection from staying

            // project info
            projId: '', // ObjectId of project
            projName: '', // unique
            projDescription: '',

            // version info
            verId: '', // ObjectId of version
            verName: '',
            verDescription: '',
            // Also needs project ObjectId as ref. Use id above

            // cache
            organizationList: [], // should not be reset unless query auto restarts
            organizationNames: [],
            organizationDesc: [],

            projectList: [],
            projectNames: [],
            projectDesc: [],

            versionList: [],
            versionNames: [],
            versionDesc: [],

            disableProjSelect: true, // both data types seem to work
            disableVerSelect: 'true'
        }
    }

    // const classes = useStyles();
    // const theme = useTheme();


    //-------------------//
    // Handler functions //
    //-------------------//
    handleFieldChange = (event) => {
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
        console.log('received date:', date)
        this.setState({
            ...this.state,
            selectedDate: date
        })
    };

    handleTimeChange = time => {
        console.log('received time:', time)
        this.setState({
            ...this.state,
            selectedTime: time
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
            orgId: selectedId,

            // If any proj is selected, remove it
            projId: '',
            projName: '',
            projDescription: '',

            // If any version is selected, remove it
            verId: '',
            verName: '',
            verDescription: ''
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
            verId: selectedId,
            verName: selectedName,
            verDescription: selectedDesc
        })
    };

    clearState = () => {
        this.setState({
            ...this.state,
            // required
            organization: '',
            project: '',
            version: '',
            subject: '',
            description: '',
            owner: '',
            url: '',

            // This is string here but DB stores it as array
            comment: '',

            // optional in current scope
            status: '',
            resolved: '',
            priority: '',
            targetResolutionDate: '',
            potentialImpact: '',
            image: '',
            partImpacted: ''
        })
    };

    createIssue = () => {
        API.createIssue({
            // this.state
            type: this.state.type,
            organization: this.state.organization, // ObjectId
            project: this.state.project, // ObjectId
            subject: this.state.subject,
            description: this.state.description,
            comment: this.state.comment,
            owner: this.state.owner, // ObjectId

            // optional in this version
            url: this.state.url,
            status: this.state.status,
            resolved: this.state.resolved,
            priority: this.state.priority,
            targetResolutionDate: this.state.targetResolutionDate,
            potentialImpact: this.state.potentialImpact,
            image: this.state.image,
            partImpacted: this.state.partImpacted
        }).then(() => alert('done'))

        // API.saveBook({
        //     googleId: book.id,
        //     title: book.volumeInfo.title,
        //     subtitle: book.volumeInfo.subtitle,
        //     link: book.volumeInfo.infoLink,
        //     authors: book.volumeInfo.authors,
        //     description: book.volumeInfo.description,
        //     image: book.volumeInfo.imageLinks.thumbnail
        //   }).then(() => this.getBooks());
    }

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
                this.setState(
                    {
                        organizationList: objects,
                        organizationNames: names
                    }
                    // ,
                    // () => this.getAllProj() // cb

                    // prevState test. did not work
                    // (prevState) => { // general syntax for avoiding async prob
                    //     console.log('prevState:', prevState) // initially prints nothing?
                    //     return {
                    //         organizationList: objects,
                    //         organizationNames: names,
                    //         prevSL: prevState.length // testing
                    //     }
                    // })
                )
            })
            .then(() => console.log('state after getAllOrg & getAllProj:', this.state))
        // .then(() => this.getAllProj()) // query matching projects on org select
        // works but without parameters
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
                        projectList: [],
                        projectNames: [],
                        projectDesc: [],
                        disableProjSelect: true // prevent proj pick
                    },
                        console.log('No relevant project. ', objects, names, descriptions)
                        // console.log('No relevant project. ', o2, n2)
                    ) :
                    // If relevant projects are found, add list to state and enable project selection
                    // objects.length > 0 && names.length > 0 ?
                    this.setState({
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
                        disableVerSelect: true // prevent select
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

    componentDidMount() {
        console.log('component did mount :', this.state);
    }

    componentDidUpdate() {
        console.log('component did update :', this.state);
    }

    render() {
        const { classes } = this.props;
        return (
            <form className={classes.container} noValidate autoComplete="off" >
                <div>
                    <Typography variant='body2'>Asterisk(*) denotes required fields.</Typography>
                    <br />
                    {!this.props.isSignedIn && // Display for anonymous users only
                        <React.Fragment>
                            <TextField
                                id="name"
                                // required // disabled
                                label="Your Name"
                                placeholder="John Doe"
                                className={classes.textField}
                                defaultValue={this.props.name}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                id="email"
                                // required // disabled
                                label="Your Email"
                                defaultValue={this.props.email}
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                            />
                        </React.Fragment>
                    }
                </div>

                <div>
                    <Divider className={classes.divider} />
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel
                            // ref={inputLabel} 
                            id="demo-simple-select-outlined-label-org">
                            Provider
                            </InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label-org"
                            // id={this.state.orgId || "demo-simple-select-outlined"}
                            id={"demo-simple-select-outlined"}
                            key={Date.now}
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

                <div>

                    {/* Project */}

                    <FormControl variant="outlined"
                        className={classes.formControl}
                    // {this.state.projectList ? null : disabled}
                    >
                        <InputLabel
                            // ref={inputLabel} 
                            id="demo-simple-select-outlined-label-proj">
                            Select Project
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label-proj"
                            // id={this.state.orgId || "demo-simple-select-outlined"}
                            id={"demo-simple-select-outlined-proj"}
                            key={Date.now}
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
                                            key={Date.now}
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
                <div>

                    {/* Version */}

                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label-ver">
                            Select Version
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
                        {console.log('Disable project selection at render is:', this.state.disableProjSelect)}
                    </FormControl>

                    <TextField
                        id="verId"
                        // REMEMBER, LIST IS FOR NAME BUT SAVES ID
                        disabled
                        // fullWidth
                        className={classes.textField}
                        label="Version ID"
                        value={this.state.verId}
                        style={{ margin: 8 }}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="filled"
                        onChange={this.handleFieldChange.bind(this)}
                    />
                    <Divider className={classes.divider} />
                </div>
                <div>
                    <TextField
                        id="subject"
                        required
                        label="Subject"
                        value={this.state.subject}
                        style={{ margin: 8 }}
                        // placeholder="Placeholder"
                        // helperText="What seems to be the trouble?"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
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
                        defaultValue={this.props.type}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleFieldChange.bind(this)}
                    />
                    <DateTimePicker
                        selectedDate={this.state.selectedDate}
                        handleDateChange={this.handleDateChange}
                    />
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
                                // this.props.handleSubmitIssue(this.state.testArr) // causes loop SA
                                () => {
                                    console.log('clicked reset while state is', this.state)
                                    // this.props.handleSubmitIssue()
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
                                this.createIssue
                            }
                        > Submit
                    </Button>
                    </div>
                </div>

            </form>
        )

    }
}

// export default withRouter(SubmitIssue)
export default withRouter(withStyles(styles, { withTheme: true })(SubmitIssue))
