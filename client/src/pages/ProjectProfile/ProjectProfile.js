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
    }
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
            // name: this.props.name,
            // email: this.props.email,
            // type: 'Technical'
        }
    }

    handleFieldChange = (event) => {
        // for a regular input field, read field name and value from the event
        const fieldId = event.target.id;
        const fieldValue = event.target.value;
        // this.props.onChange(fieldName, fieldValue); // could use if updating parent state
        // this.state.onChange(fieldName, fieldValue);

        // console.log(fieldId, fieldValue);
        this.setState(
            { [fieldId]: fieldValue }
        ); // this works
        // this.setState({ testObj: { [fieldId]: fieldValue } }); // not rly. keeps adding indexed

        // this.setState({
        //         testArr: [
        //             // ...this.state.testArr, 
        //             {
        //                 [fieldId]: fieldValue
        //             }
        //         ]

        //     }

        // }); // 
        // console.log('handle field change :', this.state); // this will be one step slower
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
        this.setState({ orgId: selectedId });
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
            // organizationList: [], // should not be reset unless query auto restarts
            // organizationNames: [], // should not be reset unless query auto restarts
            projectList: [],
            projectNames: [],
            versionList: []
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
            .then(()=>console.log('state after getAllOrg :', this.state))
            .then(() => this.getAllProj()) // query matching projects on org select
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

    // ...?
    getAllProj = () => {
        API.getProjects(
            {
                organization: this.state.orgId
            }
        )
            .then(proj => {
                console.log('get all proj', proj);
                let objects = proj.data.map(proj => {
                    return { [proj._id]: proj.name } // projId : projName
                })
                let names = proj.data.map(proj => {
                    return proj.name // projId : projName
                })
                this.setState({
                    projectList: objects,
                    projectNames: names
                })
            })
            .then(()=>console.log('state after getAllProj :', this.state))
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
        // console.log('component did update :', this.state.organizationList[0]);
        // console.log('component did update :', Object.keys(this.state.organizationList[0])); // gives you key at index.. in an array
        // console.log('component did update :', Object.keys(this.state.organizationList[0])[0]); // gives you key at index!
        // let k = Object.keys(this.state.organizationList[ind])[0] // key at index ind
        // let len = this.state.organizationList.length; // # of orgs

        // let k = Object.keys(this.state.organizationList[ind])[0] // key at index ind
        // this.setState({ organizationNames: names })

        // console.log('I got :', 

        // )
        // console.log('component did update :', this.state.organizationList[0][k]); // gives you val at index (org name)
        // console.log('component did update :', this.state.organizationList[0][Object.keys(this.state.organizationList[0])[0]]);

    }

    // Object.keys(obj) gets array of keys in obj




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
                                    this.state.projectNames.map((proj, ind) =>
                                        // <option key={org.key} value={org.key}>{org.value}</option>
                                        <MenuItem
                                            id={Object.keys(this.state.projectList[ind])[0]}
                                            key={proj}
                                            name={proj}
                                            value={proj}>
                                            {proj}
                                        </MenuItem>
                                    )
                                    : <br />
                                // None should not be an option. Create org first if missing.
                            }
                        </Select>
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
                            () => {
                                // FOR NOW, CREATE ONLY.
                                // ADD UPDATE FEATURE LATER.
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
