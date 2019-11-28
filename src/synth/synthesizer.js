import React, { Component } from 'react';
import Tone from 'tone';
import AudioVisualizer from '../visualizer/audiovisualizer';

//Custom React Components
import MidiController from './midicontroller';

import OscillatorModule from './oscillators';
import EnvelopeModule from './envelopes';
import FilterModule from './filters';
import LfoModule from './lfos';
import MasterModule from './master';

const map = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;

class Synthesizer extends Component{
    //Synthesizer class will hold all synth modules together
    constructor(props){
        super(props);
        //synth parameter handler
        this.oscHandler = this.oscHandler.bind(this);
        this.envHandler = this.envHandler.bind(this);
        this.filterHandler = this.filterHandler.bind(this);
        this.lfoHandler = this.lfoHandler.bind(this);
        this.masterHandler = this.masterHandler.bind(this);
        //Input handlers
        this.MidiHandler = this.MidiHandler.bind(this);
        this.musicalTypingTrigger = this.musicalTypingTrigger.bind(this);
        //TODO - output handler for sound visualization

    }


/*******************************************************************************************
**********************************Component/Synth Initialization****************************
********************************************************************************************/

    //This component does not update on a parent state change
    shouldComponentUpdate() {
        return false;
    }
    //After the react render, the component instantiates the polysynth
    componentDidMount() {
        this.octave = 1;
        document.addEventListener("keydown", this.musicalTypingTrigger, false);
        document.addEventListener("keyup", this.musicalTypingTrigger, false);
        //instantiating the polysynth
        this.initPolySynth();
    }
    componentWillUnmount() {
        this.PolySynth.disconnect();
    }

/*****************************Polysynth Initialization**********************************/
    initPolySynth() {
        /********************Declaring the tone.js modules*********************/
        this.PolySynth = new Tone.PolySynth(12, Tone.MonoSynth);
        //sets default parameters at the start of the webpage.
        this.PolySynth.set({
            "volume": -25,
            "frequency": 440,
            "detune": 0,
            "oscillator": {
                "type": "sawtooth"
            },
            "filter": {
                "Q": 0.3,
                "type": "allpass"
            },
            "envelope": {
                "attack": 0.02,
                "decay": 0.02,
                "sustain": 1,
                "releasse": 0.02,
            },
            "filterEnvelope": {
                "attack": 0.02,
                "decay": 0.02,
                "sustain": 1,
                "release": 0.02,
                "baseFrequency": 200,
                "octaves": 7,
                "exponent": 0
            }
        });

        //Three different filters connceted externally to the polysynth in series.
        //May be better to do so in parallel? Atleast have a dry and wet mix option.
        this.filter1 = new Tone.Filter(500, "allpass");
        this.filter2 = new Tone.Filter(500, "allpass");
        this.filter3 = new Tone.Filter(500, "allpass");

        //Filter envelope initialization. Is connected to all three filters at once.
        this.filterEnv = new Tone.FrequencyEnvelope({
            "baseFrequency": 200, //baseline frequency start
            "octave": 4
        });

        //LFO component initialization
        this.lfo1 = new Tone.LFO({
            "type": "sine",
            "min": 0,
            "max": 500,
            "frequency": 0.5, 
        });

        this.freeverb = new Tone.Freeverb({
            "roomSize": 0.5,
            "dampening":2000,
            "wet": 0.5
            }
        ).toMaster();

        /**************************Connecting modules together *********************/

        //Filter envelop connects equally to all three envelopes
        this.filterEnv.fan(this.filter1.frequency, this.filter2.frequency, this.filter3.frequency);
        
        this.prevLfo1 = "pitch";
        this.lfo1.connect(this.PolySynth.detune);
        
        
        //Polysynth connects to the three filters in series.
        this.PolySynth.connect(this.filter1);
        this.filter1.connect(this.filter2);
        this.filter2.connect(this.filter3);
        this.filter3.connect(this.freeverb);

    }

    

/******************************************************************************************
****************************************Synth Component Handlers***************************
*******************************************************************************************/
/*
* Would like to add more modules such as a customizable reverb, a delay, custom modules, etc.
*/

    oscHandler(update){
        /*
        Handles user input from the oscillator component.
        Must use weird syntax to represent parameter changes properly for all polysynth related changes.
        The below is the same representation as the code:

        let oscParam = {
            "oscillator": {
                update.param : update.value
            }
        }
        */
        let oscParam = {}; 
        oscParam["oscillator"] = {};
        oscParam["oscillator"][update.param] = update.value;
        this.PolySynth.set(oscParam);
    }

    envHandler(update){
        //Handles input for both amp envelope and filter envelope
        if (update.id === "envelope"){
            //formality needed to update amp envelope in the polysynth
            let envParam = {};
            envParam[update.id] = {} //update.id is envelope type: filterEnv or ampEnv
            envParam[update.id][update.param] = update.value; //param = attack, decay, etc.
            this.PolySynth.set(envParam);
        }
        else if(update.id === "filterEnvelope"){
            this.filterEnv[update.param] = update.value;
        }
    }

