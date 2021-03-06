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
import { Divider } from '@material-ui/core';

import API from '../../utils/API';

const styles = theme => ({
    // const styles = makeStyles(theme => ({
    // const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',

        alignItems: 'center',
        // justifyContent: 'flex-start',
        // justifyContent: 'center',
        padding: theme.spacing(0, 10),
        ...theme.mixins.toolbar,

        paddingTop: '12vh',
        width: '60vw',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '48%',
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
    grouping: {
        display: 'flex',
        flexWrap: 'wrap',
        // justifyContent: 'space-between',
        // width: '80vw',
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

    divider: {
        margin: '20px 0 20px 0',
    },
})

class UserProfile extends Component {
    // function SubmitIssue(props) {

    constructor(props) {
        super(props);
        // State updater function to be passed down into the context provider per https://reactjs.org/docs/context.html
        this.state = {
            id: '',
            name: '',
            email: '',
            userType: '',
            photoURL: ''
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
        // console.log('handle field change :', this.state); // this will be one step slower
    }

    handleSubmit = event => {
        const delay = ms => new Promise(res => setTimeout(res, ms));

        // If user ID exists, update profile.  If new, create one anew.
        (async () => {
            if (this.props.id && this.props.id.length > 0) {
                this.updateUser();
            } else { this.createUser() }

            await delay(500);

            // redirect to landing if authenticated; root if not
            this.props.isSignedIn
                ? this.props.showDashboard()
                : this.props.history.push({
                    pathname: '/',
                    state: { isSignedIn: false }
                });
        })()
    }

    clearState = () => {
        this.setState({
            ...this.state,
            // required
            userType: 'User',

            // implement later for devs
            organization: '',
            project: '',
            subject: '',
            description: '',
            owner: '',

            // This is string here but DB stores it as array
            comment: '',

            // optional in current scope
            url: '',
            status: '',
            resolved: '',
            priority: '',
            targetResolutionDate: '',
            potentialImpact: '',
            image: '',
            partImpacted: ''
        })
    };
    //  onChange = e => {
    //     const { name, value } = e.target;
    //     setState(prevState => ({ ...prevState, [name]: value }));
    //   };

    // handleReset = e => {
    //     e.preventDefault();
    //     signupUser().then(this.clearState);
    // };

    getUser = () => {
        // ***** This is hitting controller's getUsers, not findOneUser. //
        API.findOneUser(
            this.props.email
        )
            .then(res => {
                res.data ?
                    console.log('returned :', res.data[0])
                    // this.setState({
                    //   books: res.data
                    // })
                    : console.log('no one!', res.data)
            })
            .catch(() =>
                this.setState({
                    message: "No results. Please try another query."
                })
            );
    }

    createUser = () => {
        API.createUser({
            email: this.props.email,
            displayName: this.props.name,
            // first word in display name
            firstName: this.props.name.split(' ')[0],
            // last word in display name
            lastName: this.props.name.split(' ')[this.props.name.split(' ').length - 1],
            photoURL: this.props.photoURL,
            userType: this.props.userType
        }).then((res) => {
            console.log('createUser:', res)
            this.getUser();
        })
        // this.props.showDashboard();
    }

    updateUser = () => {
        API.updateUser({
            email: this.props.email,
            displayName: this.props.name,
            // first word in display name
            firstName: this.props.name.split(' ')[0],
            // last word in display name
            lastName: this.props.name.split(' ')[this.props.name.split(' ').length - 1],
            photoURL: this.props.photoURL,
            userType: this.props.userType
        }).then(res => {
            console.log('updateUser:', res)
            this.getUser();
        })
    }


    componentDidMount() {
        this.setState({
            ...this.state,
            id: this.props.id,
            name: this.props.name,
            email: this.props.email,
            userType: 'Developer', // future scope will include others
            photoURL: this.props.photoURL
        })

    }

    componentDidUpdate() {
        console.log('component did update :', this.state);
    }

    render() {
        this.getUser();
        const { classes } = this.props;
        return (
            <form className={classes.container} noValidate autoComplete="off" >
                <div>
                <Typography variant='body2'>Confirm the details and submit to create or update your profile. Asterisk(*) denotes required fields.</Typography>
                <Divider className={classes.divider} />
                </div>
                
                <div className={classes.grouping}>
                    <br />
                    {/* first and last name are computed, not entered */}
                    <TextField
                        id="name"
                        disabled
                        label="Your Name"
                        placeholder="John Doe"
                        className={classes.textField}
                        defaultValue={this.props.name}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="email"
                        disabled
                        label="Your Email"
                        defaultValue={this.props.email}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                    />
                </div>

                <div className={classes.grouping}>
                    <TextField
                        id="userType"
                        // required
                        disabled
                        label="User / Developer"
                        defaultValue={this.props.userType}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleFieldChange.bind(this)}
                    />
                    <TextField
                        id="photoURL"
                        label="Profile Photo (URL)"
                        value={this.props.photoURL}
                        style={{
                            margin: 8,
                            width: '60vw',
                        }}
                        // placeholder="Placeholder"
                        // helperText="What seems to be the trouble?"
                        // fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        onChange={this.handleFieldChange.bind(this)}
                    />
                </div>

                <div className={classes.buttonGroup}>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        endIcon={<RotateLeftIcon>Reset Form</RotateLeftIcon>}
                        onClick={this.clearState}
                    > Reset Form
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        endIcon={<Icon>send</Icon>}
                        onClick={this.handleSubmit}
                    > Submit
                    </Button>
                    {/* End of button group */}
                </div>

            </form >
        )

    }
}

export default withRouter(withStyles(styles, { withTheme: true })(UserProfile))
