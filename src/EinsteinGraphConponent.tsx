import React, {Component} from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import './EinsteinGraphComponent.css'

const data = [{ax: 0, at: 0},
    {ax: 1, at: 1},
    {ax: 2, at: 2},
    {ax: 3, at: 3},
    {ax: 4, at: 4}]

const renderLineChart = (
    <LineChart width={800} height={480} data={data}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
         <XAxis dataKey="ax"/>
         <YAxis dataKey="at"/>
         {/* <Tooltip/> */}
         <Legend />
         <Line type="monotone" dataKey="ax" stroke="#82ca9d" />
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
               <h4>Alice and Bob spacetime diagram</h4>
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