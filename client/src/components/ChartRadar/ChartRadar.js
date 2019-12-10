import React, { Component } from 'react';
import { Radar } from 'react-chartjs-2';

class ChartRadar extends Component {

    // React.createClass({
    constructor(props) {
        super(props);
        this.state = {
            // displayName: 'DoughnutExample',
            data: {
                labels: '',
                datasets: [{}]
            }
        }
    }

    componentDidMount() {
        console.log('chart received props:', this.props)
        this.setState({
            ...this.state,
            data: {
                labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
                datasets: [
                    {
                        label: 'Total Open',
                        backgroundColor: 'rgba(179,181,198,0.2)',
                        borderColor: 'rgba(179,181,198,1)',
                        pointBackgroundColor: 'rgba(179,181,198,1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(179,181,198,1)',
                        data: [65, 59, 90, 81, 56, 55, 40]
                    },
                    {
                        label: 'Unexamined',
                        backgroundColor: 'rgba(255,99,132,0.2)',
                        borderColor: 'rgba(255,99,132,1)',
                        pointBackgroundColor: 'rgba(255,99,132,1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(255,99,132,1)',
                        data: [28, 48, 40, 19, 96, 27, 100]
                    }
                ]

            }
        })
    }

    componentDidUpdate() {

    }

    render() {
        return (
            <div>
                <Radar data={this.state.data} />
            </div>
        );
    }
};

export default ChartRadar;