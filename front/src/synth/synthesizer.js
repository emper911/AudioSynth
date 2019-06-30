import React, { Component } from 'react';
import OscillatorModule from './synth/synthesizer.js/index.js';
import './App.css';




class Synthesizer extends Component{
    //Synthesizer class will hold all synth modules together


    //Synth Component Handlers
    oscHandler(){

    }

    envHandler(){

    }

    filterHandler(){

    }

    lfoHandler(){

    }

    masterHandler(){

    }

    shouldComponentUpdate(){
        return false;
    }

    getDerivedStateFromProps(nextProps){
        
        this.HPfilter.frequency = nextProps.HPfilterFreq;
    }


    componentDidMount(){
        // this.monoSynth = new window.Tone.MonoSynth({
        //     "oscillator": {
        //         "type": "sawtooth"
        //     },
        //     "envelope": {
        //         "attack" : 0.2,
        //         "releasse": 1.0
        //     }
        // });
        this.osc1 = new window.Tone.OmniOscillator(440, "sine")
        this.osc2 = new window.Tone.OmniOscillator(440, "square")
        this.osc3 = new window.Tone.OmniOscillator(440, "sawtooth")

        this.AmpEnv = new Tone.AmplitudeEnvelope();
        this.HPfilter = new window.Tone.Filter(500, "highpass");
        this.LPfilter = new window.Tone.Filter(700, "lowpass");

        this.monoSynth.connect(this.HPfilter);
        this.HPfilter.connect(this.LPfilter);
        this.LPfilter.toMaster();
        
        // var osc1 = new window.Tone.Oscilllator(440, "sine").tomaster().start();
    }
    buttonTrigger(note, length){
        this.monoSynth.triggerAttackRelease(note, "16n");
    }
    render() {
        return (
            <div className="monosynth" ref="polysynth" id="poly">
                <oscillatorModule
                    oscHandler={this.oscHandler}
                />
                <EnvelopeModule
                    envHandler={this.envHandler}
                />
                <filterModule
                    filterHandler={this.filterHandler}
                />
                <lfoModule
                    lfoHandler={this.lfoHandler}
                />
                <masterModule
                    masterHandler={this.masterHandler}
                />
                
                {/* <button onClick={() => this.buttonTrigger("C3", "16n")}>C</button>
                <button onClick={() => this.buttonTrigger("D3", "16n")}>D</button>
                <button onClick={() => this.buttonTrigger("E3", "16n")}>E</button>
                <button onClick={() => this.buttonTrigger("F3", "16n")}>F</button>
                <button onClick={() => this.buttonTrigger("G3", "16n")}>G</button>
                <button onClick={() => this.buttonTrigger("A3", "16n")}>A</button>
                <button onClick={() => this.buttonTrigger("B3", "16n")}>B</button>
                <button onClick={() => this.buttonTrigger("C4", "16n")}>C</button> */}
            </div>

        );
    }
}


export default Synthesizer;
// export default synth;

