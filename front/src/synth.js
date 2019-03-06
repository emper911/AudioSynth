import React, { Component } from 'react';
import './App.css';
import oscillatorModule from './synth/oscillatorMod';


let osc = {
    id: '',
    freq: 440,
    wave: 'sine',
    detune: 0,
    volume: 1,
};



let state = {
    oscillatorModule: [osc, osc,],
    envelope:[env,env,],
    filters: 

};


class Synthesizer extends Component{
    //Synthesizer class will hold all synth modules together
    constructor(props){
        super(props);
        vco = new oscillatorModule(props);


    }

    mute() {//mutes the track
        console.log('muted in the sound class');
        this.gainNode.gain.setValueAtTime(0, this.context.currentTime);

    }

    unmute() {
        this.gainNode.gain.value = 1;
    }
    volumeAdjust(val) {
        this.gainNode.gain.value = val;
    }

    render() {
        return (
            <div className="polysynth">
                <oscillatorGroup
                    setWave={this.setWaves()}
                    oscType=
                />

                <lfoGroup
                
                />
                <envelopeGroup
                
                />
                <filterGroup
                
                />
            </div>


        );
    }
}
class OscillatorModuleRender extends Component{
    constructor(props){
        super(props);
        this.state = {
            osc1Type: props.osc[0],
            osc2Type: props.osc[1],
            osc3Type: props.osc[2],
            osc4Type: props.osc[3],

        }
    }
    setWaves(wave,id){

    }
    render(){
        return(
            <div className="OscillatorModuleRender">
                <OscillatorRender 
                    id={"osc1"}
                    setWave={props.setWaves}
                    oscType={props.osc1Type}
                />
                <OscillatorRender
                    id={"osc2"}
                    setWave={props.setWaves}
                    oscType={props.osc2Type}
                />
                <OscillatorRender
                    id={"osc3"}
                    setWave={props.setWaves}
                    oscType={props.osc3Type}
                    
                />
                <OscillatorRender
                    id={"osc4"}
                    setWave={props.setWaves}
                    oscType={props.osc4Type}

                />
            
            </div>

        );
    }
}
class OscillatorModule extends Component{
    /*Oscillator group is the audio source module web synthesizer. The class contains three oscillators.
    */
    constructor(props){
         //context = audioContext from web audio api
        super(props);
        this.state = {
            context : this.props.context,
            osc1 : null,
            osc2 : null,
            osc3 : null,
            osc4 : null,
        };
        this.init(); //Instantiates 
    }
    init(){
        this.state.osc1 = this.context.createOscillator();
        this.osc3 = this.context.createOscillator();
        this.osc4 = this.context.createOscillator();
        //creates gainNodes for 4 oscillators
        this.gainNode1 = this.context.createGain();
        this.gainNode2 = this.context.createGain();
        this.gainNode3 = this.context.createGain();
        this.gainNode4 = this.context.createGain();

        //merges osc1 and osc2
        this.merge = this.context.createChannelMerger(2);
        //merges osc3 and osc4
        this.merge2 = this.context.createChannelMerger(2);
        //merges merge and merge2
        this.merge3 = this.context.createChannelMerger(2);

        //Final gain node before output connection
        this.finalGainNode = this.context.createGain();
        //sets the output to mono
        this.finalGainNode.channelCount = 1;
        this.finalGainNode.channelCountMode = "explicit";
        //interprets down-mixing from input
        this.finalGainNode.channelInterpretation = "speakers";

        

        //connects osc1 and osc2 gains and merges them to merge
        this.gainNode1.connect(this.merge, 0, 0);
        this.gainNode2.connect(this.merge, 0, 1);
        this.merge.connect(this.merge3,0,0);
        //connects osc3 and osc4 gains and merges them to merge2
        this.gainNode3.connect(this.merge2, 0, 0);
        this.gainNode4.connect(this.merge2, 0, 1);
        //connects merge and merge 2 together to merge3
        this.merge2.connect(this.merge3,0,1);
        //connects to final gainNode
        this.merge3.connect(this.finalGainNode);
        //connects to output node passed by props
        this.finalGainNode.connect(this.props.outputNode);
    }
    getlastNode(){
        return this.finalGainNode;
    }

    setVolume(osc1, osc2, osc3, osc4){
        this.gainNode1.gain.value = osc1;
        this.gainNode2.gain.value = osc2;
        this.gainNode3.gain.value = osc3;
        this.gainNode4.gain.value = osc3;
    }

