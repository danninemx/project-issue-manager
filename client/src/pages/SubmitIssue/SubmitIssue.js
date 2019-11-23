// React
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// Material UI
import {
    makeStyles,
    // useStyles, // Stateful Components cannot use Hooks such as useStyles.
    withStyles
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';

// Components
// import Sidebar from '../../components/Sidebar';

const styles = makeStyles(theme => ({
    // const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',

        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,

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
}));

class SubmitIssue extends Component {
    state = {};

    render() {
        const classes = styles;

        return (
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth='lg'>
                    {/* <Sidebar /> */}
                    <div className={classes.content}>
                        <TextField
                            id="standard-full-width"
                            label="Label"
                            style={{ margin: 8 }}
                            placeholder="Placeholder"
                            helperText="Full width!"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            label="None"
                            id="margin-none"
                            defaultValue="Default Value"
                            className={classes.textField}
                            helperText="Some important text"
                        />
                        <TextField
                            label="Dense"
                            id="margin-dense"
                            defaultValue="Default Value"
                            className={classes.textField}
                            helperText="Some important text"
                            margin="dense"
                        />
                        <TextField
                            label="Normal"
                            id="margin-normal"
                            defaultValue="Default Value"
                            className={classes.textField}
                            helperText="Some important text"
                            margin="normal"
                        />
                    </div>
                </Container >
            </React.Fragment>
        );
    }
}

export default withRouter(withStyles(styles, { withTheme: true })(SubmitIssue))
