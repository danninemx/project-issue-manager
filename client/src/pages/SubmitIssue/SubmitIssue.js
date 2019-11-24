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

// Components
// import Sidebar from '../../components/Sidebar';

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
        paddingTop: 56,

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

class SubmitIssue extends Component {
    // function SubmitIssue(props) {

    constructor(props) {
        super(props);
        // State updater function to be passed down into the context provider per https://reactjs.org/docs/context.html
        this.state = {
            name: this.props.name,
            email: this.props.email,
            description: ''
            // testArr: []
        }
    }

    // const classes = useStyles();
    // const theme = useTheme();

    // let issueObject = {
    //     test1: '',
    //     test2: ''
    // }

    // onChange(field, value) {
    //     // parent class change handler is always called with field name and value
    //     this.setState({ [field]: value });
    // }

    // initialState = { // add const if functional comp
    //     name: this.props.name,
    //     email: this.props.email
    // };

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



    // [{ username, email}, setState] = useState(initialState);

    clearState = () => {
        this.setState({
            ...this.state,
            description: ''
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

    componentDidUpdate() {
        console.log('component did update :', this.state);
    }

    render() {
        const { classes } = this.props;
        return (
            <form className={classes.container} noValidate autoComplete="off" >
                <div>
                    <TextField
                        disabled
                        id="name"
                        label="Your Name"
                        placeholder="John Doe"
                        className={classes.textField}
                        value={this.props.name}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        disabled
                        id="email"
                        label="Your Email"
                        defaultValue={this.props.email}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        disabled
                        id="type"
                        label="Issue Type"
                        defaultValue="Technical"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleFieldChange.bind(this)}
                    />
                </div>
                <div>
                    <TextField
                        id="description"
                        label="Description"
                        placeholder="What is your issue?"
                        className={classes.textField}
                        value={this.state.description}
                        helperText="Required"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleFieldChange.bind(this)}
                    />
                    <TextField
                        id="comment"
                        label="Comment"
                        placeholder="Any thoughts?"
                        className={classes.textField}
                        // helperText="Required"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleFieldChange.bind(this)}
                    />

                    {/* <TextField
                        required
                        id="standard-password-input"
                        label="Password"
                        className={classes.textField}
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        variant="outlined"
                    /> */}
                    <TextField
                        id="standard-number"
                        label="Number"
                        type="number"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                        variant="outlined"
                    />
                    {/* <TextField
                        id="standard-search"
                        label="Search field"
                        type="search"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                    /> */}
                    <TextField
                        id="standard-helperText"
                        label="Helper text"
                        defaultValue="Default Value"
                        className={classes.textField}
                        helperText="Some important text"
                        margin="normal"
                        variant="outlined"
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
                                    console.log('clicked reset while state is', this.state.testArr)
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
                                // this.props.handleSubmitIssue(this.state.testArr) // causes loop SA
                                () => {
                                    console.log('clicked button', this.state.testArr)
                                    this.props.handleSubmitIssue()
                                }
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