    changeNote(value){
        this.refs.osc1Child.changeNote(value);
        this.refs.osc2Child.changeNote(value);
        this.refs.osc3Child.changeNote(value);
        this.refs.osc4Child.changeNote(value);
    }

    stop(time){
        this.refs.osc1Child.stop(time);
        this.refs.osc2Child.stop(time);
        this.refs.osc3Child.stop(time);
        this.refs.osc4Child.stop(time);
    }

    getOsc(){
        //return oscillator
        return this.merge;
    }

    render(){
        return(
            <div className="oscModule">
                <OscillatorRender
                    id={"osc1"}
                    ref="osc1Child"
                    context={this.props.context}
                />

                <OscillatorRender 
                    id={"osc2"}
                    ref="osc2Child"
                    context={this.props.context}
                />

                <OscillatorRender 
                    id={"osc3"}
                    ref="osc3Child"
                    context={this.props.context}
                />

                <OscillatorRender 
                    id={"osc4"}
                    ref="osc4Child"
                    context={this.props.context}
                />
            </div>
        );
    }
}

class LFOModule extends Component{
    constructor(context){

    }

}

class envelopeGroup extends Component{
    constructor(context){
        
    }
}

class Oscillator extends Component{
    //oscillator class encapsulates states associated to individual oscillator.
    //Requires AudioContext() and the outputNode to connect oscillator to be passed through props.
    constructor(props){
        super(props)
        this.state = {
            context: props.context,
            oscType : 'sine', //sets initial wave form of oscillator.
            outputNode: props.outputNode,
            freq: '440',
        };
        this.init();
    }
    init(){
        //creates the oscillator
        this.osc = this.state.context.createOscillator();
        //sets wave type to be sine wave
        this.osc.type = this.state.oscType;
        //set oscillator frequnecy
        this.osc.frequency.value = this.state.freq;
        //Output node is the node oscillator connects to.
        this.osc.connect(this.state.outputNode);
        //starts oscillator at time 0.
        this.osc.start(0);
    }

    setWave(wave){ 
        //sets the wave type of the oscillator
        this.setState({oscType: wave});
        this.osc.type = wave;
    }

    getOscillator(){
    //returns the oscillator object to be used to connected in an audio chain.
        return this.osc;
    }

    changeNote(value){ 
        this.osc.frequency.value = value;
        this.state.freq = value;
    }

    stop(time) {
        //stops the oscillator when needed
        this.osc.stop(time + 1);
    }

    render(){
        return(
            <div className="oscillator" id = {this.props.id}>
                {this.state.oscType}
                <div className="Wave-form">
                    <button onClick={this.setWave.bind(this, 'sine')}>Sine</button>
                    <button onClick={this.setWave.bind(this, 'square')}>Square</button>
                    <button onClick={this.setWave.bind(this, 'sawtooth')}>Saw</button>
                    <button onClick={this.setWave.bind(this, 'triangle')}>Triangle</button>
                </div>
                <div className="Pitch-control">
                    <div className="pitchKnob"></div>
                </div>
            </div>
        );
    }

}

class OscillatorRender extends Componenet {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="oscillator" id = {props.id}>
                {this.props.oscType}
                <div className="Wave-form">
                    <button onClick={props.setWave.bind(this, props.id, 'sine')}>Sine</button>
                    <button onClick={props.setWave.bind(this, props.id,'square')}>Square</button>
                    <button onClick={props.setWave.bind(this, props.id,'sawtooth')}>Saw</button>
                    <button onClick={props.setWave.bind(this, props.id,'triangle')}>Triangle</button>
                </div>
                <div className="detune-control">
                    <div className="detuneKnob"></div>
                </div>
            </div>
        );
    }
}


class envelope extends Component{
    //Attack: time of gain rise - linear rate?
    //Sustain: time extension of the play trigger
    //Decay: time of gain decrease
    //Release: time of signal length from starting point
    constructor(props){
        super(props);
        this.state = {
            attack: 0,
            decay: 0,
            sustain: 1,
            release: 0,
        };
    }
}

class lfo{
    //Frequency of low frequency oscillator
    constructor(context){
        this.osc = context.createOscillator();
    }
    setWave(wave){ 
    //sets the wave type of the oscillator
        this.osc.type = wave;
    }
    getWave(){ 
    //gets the current wave type of the oscillator
        return this.osc.type;
    }
    setFreq(freq){
        this.osc.frequency.value = freq;
    }
    getFreq(){
        return this.osc.frequnect.value;
    }
    render(){
        return(
        <div id={this.props.id}>
            
        </div>
        )
    }
}

class filter{
    
}


export default OscillatorModule;
// export default synth;

