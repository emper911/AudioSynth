import React, { Component } from 'react';
import Knob from './knobs';


class OscillatorModule extends Component {
    // constructor(props){
    //     super(props);
    // }

    /************************************************************************************
    *******************************Oscillator Render Methods******************************
    *************************************************************************************/
    
    render(){
        return(
            <div className="oscillator-module module" id={this.props.id}>
                <h3>Oscillator</h3>
                <div className="oscillator-group">
                    <OscillatorRender
                        id={"osc1"}
                        oscHandler={this.props.oscHandler}
                    />

                    {/* <OscillatorRender 
                        id={"osc2"}
                        oscHandler={this.props.oscHandler}
                    />
                    <OscillatorRender 
                        id={"osc3"}
                        oscHandler={this.props.oscHandler}
                    /> */}
                </div>
                <div className="three-mixer">
                </div>
            </div>
            
            
        );
    }
}

function OscillatorRender(props){

    return(
        <div className="oscillator-controls" id = {props.id}>
            <div className="oscillator-detune knob-component">
                <h4>Detune:</h4>
                <Knob
                        id={props.id}
                        className="detune"
                        min={-100}
                        max={100}
                        value={0}
                        onChange={props.oscHandler}
                    />
            </div>
            <div className="oscillator-waveform">
                <h4>Wave:</h4>
                <div className="oscillator-waveform-buttons"> 
                    <button onClick={() => props.oscHandler({'id' : props.id, 'param':'type', 'value': 'sine'})}>Sin</button>
                    <button onClick={() => props.oscHandler({'id' : props.id, 'param':'type', 'value': 'square'})}>Sqre</button>
                    <button onClick={() => props.oscHandler({'id' : props.id, 'param':'type', 'value': 'sawtooth'})}>Saw</button>
                    <button onClick={() => props.oscHandler({'id' : props.id, 'param':'type', 'value': 'triangle'})}>Tri</button>
                </div>
            </div>
        </div>
    );
}

export default OscillatorModule;