import React, { Component } from 'react';


class OscillatorModule extends Component {
    constructor(props){
        super(props);
    }

    /************************************************************************************
    *******************************Oscillator Render Methods******************************
    *************************************************************************************/
    
    render(){
        return(
            <div className="oscillator-module" id={this.props.id}>
                <h3>Oscillator</h3>
                <div className="oscillators-group">
                    <OscillatorRender
                        id={"osc1"}
                        oscHandler={this.props.oscHandler}
                    />

                    <OscillatorRender 
                        id={"osc2"}
                        oscHandler={this.props.oscHandler}
                    />
                    <OscillatorRender 
                        id={"osc3"}
                        oscHandler={this.props.oscHandler}
                    />
                </div>
                <div className="three-mixer">
                </div>
            </div>
            
            
        );
    }
}

function OscillatorRender(props){
    
    return(
        <div className="oscillator" id = {props.id}>
            <div className="detune-control">
                <Knob
                        className="detuneKnob"
                        height={50}
                        width={50}
                        angleOffset={30}
                        angleArc={260}
                        min={1}
                        max={100}
                        displayInput={true}
                        value={props.value}
                        onChange={props.handleChange}
                    />
            </div>
            <div className="Wave-form">
                <button onClick={() => props.setWave(props.id, 'sine')}>Sine</button>
                <button onClick={() => props.setWave(props.id,'square')}>Square</button>
                <button onClick={() => props.setWave(props.id,'sawtooth')}>Saw</button>
                <button onClick={() => props.setWave(props.id,'triangle')}>Triangle</button>
            </div>
        </div>
    );
}

export default OscillatorModule;