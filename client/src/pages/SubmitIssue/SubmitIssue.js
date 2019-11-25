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

class SubmitIssue extends Component {
    // function SubmitIssue(props) {

    constructor(props) {
        super(props);
        // State updater function to be passed down into the context provider per https://reactjs.org/docs/context.html
        this.state = {
            // name: this.props.name,
            // email: this.props.email,
            // type: 'Technical'
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

    clearState = () => {
        this.setState({
            ...this.state,
            // required
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

    componentDidUpdate() {
        console.log('component did update :', this.state);
    }

    render() {
        const { classes } = this.props;
        return (
            <form className={classes.container} noValidate autoComplete="off" >
                <div>
                    <Typography variant='body2'>Asterisk(*) denotes required fields.</Typography>
                    <br></br>
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
                    <TextField
                        id="organization"
                        required
                        label="Provider"
                        value={this.state.organization}
                        className={classes.textField}
                        InputLabelProps={{ // Prevent label from appearing as placeholder
                            shrink: true,
                        }}
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleFieldChange.bind(this)}
                    />
                    <TextField
                        id="project"
                        required
                        label="Project"
                        // placeholder="Who is the provider?"
                        value={this.state.project}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleFieldChange.bind(this)}
                    />
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
                        label="Issue Description"
                        value={this.state.description}
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
                        id="comment"
                        label="Comment"
                        placeholder="Any thoughts?"
                        value={this.state.comment}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleFieldChange.bind(this)}
                    />
                    {/* <TextField
                        id="standard-number"
                        label="Number"
                        type="number"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                        variant="outlined"
                    /> */}
                    {/* <TextField
                        id="standard-search"
                        label="Search field"
                        type="search"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                    /> */}
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
                                /*
                                // this.props.handleSubmitIssue(this.state.testArr) // causes loop SA
                                () => {
                                    console.log('clicked button', this.state)

                                    const keys = [
                                        "type",
                                        "organization",
                                        "project",
                                        "subject",
                                        "description",
                                        "comment",
                                        "owner",

                                        // optional in this version
                                        "url",
                                        "status",
                                        "resolved",
                                        "priority",
                                        "targetResolutionDate",
                                        "potentialImpact",
                                        "image",
                                        "partImpacted"
                                    ]

                                    // Loop through keys and get values
                                    // let values = keys.map(
                                        // (key) => {
                                    for (let key of keys) {
                                        // this.props.handleSubmitIssue(key, this.state[key]) // works

                                    }
                                        // }
                                        // console.log(this.state[key]) // works
                                    // )

                                    // this.props.handleSubmitIssue(values)


                                }
                                */
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
