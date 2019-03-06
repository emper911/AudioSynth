import React, { Component } from 'react';
// import Knob from '../knob';
import Knob from './Knob1';

class SynthesizerRender extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="synthesizer">
                <OscillatorModuleRender
                    oscHandler={this.props.oscHandler}
                    handleChange={this.props.handleChange}
                    value={this.props.value}
                    patch={this.props.patch.oscMod}
                />
                <EnvelopeModuleRender
                    envelopeHandler={this.props.envelopeHandler}
                    handleChange={this.props.handleChange}
                    value={this.props.value}
                    patch={this.props.patch.envMod}
                />
                <FilterModuleRender 
                    filterHandler={this.props.filterHandler}
                />
                <LfoModuleRender 
                    lfoHandler={this.props.lfoHandler}
                    handleChange={this.props.handleChange}
                    value={this.props.value}
                />
                <LofiModuleRender 
                    lofiHandler={this.props.lofiHandler}
                    handleChange={this.props.handleChange}
                    value={this.props.value}
                />
                <GlobalModuleRender 
                    globalHandler={this.globalHandler}
                    handleChange={this.props.handleChange}
                    value={this.props.value}
                />
                <WaveVisualizerModuleRender 
                    visualizerHandler={this.props.visualizerHandler}
                />
                <KeyboardModuleRender
                    
                />

            </div>
        );
    }
}

class OscillatorModuleRender extends Component {
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
                        oscType={this.props.oscType1}
                        onClick={this.props.setWave}
                        onChange={this.props.handleChange}
                        value={this.props.value}
                    />

                    <OscillatorRender 
                        id={"osc2"}
                        oscType={this.props.oscType2}
                        onClick={this.props.setWave}
                        onChange={this.props.handleChange}
                        value={this.props.value}
                    />
                    <OscillatorRender 
                        id={"osc3"}
                        oscType={this.props.oscType3}
                        onClick={this.props.setWave}
                        handleChange={this.props.handleChange}
                        value={this.props.value}
                    />
                </div>
                <div className="voices">
                    <button onClick={this.props.setMonoPoly}>POLY/MONO</button>
                    <button onClick={() => this.props.oscHandler.setVoice(4)}>4</button>
                    <button onClick={() => this.props.oscHandler.setVoice(8)}>8</button>
                    <button onClick={() => this.props.oscHandler.setVoice(16)}>16</button>
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

class WaveVisualizerModuleRender extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="wave-visualizer-module">
                <div className="visualizer"></div>
            </div>
        );
    }
}

class EnvelopeModuleRender extends Component {
    /* envelope contains 4 knobs. 
    *    -  : frequency knob and waveform buttons
    *    - routing group : gain knob and routing option buttons
    */
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="envelope-module">
                <h3>Envelope</h3>
                <div className="envelope-headings">
                    <h4>attack</h4>
                    <h4>decay</h4>
                    <h4>sustain</h4>
                    <h4>release</h4>
                </div>
                <div className="envelope-knobs">
                    <Knob
                        className="attackKnob"
                        height={50}
                        width={50}
                        angleOffset={30}
                        angleArc={260}
                        min={1}
                        max={100}
                        displayInput={true}
                        value={this.props.value}
                        onChange={this.props.handleChange}
                    />
                    <Knob
                        className="decayKnob"
                        height={50}
                        width={50}
                        angleOffset={30}
                        angleArc={260}
                        min={1}
                        max={100}
                        displayInput={true}
                        value={this.props.value}
                        onChange={this.props.handleChange}
                    />
                    <Knob
                        className="sustainKnob"
                        height={50}
                        width={50}
                        angleOffset={30}
                        angleArc={260}
                        min={1}
                        max={100}
                        displayInput={true}
                        value={this.props.value}
                        onChange={this.props.handleChange}
                    />
                    <Knob
                        className="releaseKnob"
                        height={50}
                        width={50}
                        angleOffset={30}
                        angleArc={260}
                        min={1}
                        max={100}
                        displayInput={true}
                        value={this.props.value}
                        onChange={this.props.handleChange}
                    />
                </div>
            </div>
        );
    }
}

class LfoModuleRender extends Component {
    /* lfo contains two groups. 
    *    - waveform group : frequency knob and waveform buttons
    *    - routing group : gain knob and routing option buttons
    */
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="lfo-module">
                <h3>LFO</h3>
                <div className="lfo-wave-group lfo-group">
                    <Knob
                        className="lfo-freq-knob"
                        height={50}
                        width={50}
                        angleOffset={30}
                        angleArc={260}
                        min={1}
                        max={100}
                        displayInput={true}
                        value={this.props.value}
                        onChange={this.props.handleChange}
                    />
                    <div className="lfo-wave-form">
                        <button onClick={() => this.props.setWave(this.props.id, 'sine')}>Sine</button>
                        <button onClick={() => this.props.setWave(this.props.id,'square')}>Square</button>
                        <button onClick={() => this.props.setWave(this.props.id,'sawtooth')}>Saw</button>
                        <button onClick={() => this.props.setWave(this.props.id,'triangle')}>Triangle</button>
                    </div>
                </div>
                <div className="lfo-routing-group lfo-group">
                    <Knob
                        className="lfo-gain-knob"
                        height={50}
                        width={50}
                        angleOffset={30}
                        angleArc={260}
                        min={1}
                        max={100}
                        displayInput={true}
                        value={this.props.value}
                        onChange={this.props.handleChange}
                    />
                    <div className="routing">
                        <button onClick={() => this.props.routing('pitch')}>Pitch</button>
                        <button onClick={() => this.props.routing('cutoff')}>Cutoff</button>
                        <button onClick={() => this.props.setWave('mix')}>Mix</button>
                        <button onClick={() => this.props.setWave('volume')}>Volume</button>
                    </div>
                </div>
            </div>
        );
    }
}

