import 'date-fns';
import React, {
    // useState,
    useEffect
} from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

export default function DateTimePicker(props) {
    const [selectedDate, setSelectedDate] = React.useState(props.selectedDate);
    const { handleDateChange } = props;

    useEffect(() => {
        console.log(' Picker received props', props);
        handleDateChange(selectedDate);
    }, [selectedDate, handleDateChange])

    const handleChange = date => {
        setSelectedDate(date);
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
                <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date of Discovery"
                    format="MM/dd/yyyy"
                    value={selectedDate}
                    onChange={
                        handleChange
                    }
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    showTodayButton
                    InputLabelProps={{ // Prevent label from appearing as placeholder
                        shrink: true,
                    }}
                />
                <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Time of Discovery"
                    value={selectedDate}
                    onChange={
                        handleChange
                    }
                    KeyboardButtonProps={{
                        'aria-label': 'change time',
                    }}
                    // showTodayButton
                    InputLabelProps={{ // Prevent label from appearing as placeholder
                        shrink: true,
                    }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    );
}