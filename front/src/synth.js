import React, { Component } from 'react';
import './App.css';

class synthesizer extends Component{
    constructor(){

    }
}


class synth extends Component{
    constructor(context, props){
        super(props);

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
    handle
    render() {
        return (
            <div className="polysynth">
                <oscillatorGroup
                    value={this.state.oscillator}

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






class OscillatorModule extends Component{
    /*Oscillator group is the audio source module web synthesizer. The class contains three oscillators.
    */
    constructor(props){
         //context = audioContext from web audio api
        super(props);
        this.context = this.props.context;
        this.gainNode = this.context.createGain();
        this.merge = this.context.createChannelMerger(3);
        this.osc1.connect(this.merge,1,0);
        this.osc2.connect(this.merge,1,1);
        this.osc3.connect(this.merge,1,2);
        this.merge.connect(this.gainNode);
        this.state = {
            osc1Type: 'sine',
            osc2Type: 'sine',
            osc3Type: 'sine',
        }
        this.setWave = this.setWave.bind(this);
    }
    setWave(wave,osc){
        switch (osc){
            case "osc1":
            this.osc1.setWave(wave);
            break;
            case "osc2":
            this.osc2.setWave(wave);
            break;
            case "osc3":
            this.osc3.setWave(wave);
            break;
        }
    }
    setGain(osc1Vol, osc2Vol, osc3Vol){
        //Should be a percentage, where function maps 
        this.osc1.setVolume(osc1Vol);
        this.osc2.setVolume(osc2Vol);
        this.osc3.setVolume(osc3Vol);
    }

    getlastNode(){
        return this.merge;
    }

    play(value, time){
        this.refs.osc1Child.play(value, time);
        this.refs.osc2Child.play(value, time);
        this.refs.osc3Child.play(value, time);
    }

    stop(time){
        
    }

    render(){
        return(
            <div className="oscModule">
                <Oscillator 
                    id={"osc1"}
                    ref="osc1Child"
                    nextNode={this.merge}
                    onPress={this.play}
                    onRelease={this.stop}
                />

                <Oscillator 
                    id={"osc2"}
                    ref="osc2Child"
                    onPress={this.play}
                    onRelease={this.stop}
                />

                <Oscillator 
                    id={"osc3"}
                    ref="osc1Child"
                    onPress={this.play}
                    onRelease={this.stop}
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
    //oscillator class encapsulates states associated to individual oscillator
    //Requires audio node of where to connect oscillator to and contains functions
    //to be called by the parent class OscillatorModule
    constructor(props){
        super(props)
        this.state = {
            //context is audioContext created using the Web Audio API.
            oscType : 'sine',
            //need to know where to connect oscillator. 
            nextNode: props.nextNode,
            isOn: false,
        };
        this.osc = props.context.createOscillator();
        this.osc.type = this.state.oscType;
        this.osc.connect(props.nextNode);
        //this.osc.start(props.context.currentTime);
    }

    setWave(wave){ 
        //sets the wave type of the oscillator
        this.setState({oscType: wave});
    }

    getOscillator(){
    //returns the oscillator object to be used to connected in an audio chain.
        return this.osc;
    }

    play(value){ 
    //value = pitch of note, time = 
        this.state.isOn = true;
        this.init();
        this.osc.frequency.value = value;
        //this.gainNode.gain.setValueAtTime(1, this.props.context.currentTime);
    }


    stop(time) {
        //this.gainNode.gain.exponentialRampToValueAtTime(0.005, time + 1);
        this.osc.stop(time + 1);
    }

    render(){
        return(
            <div id = {this.props.id}>
                <div className="Wave-form">
                    <button onClick={this.setWave.bind(this, 'sine')}>Sine</button>
                    <button onClick={this.setWave.bind(this, 'square')}>Square</button>
                    <button onClick={this.setWave.bind(this, 'sawtooth')}>Saw</button>
                    <button onClick={this.setWave.bind(this, 'triangle')}>Triangle</button>
                </div>
                {this.state.oscType}
                <div className="Pitch-control">
                    <div className="pitchKnob"></div>
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
            rlse: 0,
        };
    }
}

class lfo{
    //Frequency of low frequency oscillator
    constructor(context){
        this.osc = context.createOscillator();
        this.analyser = this.context.createAnalyser();
        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
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


export default Oscillator;
// export default oscillatorGroup;
// export default synth;

