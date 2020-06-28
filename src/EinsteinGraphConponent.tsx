import React, {Component} from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import './EinsteinGraphComponent.css'

const data = [{x: 0, t: 0},
    {x: 1, t: 1},
    {x: 2, t: 2},
    {x: 3, t: 3},
    {x: 4, t: 4}]

const renderLineChart = (
    <LineChart width={800} height={480} data={data}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
         <XAxis dataKey="x"/>
         <YAxis dataKey="t"/>
         {/* <Tooltip/> */}
         <Legend />
         <Line type="monotone" dataKey="x" stroke="#82ca9d" />
         <CartesianGrid />
        </LineChart>
      );

class EinsteinGraphComponent extends React.Component<{}, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            v: 0.89
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: any) {
        this.setState({v: event.target.value});
    }

    handleSubmit(event: any) {
        alert('Update v: ' + this.state.v);
        event.preventDefault();
    }

    render() {
        return (<div className="comptext">
               <h4>Alice and Bob spacetime diagrams</h4>
                <form onSubmit={(event) => {
                        console.log("submiitteed");
                        event.preventDefault();
                    }}>
                    <label>v:
                        <input name="velocity" type="number" value={this.state.v} onChange={this.handleChange}/>
                    </label>
                    <button onClick={this.handleSubmit}>Update</button>
                </form>

                {renderLineChart}
                </div>)
        }
}

export default EinsteinGraphComponent;