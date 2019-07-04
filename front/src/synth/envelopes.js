import React, { Component } from 'react';
import Knob from './knobs';

class EnvelopeModule extends Component{


    render(){

        return (
            <div className="envelope-modules">
                <Envelope
                    id="envelope"
                    envHandler={this.props.envHandler}
                />
                <Envelope
                    id="filterEnvelope"
                    envHandler={this.props.envHandler}
                />
            </div>
        );
    }
}

function Envelope(props){
    /* envelope contains 4 knobs. 
    *    -  : frequency knob and waveform buttons
    *    - routing group : gain knob and routing option buttons
    */

    return (
        <div className="envelope-controls">
            <h3>{(props.id === "envelope") ? 'Envelope' : 'Filter Envelope'}</h3>
            <div className="envelope-knobs">
                <div className="envelope-attack-knob knob-component">
                    <h4>attack:</h4>
                    <Knob
                        id={props.id}
                        className="attack"
                        min={0}
                        max={100}
                        value={10}
                        onChange={props.envHandler}
                        />
                </div>
                <div className="envelope-decay-knob knob-component">
                    <h4>decay:</h4>
                    <Knob
                        id={props.id}
                        className="decay"
                        min={0}
                        max={100}
                        value={10}
                        onChange={props.envHandler}
                        />
                </div>
                <div className="envelope-sustain-knob knob-component">
                    <h4>sustain:</h4>
                    <Knob
                        id={props.id}
                        className="sustain"
                        min={0}
                        max={1}
                        step={0.01}
                        value={0.5}
                        onChange={props.envHandler}
                        />
                </div>
                <div className="envelope-release-knob knob-component">
                    <h4>release:</h4>
                    <Knob
                        id={props.id}
                        className="release"
                        min={0}
                        max={100}
                        value={10}
                        onChange={props.envHandler}
                    />
                </div>
            </div>
        </div>
    );
}


export default EnvelopeModule;