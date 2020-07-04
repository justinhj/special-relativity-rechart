import React, {Component} from 'react';
import { ScatterChart, Line, Scatter, CartesianGrid, XAxis, YAxis, Polygon, Tooltip, Legend } from 'recharts';
import './EinsteinGraphComponent.css'
import ReactSlider from 'react-slider'

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
    {x: 1, t: 1},
    {x: 2, t: 2},
    {x: 3, t: 3},
    {x: 4, t: 4}];

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

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    renderLineChart() {
        return <ScatterChart width={800} height={480} data={this.state.data}
                  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
             <XAxis type='number' dataKey="x" interval={0} xAxisId="0" domain={[-4.0, 4.0]}/>
             <YAxis interval={0} dataKey="y" domain={[0.0,4.0]}/>
             <CartesianGrid />
             <Scatter name="Alice" data={this.state.alicesPoints} fill="#00ff00" line shape='circle'/>
             <Scatter name="Bob" data={this.state.bobsPoints} fill="#0000ff" line shape='circle'/>
            </ScatterChart>
    };

    handleSubmit(value: number | number[] | undefined | null) {

        const newV : number = value as number;

        this.setState({v: newV, gamma: lorentzFactor(newV)});

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
    }

    render() {
        return (<div className="EinsteinChart">
               <h4>Alice and Bob spacetime diagram</h4>
                    <ReactSlider
                        className="horizontal-slider"
                        thumbClassName="thumb"
                        trackClassName="track"
                        min={0.0}
                        max={1.0}
                        step={0.0001}
                        onChange={this.handleSubmit}
                        renderThumb={(props, state) => <div {...props}>{state.value}</div>}
                    />
                <div>
                    Lorentz Factor (γ): {this.state.gamma}
                </div>
                <div>
                {this.renderLineChart()}
                </div>
                </div>
            )

        }
}

export default EinsteinGraphComponent;