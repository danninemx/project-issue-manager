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
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import API from '../../utils/API';

const styles = theme => ({
    // const styles = makeStyles(theme => ({
    // const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',

        alignItems: 'center',
        // justifyContent: 'flex-end',
        // justifyContent: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        // width: `calc(100% - 240px)`,
        paddingLeft: 240,
        paddingTop: '12vh',

    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
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
        minWidth: 300,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
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
            disableProjSelect: true
            // name: this.props.name, 
            // email: this.props.email,
            // type: 'Technical' // initializing this way still did not define prevState
        }
    }

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
        // console.log(Object.keys(this.state.organizationList[ind])) // shows array containing just the key from the object
        // console.log(Object.keys(this.state.organizationList[ind])[0]) // that in a string
        let selectedId = Object.keys(this.state.organizationList[ind])[0];
        console.log('selected org:', selectedId);
        this.setState({
            orgId: selectedId
        }
            , () => { this.getAllProj() }
        );
    };

    handleProjSelect = event => {
        console.log('select proj target: ', event.target)
        let ind = this.state.projectNames.indexOf(event.target.value)
        // console.log(this.state.projectList[ind]) // shows the object at index
        // console.log(Object.keys(this.state.projectList[ind])) // shows array containing just the key from the object
        // console.log(Object.keys(this.state.projectList[ind])[0]) // that in a string
        let selectedId = Object.keys(this.state.projectList[ind])[0];
        console.log('selectted proj:', selectedId)
        this.setState({ projId: selectedId }
            // ,() => this.getAllProj())
        )
    };

    clearState = () => {
        this.setState({
            ...this.state,
            // project info
            projId: '', // ObjectId of project
            orgId: '', // ObjectId of org
            projName: '', // unique
            projDescription: '',

            // version info
            verId: '', // ObjectId of version
            verName: '',
            verDescription: '',
            // Also needs project ObjectId as ref. Use id above

            // cache
            organizationList: [], // should not be reset unless query auto restarts
            organizationNames: [], // 

            projectList: [], // these should be reset, but make org select rerun proj query
            projectNames: [], //
            // versionList: [] //

            disableProjSelect: 'true'
        },
            () => { // callback inside setState guarantees sync ops
                this.getAllOrgs() // reset org list to all (applicable, eventually)
                this.getAllProj() // reset proj list to all
                console.log('state cleared')
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
                this.setState(
                    {
                        organizationList: objects,
                        organizationNames: names
                    }
                    ,
                    () => this.getAllProj() // cb

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

    // test after version creation & query setup
    saveProj = () => {
        API.createProject({
            name: this.state.projName,
            description: this.state.projDescription,
            organization: [this.state.orgId] // user Id
        }).then(() => console.log('Org saved.'))
    }

    // Query projects matching selected organization
    getAllProj = () => { // works w/o params
        API.getProjects(
            { // organization: this.state.orgId // non func
            })
            .then(projects => {
                console.log('get all proj', projects);
                let objects = projects.data.map(proj => {
                    if (proj.organization === this.state.orgId) {
                        return { [proj._id]: proj.name } // projId : [ projName, orgId ]
                    }
                })

                let names = projects.data.map(proj => {
                    if (proj.organization === this.state.orgId) {
                        return proj.name // projId : projName
                    }
                })

                // If blanks exist, this is remnant from relevant query
                objects.includes(undefined) ?
                    this.setState({
                        projectList: [],
                        projectNames: [],
                        disableProjSelect: true // prevent proj pick
                    },
                        console.log('No relevant project. ', objects, names)
                    ) :
                    // If relevant projects are found, add list to state and enable project selection
                    // objects.length > 0 && names.length > 0 ?
                    this.setState({
                        projectList: objects,
                        projectNames: names,
                        disableProjSelect: false // enables project select
                    }, console.log('Relevant projects found. Adding to state:', objects, names)
                    )

            })
            .then(() => console.log('state after getAllProj, filtered :', this.state))
            .catch(err => console.log(err));
        // .then(this.getAllVers()) // query matching versions on proj select // works?
    }


    //-------------------//
    // Version functions //
    //-------------------//
    getAllVers = () => {
        API.getVersions({ project: this.state.projId })
            .then(vers => console.log('get all vers', vers))
    }

    getOneVer = () => {
        API.findOneVersion(this.state.verId)
            .then(ver => console.log(ver))
    }

    saveVer = () => {
        API.createVersion({
            name: this.state.verName,
            description: this.state.verDescription,
            project: this.state.projId // project Id as ref
        }).then(() => console.log('Org saved.'))
    }

    // makeOrgList = () => {
    //     let names = this.state.organizationList.map((org, ind) => {
    //         // let k = Object.keys(this.state.organizationList[ind])[0] // get the key at index of ind
    //         let k = Object.keys(org)[ind]
    //         console.log(k)
    //         // return this.state.organizationList[k]
    //         return k
    //     })
    //     // return ('here', names)
    //     // console.log(names)
    //     // this.setState({ organizationNames: names })
    // }

    componentDidMount() {
        this.getAllOrgs() // adds to state the list of org objects and array of org names
        // this.getAllProj()

    }

    componentDidUpdate() {
        // this.makeOrgList()

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
        // this.getAllOrgs();
        const { classes } = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off" >
                <div>
                    <Typography variant='body2'>Asterisk(*) denotes required fields.</Typography>
                    <br />
                    {/* START BY SELECTING ORG > PROJ > VER */}
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel
                            // ref={inputLabel} 
                            id="demo-simple-select-outlined-label">
                            Provider
                            </InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            // id={this.state.orgId || "demo-simple-select-outlined"}
                            id={"demo-simple-select-outlined"}
                            placeholder='Provider Name'
                            value={
                                this.state.orgId !== '' ? this.state.orgId : '' // does not change display
                            }
                            onChange={this.handleOrgSelect
                                // this.handleFieldChange // not reading correctly?
                                // this.setState({ event.target.value })
                            }
                        // labelWidth={'500px'}
                        >
                            {
                                this.state.organizationNames ?
                                    this.state.organizationNames.map((org, ind) =>
                                        // <option key={org.key} value={org.key}>{org.value}</option>
                                        <MenuItem
                                            id={Object.keys(this.state.organizationList[ind])[0]}
                                            key={org}
                                            name={org}
                                            value={org}>
                                            {/* error: you have provided an out-of-range value `undefined` for the select component. */}
                                            {org}
                                        </MenuItem>
                                    )
                                    : () => console.log('state during MenuItem render', this.state)
                                // None should not be an option. Create org first if missing.
                            }
                        </Select>
                    </FormControl>
                    <TextField
                        id="orgId"
                        // REMEMBER, LIST IS FOR NAME BUT SAVES ID
                        disabled
                        fullWidth
                        label="Provider ID"
                        value={this.state.orgId}
                        style={{ margin: 8 }}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        onChange={this.handleFieldChange.bind(this)}
                    />

                    {/* project */}


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
                                            key={proj}
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
                    <TextField
                        id="projName"
                        required
                        fullWidth
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
                        id="projId"
                        // REMEMBER, LIST IS FOR NAME BUT SAVES ID
                        disabled
                        fullWidth
                        label="Project ID"
                        value={this.state.projId}
                        style={{ margin: 8 }}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        onChange={this.handleFieldChange.bind(this)}
                    />
                    <TextField
                        id="projDescription"
                        fullWidth
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

                </div>
                <div>
                    <TextField
                        id="verName"
                        required
                        fullWidth
                        label="Version / Specification Name"
                        // className={classes.textField} // disabled for full width
                        value={this.state.verName || '(not applicable)'}
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
                        value={this.state.orgDescription}
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
                </div>
                <div className='button-group'>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        endIcon={<RotateLeftIcon>Reset Form</RotateLeftIcon>}
                        onClick={
                            // this.props.handleSubmitIssue(this.state.testArr) // causes infinite loop
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
                            () => {
                                // FOR NOW, CREATE ONLY. ADD UPDATE FEATURE LATER.
                                alert('not ready')
                                // this.getAllOrgs()
                                // this.saveOrg()
                                // this.saveVer()
                                // console.log('clicked button', this.state)
                            }

                        }
                    > Submit
                    </Button>
                </div>

            </form >
        )

    }
}

// export default withRouter(SubmitIssue)
export default withRouter(withStyles(styles, { withTheme: true })(ProjectProfile))
