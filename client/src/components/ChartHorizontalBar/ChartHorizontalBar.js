import React, { Component } from 'react';
import { HorizontalBar } from 'react-chartjs-2';

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            // label: 'My First dataset',
            backgroundColor: 'rgba(132,222,2,0.2)',
            borderColor: 'rgba(132,222,2,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(132,222,2,0.4)',
            hoverBorderColor: 'rgba(132,222,2,1)',
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

class ChartHorizontalBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // displayName: 'DoughnutExample',
            data: {
                labels: '',
                datasets: [{
                    data: [],
                    backgroundColor: []
                }]
            }
        }
    }



    // displayName: 'BarExample',
    render() {
        return (
            <div>
                <h2>Horizontal Bar Example</h2>
                <HorizontalBar data={data} />
            </div>
        );
    }

}

export default ChartHorizontalBar;