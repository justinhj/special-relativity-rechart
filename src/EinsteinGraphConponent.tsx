import React, {Component} from 'react';
import { ScatterChart, Line, Scatter, CartesianGrid, XAxis, YAxis, Polygon, Tooltip, Legend } from 'recharts';
import './EinsteinGraphComponent.css'

// A position in one-dimensional space and time
type Pos = {
    x: number,
    t: number
}

// Alice and Bob position
type PairPos = {
    alice: Pos,
    bob: Pos
}

const initialData: Pos [] = [
    {x: 0, t: 0},
    {x: 1, t: 2},
    {x: 2, t: 4},
    {x: 3, t: 6},
    {x: 4, t: 8}];

// Units are light years so c = 1.0

const c = 1.0

function lorentzFactor(v: number) {
    return 1.0 / (Math.sqrt((1 - (v*v) / (c*c))));
}

function xb(xa: number, ta: number, v: number, gamma: number) {
    return gamma * (xa - (-v * ta));
}

function tb(xa: number, ta: number, v: number, gamma: number) {
    return gamma * (ta - ((v/(c*c)) * xa));
}

class EinsteinGraphComponent extends React.Component<{}, any> {
    constructor(props: any) {
        super(props);

        const data: PairPos [] = initialData.map(
            (value,index,array) =>
                ({alice: value, bob: value})
        );

        const bobsPoints: Pos [] = [];
        const alicesPoints: Pos [] = [];

        this.state = {
            v: 0.89,
            data: data,
            gamma: 1.0,
            alicesPoints: alicesPoints,
            bobsPoints: bobsPoints,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    renderLineChart() {
        return <ScatterChart width={800} height={480} data={this.state.data}
                  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
             <XAxis type='number' dataKey="x" interval={0} xAxisId="0" domain={[-4.0, 4.0]}/>
             {/* <XAxis type='number' dataKey="bob.x" interval={0} xAxisId="1"/> */}
             <YAxis interval={0} dataKey="y" domain={[0.0,8.0]}/>
             {/* <Legend verticalAlign="bottom" height={36}/> */}
             {/* <Line dataKey="alice.t" stroke="#00ff00" xAxisId="0"/> */}
             {/* <Line type="monotone" dataKey="bob.t" stroke="#ffffff" xAxisId="0"/> */}
             {/* <Tooltip /> */}
             <CartesianGrid />
             <Scatter name="Alice" data={this.state.alicesPoints} fill="#00ff00" line shape='circle'/>
             <Scatter name="Bob" data={this.state.bobsPoints} fill="#0000ff" line shape='circle'/>
            </ScatterChart>
    };

    handleChange(event: any) {
        const v = event.target.value;

        this.setState({v: v, gamma: lorentzFactor(v)});
    }

    handleSubmit(event: any) {

        const newData: PairPos [] = this.state.data.slice().map(
            (pairPos: any) => {
                const out = {alice: pairPos.alice, bob: {
                        x: xb(pairPos.alice.x, pairPos.alice.t, this.state.v, this.state.gamma),
                        t: tb(pairPos.alice.x, pairPos.alice.t, this.state.v, this.state.gamma),
                        }
                    };
                    console.log(JSON.stringify(out));
                    return out;
            }
        );

        const newBobsPoints: Pos [] = this.state.data.slice().map(
            (pairPos: any) => {
                return  {x: xb(pairPos.alice.x, pairPos.alice.t, this.state.v, this.state.gamma),
                         y: tb(pairPos.alice.x, pairPos.alice.t, this.state.v, this.state.gamma)};
            });
        console.log(JSON.stringify(newBobsPoints));

        const newAlicesPoints: Pos [] = this.state.data.slice().map(
            (pairPos: any) => {
                return  {x: pairPos.alice.x,
                         y: pairPos.alice.t};
            });
        console.log(JSON.stringify(newAlicesPoints));

        this.setState({data: newData, bobsPoints: newBobsPoints, alicesPoints: newAlicesPoints});
        event.preventDefault();
    }

    render() {
        return (<div className="EinsteinChart">
               <h4>Alice and Bob spacetime diagram</h4>
                <form onSubmit={(event) => {
                        console.log("submitted");
                        event.preventDefault();
                    }}>
                    <label>Relative velocity between Alice and Bob in light years per year (c):
                        <input name="velocity" type="number" value={this.state.v} onChange={this.handleChange}/>
                    </label>
                    <button onClick={this.handleSubmit}>Update</button>
                </form>
                <div>
                    Lorentz Factor (γ): {this.state.gamma}
                </div>
                {this.renderLineChart()}
                </div>)
        }
}

export default EinsteinGraphComponent;