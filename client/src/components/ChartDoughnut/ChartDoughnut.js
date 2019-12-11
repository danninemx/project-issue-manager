import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';

class ChartDoughnut extends Component {

    // React.createClass({
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

    componentDidMount() {
        // console.log('chart received props:', this.props)
        this.setState({
            ...this.state,
            data: {
                labels: this.props.orgNames,
                datasets: [{
                    data: this.props.projCountByOrg,
                    // [300, 50, 100, 100, 100, 100, 100],
                    backgroundColor:
                        [
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56',
                            'orange',
                            'limegreen',
                            'navy',

                            'purple',
                            'red',
                            'blue',
                            'white',
                            'grey',

                            'black',
                            'azure'
                        ]
                    // this.props.backgroundColor
                    ,
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        'orange',
                        'limegreen',
                        'navy',

                        'purple',
                        'red',
                        'blue',
                        'white',
                        'grey',

                        'black',
                        'azure'
                    ]
                }]
            }
        })
    }

    componentDidUpdate() {

    }

    render() {
        return (
            <div>
                <Doughnut data={this.state.data} />
            </div>
        );
    }
};

export default ChartDoughnut;