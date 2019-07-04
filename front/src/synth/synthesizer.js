import React, { Component } from 'react';
import Tone from 'tone';

//Custom React Components
import MidiController from '../midicontroller';

import OscillatorModule from './oscillators';
import EnvelopeModule from './envelopes';
import FilterModule from './filters';
import LfoModule from './lfos';
import MasterModule from './master';


class Synthesizer extends Component{
    //Synthesizer class will hold all synth modules together
    constructor(props){
        super(props);
        //synth related mapping
        this.oscHandler = this.oscHandler.bind(this);
        this.envHandler = this.envHandler.bind(this);
        this.filterHandler = this.filterHandler.bind(this);
        this.lfoHandler = this.lfoHandler.bind(this);
        this.masterHandler = this.masterHandler.bind(this);
        //midi input related
        this.MidiHandler = this.MidiHandler.bind(this);
    }

    //Synth Component Handlers
    oscHandler(update){
        let oscParam = {};
        oscParam["oscillator"] = {};
        oscParam["oscillator"][update.param] = update.value;
        this.PolySynth.set(oscParam);
    }

    envHandler(update){
        let envParam = {};
        envParam[update.id] = {} //envelope type filter or amp
        envParam[update.id][update.param] = update.value; //class = attack, decay, etc.
        this.PolySynth.set(envParam);
    }

    filterHandler(update){
        let filterParam = {};
        filterParam["filter"] = {};
        filterParam["filter"][update.param] = update.value; //class="filterattribute"
        this.PolySynth.set(filterParam); 
    }

    lfoHandler(update){
        console.log(update);
    }

    masterHandler(update){
        this.PolySynth.set("volume", update.value);
        console.log(this.PolySynth.get("oscillator.frequency").oscillator.frequency);
    }

    //
    shouldComponentUpdate(){
        return false;
    }
    

    componentDidMount(){
        this.PolySynth = new Tone.PolySynth(6, Tone.MonoSynth);
        this.PolySynth.set({
            "frequency"  : 440,
            "detune"  : 0 ,
            "oscillator"  : {
                "type"  : "sawtooth"
            },
            "filter" : {
                "Q"  : 6 ,
                "type"  : "lowpass" ,
                "rolloff"  : -24
            } ,

            "envelope": {
                "attack" : 0.2,
                "releasse": 1.0
            },
            "filterEnvelope": {
                "attack"  : 0.06 ,
                "decay"  : 0.2 ,
                "sustain"  : 0.5 ,
                "release" : 2 ,
                "baseFrequency" : 200 ,
                "octaves" : 7,
                "exponent" : 2
            }
        });
        this.lfo1 = new Tone.LFO("4n", 400, 4000);
        // this.lfo1.connect(this.PolySynth.detune);
        

        // this.AmpEnv = new Tone.AmplitudeEnvelope();
        // this.filterEnv = new Tone.;

         // this.LFO = new Tone.;

        this.HPfilter = new Tone.Filter(500, "highpass");
        this.LPfilter = new Tone.Filter(700, "lowpass");

        this.PolySynth.connect(this.HPfilter);
        this.HPfilter.connect(this.LPfilter);
        this.LPfilter.toMaster();

    }

    componentWillUnmount(){
        this.PolySynth.disconnect();
    }
    //midi handling
    MidiHandler(data){
        if (data.status === "on"){
            this.PolySynth.triggerAttack(data.note);
        }
        else if (data.status === "off"){
            this.PolySynth.triggerRelease(data.note);
        }
    }


    buttonTrigger(note, length){
        this.PolySynth.triggerAttackRelease(note, "16n");
    }


    render() {
        return (
            <div className="monosynth" ref="polysynth" id="poly">
                <OscillatorModule
                    oscHandler={this.oscHandler}
                />
                <EnvelopeModule
                    envHandler={this.envHandler}
                />
                <FilterModule
                    filterHandler={this.filterHandler}
                />
                <LfoModule
                    lfoHandler={this.lfoHandler}
                />
                <MasterModule
                    masterHandler={this.masterHandler}
                />
                
                <button onClick={() => this.buttonTrigger("C3", "16n")}>C</button>
                <button onClick={() => this.buttonTrigger("D3", "16n")}>D</button>
                <button onClick={() => this.buttonTrigger("E3", "16n")}>E</button>
                <button onClick={() => this.buttonTrigger("F3", "16n")}>F</button>
                <button onClick={() => this.buttonTrigger("G3", "16n")}>G</button>
                <button onClick={() => this.buttonTrigger("A3", "16n")}>A</button>
                <button onClick={() => this.buttonTrigger("B3", "16n")}>B</button>
                <button onClick={() => this.buttonTrigger("C4", "16n")}>C</button>

                <MidiController
                    MidiOutput={this.MidiHandler}
                />
            </div>

        );
    }
}


export default Synthesizer;
// export default synth;

