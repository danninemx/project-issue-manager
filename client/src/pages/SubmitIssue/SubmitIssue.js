import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// import Sidebar from '../../components/Sidebar';

const useStyles = makeStyles(theme => ({
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

export default function SubmitIssue() {
    const classes = useStyles();

    return (
        <React.Fragment>
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
        </React.Fragment >
    );
}