class FilterModuleRender extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="filter-module">
                <div className="freqKnob"></div>
                <div className="gainKnob"></div>
                <div className="qvalue"></div>
                <div className="bandType"></div>
            </div>
        );
    }
}




class LofiModuleRender extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="lofi-module">
                <h3 className="lofi-heading">LOFI-IFICATION</h3>
                <button className="lofi-power">POWER</button>
            </div>
        );
    }
}

class GlobalModuleRender extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="global-module">
                <div className="global-heading">
                    <h3>Volume</h3>
                </div>
                <div className="global-knobs">
                    <Knob
                        className="global-volume-knob"
                        height={50}
                        width={50}
                        angleOffset={30}
                        angleArc={260}
                        min={1}
                        max={100}
                        displayInput={true}
                        value={this.props.value}
                        onChange={this.props.handleChange}
                    />
                </div>
            </div>
        );
    }
}

class KeyboardModuleRender extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="keyboard-module">
                <div className="keyboard-heading">
                    <h3>Keyboard</h3>
                </div>
                <div className="keyboard-keys">
                    <div className="keyboard-black-keys">
                        {/* <div className="keyboard-black-keys-0">
                            <button className="cS-2"></button>
                            <button className="dS-2"></button>
                            <button className="fS-2"></button>
                            <button className="gS-2"></button>
                            <button className="aS-2"></button>
                        </div>

                        <div className="keyboard-black-keys-1">
                            <button className="cS-1"></button>
                            <button className="dS-1"></button>
                            <button className="fS-1"></button>
                            <button className="gS-1"></button>
                            <button className="aS-1"></button>
                        </div> */}


                            <button className="cS0"></button>
                            <button className="dS0"></button>
                            <button className="fS0"></button>
                            <button className="gS0"></button>
                            <button className="aS0"></button>

                            <button className="cS1"></button>
                            <button className="dS1"></button>
                            <button className="fS1"></button>
                            <button className="gS1"></button>
                            <button className="aS1"></button>

                        {/* <div className="keyboard-black-keys-4">
                            <button className="cS2"></button>
                            <button className="dS2"></button>
                            <button className="fS2"></button>
                            <button className="gS2"></button>
                            <button className="aS2"></button>
                        </div>

                        <div className="keyboard-black-keys-5">
                            <button className="cS3"></button>
                            <button className="dS3"></button>
                            <button className="fS3"></button>
                            <button className="gS3"></button>
                            <button className="aS3"></button>
                        </div> */}

                    </div>
                    <div className="keyboard-white-keys">
                        {/* <div className="keyboard-white-keys-0">
                            <button className="c-2"></button>
                            <button className="d-2"></button>
                            <button className="e-2"></button>
                            <button className="f-2"></button>
                            <button className="g-2"></button>
                            <button className="a-2"></button>
                            <button className="b-2"></button>
                            <button className="c-1"></button>
                        </div>
                        
                        <div className="keyboard-white-keys-1">
                            <button className="d-1"></button>
                            <button className="e-1"></button>
                            <button className="f-1"></button>
                            <button className="g-1"></button>
                            <button className="a-1"></button>
                            <button className="b-1"></button>
                        </div> */}

                            <button className="c0"></button>
                            <button className="d0"></button>
                            <button className="e0"></button>
                            <button className="f0"></button>
                            <button className="g0"></button>
                            <button className="a0"></button>
                            <button className="b0"></button>
                        
                            <button className="c1"></button>
                            <button className="d1"></button>
                            <button className="e1"></button>
                            <button className="f1"></button>
                            <button className="g1"></button>
                            <button className="a1"></button>
                            <button className="b1"></button>
                            <button className="c2"></button>


                        {/* <div className="keyboard-white-keys-4">
                            <button className="d2"></button>
                            <button className="e2"></button>
                            <button className="f2"></button>
                            <button className="g2"></button>
                            <button className="a2"></button>
                            <button className="b2"></button>
                            <button className="c3"></button>
                        </div>
                    
                        <div className="keyboard-white-keys-5">
                            <button className="d3"></button>
                            <button className="e3"></button>
                            <button className="f3"></button>
                            <button className="g3"></button>
                            <button className="a3"></button>
                            <button className="b3"></button>
                            <button className="c4"></button>
                        </div> */}

                </div>
                    </div>
                <div className="keyboard-modulation">
                    <button className="mod-button">mod</button>
                    <button className="pitch-up">up</button>
                    <button className="pitch-down">down</button>
                </div>
            </div>
        );
    }
}

export default SynthesizerRender;