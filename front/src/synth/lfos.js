import React, { Component } from 'react';
import Knob from './knobs';

class LfoModule extends Component {
    // constructor(props){
    //     super(props);
    // }

    render(){
        return (
            <div>
                <Lfo
                    id="lfo1"
                    lfoHandler={this.props.lfoHandler}
                />
                {/* <Lfo
                    id="lfo2"
                    lfoHandler={this.props.lfoHandler}
                />
                <Lfo
                    id="lfo3"
                    lfoHandler={this.props.lfoHandler}
                /> */}
            </div>
        );
    }
}
    
function Lfo(props) {
        /* lfo contains two groups. 
        *    - waveform group : frequency knob and waveform buttons
        *    - routing group : gain knob and routing option buttons
        */
    return (
            <div className="lfo-module">
                <h3>LFO</h3>
                <div className="lfo-wave-group lfo-group ">
                    <div className="lfo-wave-frequency knob-component">
                        <h4>Frequency:</h4>
                        <Knob
                            id={props.id}
                            className="frequency"
                            min={1}
                            max={100}
                            value= {10}
                            onChange={props.lfoHandler}
                        />
                    </div>
                    <div className="lfo-wave-form">
                        <button onClick={() => props.lfoHandler({'id' : props.id, 'type' : 'sine'})}>Sine</button>
                        <button onClick={() => props.lfoHandler({'id' : props.id, 'type' : 'square'})}>Square</button>
                        <button onClick={() => props.lfoHandler({'id' : props.id, 'type' : 'sawtooth'})}>Saw</button>
                        <button onClick={() => props.lfoHandler({'id' : props.id, 'type' : 'triangle'})}>Triangle</button>
                    </div>
                </div>
                <div className="lfo-routing-group lfo-group">
                    {/* <Knob
                        id={props.id}
                        className="gain"
                        min={1}
                        max={100}
                        value= {10}
                        onChange= {props.lfoHandler}
                    /> */}
                    <h4>Routing:</h4>
                    <div className="routing">
                        <button onClick={() => props.lfoHandler({'routing':'pitch'})}>Pitch</button>
                        <button onClick={() => props.lfoHandler({'routing':'cutoff'})}>Cutoff</button>
                        <button onClick={() => props.lfoHandler({'routing':'mix'})}>Mix</button>
                        <button onClick={() => props.lfoHandler({'routing':'volume'})}>Volume</button>
                    </div>
                </div>
            </div>
        );
}


export default LfoModule;