import React, { Component } from 'react';
import Knob from './knobs';

class LfoModule extends Component {
    // constructor(props){
    //     super(props);
    // }

    render(){
        return (
            <div className="lfo-module module">
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
            <div className="lfo-group">
                <h3>LFO</h3>
                <div className="lfo-controls">
                    <div className="lfo-frequency">
                        <h4>Frequency:</h4>
                        <Knob
                            id={props.id}
                            className="frequency"
                            min={50}
                            max={10000}
                            value= {200}
                            step={0.1}
                            onChange={props.lfoHandler}
                        />
                    </div>

                    <div className="lfo-intensity">
                        <h4>Intensity:</h4>
                        <Knob
                            id={props.id}
                            className="amplitude"
                            min={-100}
                            max={100}
                            value={0}
                            step={0.01}
                            onChange={props.lfoHandler}
                        />
                    </div>

                    <div className="lfo-wavetype">
                        <h4>wave-type:</h4>
                        <div className="lfo-wavetype-buttons">
                            <button onClick={() => props.lfoHandler({ 'id' : props.id, 'param': 'type', 'value' : 'sine'})}>Sin</button>
                            <button onClick={() => props.lfoHandler({ 'id' : props.id, 'param': 'type', 'value' : 'square'})}>Sqr</button>
                            <button onClick={() => props.lfoHandler({ 'id' : props.id, 'param': 'type', 'value' : 'sawtooth'})}>Saw</button>
                            <button onClick={() => props.lfoHandler({ 'id' : props.id, 'param': 'type', 'value' : 'triangle'})}>Tri</button>
                        </div>
                    </div>

                    <div className="lfo-routing"> 
                        <h4>Routing:</h4>
                        <div className="routing">
                        <button onClick={() => props.lfoHandler({ 'id': props.id, 'param': 'routing', 'value':'pitch'})}>Ptch</button>
                        <button onClick={() => props.lfoHandler({ 'id': props.id, 'param': 'routing', 'value':'cutoff'})}>Cut</button>
                        {/* <button onClick={() => props.lfoHandler({ 'id': props.id, 'param': 'routing', 'value':'volume'})}>Vol</button> */}
                        {/* <button onClick={() => props.lfoHandler({ 'id': props.id, 'param': 'routing', 'value':'mix'})}>Mix</button> */}
                        </div>
                    </div>

                </div>
            </div>
        );
}


export default LfoModule;