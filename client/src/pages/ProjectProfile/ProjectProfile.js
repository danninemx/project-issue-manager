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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import { SnackbarProvider, useSnackbar } from 'notistack'; // later for feedback msg
import Divider from '@material-ui/core/Divider';

import API from '../../utils/API';

const styles = theme => ({
    // const styles = makeStyles(theme => ({
    // const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        padding: theme.spacing(0, 10),
        ...theme.mixins.toolbar,
        paddingTop: '12vh',
        width: '60vw',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '40%', //default 200
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
        minWidth: '55%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },

    divider: {
        margin: '20px 0 20px 0',
        width: '100%',
    },
    grouping: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
    },
    buttonGroup: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(15),
        width: 'inherit',
    },
})

// Per https://material-ui.com/components/selects/ , needed for normal implement but can't use hooks..?
// const inputLabel = React.useRef(null);
// React.useEffect(() => {
//     setLabelWidth(inputLabel.current.offsetWidth);
// }, []);

// var Hello = 
// });

class ProjectProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        this.setState({ [fieldId]: fieldValue }); // works
        // this.setState({ testObj: { [fieldId]: fieldValue } }); // adds index
    }

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
        // console.log('step1', this.state.projectList[ind]) // the object at index
        // console.log('step2', Object.keys(this.state.projectList[ind])) // array containing the keys from the object
        // console.log('step3', Object.keys(this.state.projectList[ind])[0]) // "_id", which is the first item on the array
        // console.log('check :', this.state.projectList[ind]);

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
        // console.log(this.state.versionList[ind]) // shows the object at index
        // console.log(Object.keys(this.state.versionList[ind])) // shows array containing just the key from the object
        // console.log(Object.keys(this.state.versionList[ind])[0]) // that in a string

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
            // organization info
            // orgId: '', // ObjectId of org. For now, do not force clear?

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

            disableProjSelect: 'true',
            disableVerSelect: 'true'
        },
            () => { // callback inside setState guarantees sync ops
                this.getAllOrgs() // reset org list to all (applicable, eventually)
                // this.getAllProj() // reset proj list to all. Called at end of getAllOrgs.
                console.log('state cleared')
            })
    };

    handleFormSubmit = async (event) => {
        const delay = ms => new Promise(res => setTimeout(res, ms));

        // Check if org ID is missing.
        this.state.orgId === ''
            // If missing, org was not selected; warn user.
            // ? this.enqueueSnackbar('You must choose an organiation first. \n If you see none, visit org profile to create one.')
            ? console.log('Choose org first. Visit org profile for creation')
            : (() => {  // If org Id was found, check if proj ID was found.
                this.state.projId !== ''// If proj ID is found, proj is in DB. Update it. Use ObjectId of org
                    ? this.updateProject(this.state.projId, {
                        "name": this.state.projName,
                        "description": this.state.projDescription,
                        "organization": this.state.orgId
                    })
                    : // If projId is missing, create proj anew to DB..
                    this.createProj();
            })()
        await delay(500);

        // Check if version Id is missing.
        this.state.verId === '' || this.state.verId === undefined
            ? this.createVer() // If verId is missing, create a new ver in DB.
            : // If found, version is in DB. Update it. Use ObjectId of proj
            this.updateVersion(this.state.verId, {
                "name": this.state.verName,
                "description": this.state.verDescription,
                "project": this.state.projId
            })

        await delay(500);
        this.props.showDashboard(); // Once updated, forward to main view
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
            // .then(() => console.log('state after getAllOrg & getAllProj:', this.state))
        // .then(() => this.getAllProj()) // query matching projects on org select
        // works but without parameters
    }

    // // NEEDS DUPLICATION PREVENTION
    // saveOrg = () => {
    //     API.createOrganization({
    //         name: this.state.orgName,
    //         description: this.state.orgDescription,
    //         url: this.state.orgUrl,
    //         member: [this.props.id] // user Id
    //     }).then(() => console.log('Org saved.'))
    // }

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
            .then((res) => {
                console.log('Project saved.', res.data);
                this.setState({
                    ...this.state,
                    projId: res.data._id
                })
            })
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
            project: this.state.projId // project Id as ref
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


    //--------------------//
    //  Lifecyle Methods  //
    //--------------------//
    componentDidMount() {
        this.getAllOrgs() // adds to state the list of org objects and array of org names
    }

    componentDidUpdate() {
        console.log('component did update :', this.state);
        // // prevState test did not work
        // this.state.orgId !== prevState.orgId ?
        //     () => {
        //         console.log('new orgId detected:', this.state.orgId)
        //         this.getAllProj()

        //     }
        //     : null // query matching projects on org select
    }

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off" >
                <div>
                    <Typography variant='body2'>Apply filters to load a project or version's details. If unavailable, you can provide the name to create it.</Typography>
                    <Typography variant='body2'>Asterisk(*) denotes required fields.</Typography>
                    <Divider className={classes.divider} />
                </div>

                {/* Organization */}
                <div className={classes.grouping}>
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
                                // this.handleFieldChange // not reading correctly?
                                // this.setState({ event.target.value })
                            }
                        // labelWidth={'500px'}
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
                    <Divider className={classes.divider} />
                </div>

                {/* project */}
                <div className={classes.grouping}>
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
                    <TextField
                        id="projName"
                        required
                        fullWidth
                        disabled={this.state.orgId === '' ? true : false}
                        label="Project/Product Name"
                        value={this.state.projName}
                        // className={classes.textField} // disabled for full width
                        // defaultValue={this.props.name}
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleFieldChange.bind(this)}
                        style={{ margin: 8 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="projDescription"
                        fullWidth
                        disabled={this.state.orgId === '' ? true : false}
                        label="Description"
                        value={this.state.projDescription}
                        style={{ margin: 8 }}
                        // placeholder="Placeholder"
                        // className={classes.textField} // adding this will break css
                        // helperText="What seems to be the trouble?"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        onChange={this.handleFieldChange.bind(this)}
                    />
                    <Divider className={classes.divider} />
                </div>
                {/* Version */}
                <div className={classes.grouping}>
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
                    <TextField
                        id="verName"
                        required
                        fullWidth
                        label="Version / Specification Name"
                        // className={classes.textField} // disabled for full width
                        // value={this.state.verName || '(not applicable)'}
                        value={this.state.verName}
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleFieldChange.bind(this)}
                        style={{ margin: 8 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <TextField
                        id="verDescription"
                        fullWidth
                        label="Description"
                        value={this.state.verDescription}
                        style={{ margin: 8 }}
                        // placeholder="Placeholder"
                        // className={classes.textField} // adding this will break css
                        // helperText="What seems to be the trouble?"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        onChange={this.handleFieldChange.bind(this)}
                    />
                    {/* <Divider className={classes.divider} /> */}
                </div>
                <div className={classes.buttonGroup}>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        endIcon={<RotateLeftIcon>Reset Form</RotateLeftIcon>}
                        onClick={
                            // this.props.handleSubmitIssue(this.state.testArr) // causes infinite loop
                            () => {
                                console.log('form reset while state is:', this.state)
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
                        onClick={this.handleFormSubmit}
                    > Submit
                    </Button>
                </div>

            </form >
        )

    }
}

// export default withRouter(SubmitIssue)
export default withRouter(withStyles(styles, { withTheme: true })(ProjectProfile))
