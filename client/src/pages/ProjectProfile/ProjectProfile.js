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

    clearState = () => {
        this.setState({
            ...this.state,
            // required
            organization: '', // ObjectId
            projName: '',
            projDescription: ''
        })
    };

    getAllOrgs = () => {
        API.getOrgs().then(orgs => console.log(orgs))
    }

    getOneOrg = () => {
        // API.findOneUser(
        //     this.props.email
        // )
        //     .then(res => {
        //         res.data ?
        //             console.log('returned :', res.data[0])
        //             // this.setState({
        //             //   books: res.data
        //             // })
        //             : console.log('no one!', res.data)
        //     })
        //     .catch(() =>
        //         this.setState({
        //             message: "No results. Please try another query."
        //         })
        //     );
    }

    saveOrg = () => {
        API.createOrganization({
            name: this.state.orgName,
            description: this.state.orgDescription,
            url: this.state.orgUrl,
            member: [this.props.id]
        }).then(() => console.log('Org saved.'))
    }

    componentDidUpdate() {
        console.log('component did update :', this.state);
    }

    render() {
        // this.getAllOrgs();
        const { classes } = this.props;
        return (
            <form className={classes.container} noValidate autoComplete="off" >
                <div>
                    <Typography variant='body2'>Asterisk(*) denotes required fields.</Typography>
                    <br />
                    {/* first and last name are computed, not entered */}
                    <TextField
                        id="orgName"
                        required
                        fullWidth
                        label="Provider Name"
                        value={this.state.orgName}
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
                        id="orgDescription"
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
                    <TextField
                        id="orgUrl"
                        fullWidth
                        label="URL"
                        value={this.state.orgUrl}
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
                            this.getAllOrgs
                            // this.saveOrg
                            // console.log('clicked button', this.state)

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