    filterHandler(update){
        //Handles input for all three filters
        if (update.id === "Filter1"){

            if (update.param === "type" || update.param === "rolloff") {
                this.filter2[update.param] = update.value;
            }
            else {
                this.filter2[update.param].value = update.value;
            }
        }
        else if(update.id === "Filter2"){

            if (update.param === "type" || update.param === "rolloff"){
                this.filter2[update.param] = update.value;
            }
            else {
                this.filter2[update.param].value = update.value;
            }
        }
        else{

            if (update.param === "type" || update.param === "rolloff") {
                this.filter3[update.param] = update.value;
            }
            else {
                this.filter3[update.param].value = update.value;
            }
        }
    }
    

    lfoHandler(update){

        if (update.param === "frequency" || update.param === "amplitude"){
            this.lfo1[update.param].value = update.value;
        }
        //Provide the user options to reroute the LFO to different parameters
        //For now only have frequency and pitch
        else if (update.param === "routing"){
            
            if (update.value === "pitch" && this.prevLfo1 !== "pitch"){
                this.lfo1.disconnect();
                this.lfo1.connect(this.PolySynth.detune);
                this.prevLfo1 = "pitch";
            }

            else if (update.value === "cutoff" && this.prevLfo1 !== "cutoff") {
                this.lfo1.disconnect();
                this.lfo1.fan(this.filter1.frequency, this.filter2.frequency, this.filter3.frequency)
                this.prevLfo1 = "cutoff";
            }
        }
        //waveform change
        else if (update.param === "type"){
            this.lfo1.type = update.value;
        }

        console.log(update);
    }


    masterHandler(update){
        //Will later add on other features
        //keeps decibels from -80db to 0db.
        let vol = map(update.value, 0, 10, -80, 0);
        this.PolySynth.set("volume", vol);

    }



/*****************************************************************************************
****************************************Pitch Input Handlers******************************
******************************************************************************************/

    //midi input handler
    MidiHandler(data){
        //handles midi input data sent from the midi controller component
        if (data.status === "on"){
            this.PolySynth.triggerAttack(data.note, undefined, data.velocity);
            this.filterEnv.triggerAttack(undefined, data.velocity);//Triggers filter envelope with velocity
        }
        else if (data.status === "off"){
            this.PolySynth.triggerRelease(data.note, undefined, data.velocity);
            this.filterEnv.triggerRelease(undefined, data.velocity);
        }
    }
    //
    musicalTypingTrigger(note){
        //used for musical typing on a keyboard
        var pitch = "";
        var valid = false; //within defined mapping from keyboard to pitch
        switch (note.key.toLowerCase()){ //maps keyboard values to a pitch
            case "a":
                pitch = "c" + this.octave;
                valid = true;
                break;
            case "w":
                pitch = "c#" + this.octave;
                valid = true;
                break;
            case "s":
                pitch = "d" + this.octave;
                valid = true;
                break;
            case "e":
                pitch = "d#" + this.octave;
                valid = true;
                break;
            case "d":
                pitch = "e" + this.octave;
                valid = true;
                break;
            case "f":
                pitch = "f" + this.octave;
                valid = true;
                break;
            case "t":
                pitch = "f#" + this.octave;
                valid = true;
                break;
            case "g":
                pitch = "g" + this.octave;
                valid = true;
                break;
            case "y":
                pitch = "g#" + this.octave;
                valid = true;
                break;
            case "h":
                pitch = "a" + this.octave;
                valid = true;
                break;
            case "u":
                pitch = "a#" + this.octave;
                valid = true;
                break;
            case "j":
                pitch = "b" + this.octave;
                valid = true;
                break;
            case "k":
                pitch = "c" + (this.octave + 1);
                valid = true;
                break;
            case "o":
                pitch = "c#" + (this.octave + 1);
                valid = true;
                break;
            case "l":
                pitch = "d" + (this.octave + 1);
                valid = true;
                break;
            case "p":
                pitch = "d#" + (this.octave + 1);
                valid = true;
                break;
            case ";":
                pitch = "e" + (this.octave + 1);
                valid = true;
                break;
            case "'":
                pitch = "f" + (this.octave + 1);
                valid = true;
                break;
            default:
                break;
        }
        
        if (note.type === "keydown"){ //key down event
            if( note.key === "z" && (this.octave >= -3)) //change octaves. limit to -3
                this.octave--;
            else if (note.key === "x" && (this.octave <= 3)) //change octaves. limit to 3
                this.octave++;
                
            if (valid){ //if not octave changing keys
                this.PolySynth.triggerAttack(pitch);
                // this.filterEnv.triggerAttack(pitch);
            }
        }

        else if (note.type === "keyup" && valid){
            this.PolySynth.triggerRelease(pitch);
            // this.filterEnv.triggerRelease(pitch);
        }
    }


/*********************************************************************************
****************************************Render************************************
**********************************************************************************/

    render() {
        return (
            <div className="poly-synth" ref="polysynth" id="poly">
                <MidiController
                    MidiOutput={this.MidiHandler}
                />
                
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

                <AudioVisualizer />
            </div>

        );
    }
}


export default Synthesizer;
// export default synth;

