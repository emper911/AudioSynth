import React, { Component } from 'react';
import envelope from '../synth/envelopeMod';




class WebAudioModule {
    constructor(props){
        super(props);
        this.state = {
            numVoices: props.numVoices,
            voices: Array(props.numVoices).fill(null),

        }
        voices.forEach(function(voice){
            voice = new Voices(props);
        });

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

    setWave(wave, id){
        switch(id){
            case "osc1":
                this.state.osc1.type = wave;
                break;
            case "osc2":
                this.state.osc2.type = wave;
                break;
            case "osc3":
                this.state.osc3.type = wave;
                break;
        }
    }
    getlastNode(){
        return this.finalGainNode;
    }

    setVolume(osc1, osc2, osc3, osc4){
        this.gainNode1.gain.value = osc1;
        this.gainNode2.gain.value = osc2;
        this.gainNode3.gain.value = osc3;
    }

    changeNote(value){
        this.refs.osc1Child.changeNote(value);
        this.refs.osc2Child.changeNote(value);
        this.refs.osc3Child.changeNote(value);
    }

    stop(time){
        this.refs.osc1Child.stop(time);
        this.refs.osc2Child.stop(time);
        this.refs.osc3Child.stop(time);
    }

    getOsc(){
        //return oscillator
        return this.merge;
    }

}


class Voices{
    constructor(props, numVoices){
        this.state = {
            voices: Array(numVoices).fill(null),
            merges: Array(numVoices/2).fill(null),
        }
    }
    init4(){
        this.state.voices.forEach(function(voice){
            voice = new Voice(props);
        });
        this.state.merges.forEach(function(merge){
            merges = props.context.createChannelMerger(2);
        });

        var j;
        var i = 0;
        for (j = 0, i = 0; j < this.state.merges.length, i < this.state.voices.length - 1; j++, i++){
            this.state.voices[i].connect(this.state.merges[j],0, 0);
            this.state.voices[i + 1].connect(this.state.merges[j],0, 1);
        }
    }
    init8(){

    }
    init16(){

    }
    onPress(pitch, velocity){

    }
    onRelease(pitch, velocity){

    }

}


class Voice{
    constructor(props){
        this.state = {
            context : props.context,
            numVoices: props.numVoices,
            attack: props.attack,
            decay: props.decay,
            sustain: props.sustain,
            release: props.release,
            vol: 50,
            env: null,
        }
        init();
    }

    init(){
        //
        //creating 3 oscillator groups
        this.osc1 = this.state.context.createOscillator();
        this.osc2 = this.state.context.createOscillator();
        this.osc3 = this.state.context.createOscillator();
        //Creating gain nodes for oscillator
        this.gain1 = this.state.context.createOscillator();
        this.gain2 = this.state.context.createOscillator();
        this.gain3 = this.state.context.createOscillator();
        //creating Merge
        this.merge1 = this.state.context.createChannelMerger();
        this.merge2 = this.state.context.createChannelMerger();
        //
        this.merge2.channelCount = 1;
        this.merge2.channelCountMode = "explicit";
        this.merge2.channelInterpretation = "speaker";
        //connection of oscillator to gain node
        this.osc1.connect(this.gain1);
        this.osc2.connect(this.gain2);
        this.osc3.connect(this.gain3);
        //merge 1 connection
        this.gain1.connect(this.merge1, 0, 0);
        this.gain2.connect(this.merge1, 0, 1);
        //merge 2 connection
        this.merge1.connect(this.merge2, 0, 0);
        this.gain3.connect(this.merge2, 0, 1);
        //
        this.envelope = new envelope(props, this.gain3);
        this.outputNode = this.envelope.outputNode;

        this.filter = this.props.context.createBiquadFilter();

    }
    playNote(pitch, velocity){
        
    }

    setWave(wave, id){
        this.state.osc[id].type = wave;
    }

    start(time){
        this.state.osc.forEach(function(oscillator){
            oscillator.start(time);
        });
    }

    stop(time){
        this.state.osc.forEach(function(oscillator){
            oscillator.stop(time + 1);
        });
    }
    
    setVolume(osc1, osc2, osc3, osc4){

    }
    changeNote(freq){
        this.state.osc.forEach(function(oscillator){
            oscillator.frequency.value = value;
        });
    }

    detune(tuning){
        this.state.osc.forEach(function(oscillator){
            oscillator.detune.value = tuning;
        });
    }



    envelope(A, D, S, R){

    }


}

class envelope{
    constructor(props, inputNode){
        super(props);
        this.state = {
            attack: props.attack,
            decay: props.decay,
            sustain: props.sustain,
            release: props.release,
            inputNode: inputNode,
        }
        this.outputNode = this.props.context.createGain();
        inputNode.connect(this.env);

    }

    setAttack(time){
        this.state.attack = time;
    }

    setDecay(time){
        this.state.decay = time;
    }

    setSustain(gain){
        this.state.sustain = gain;
    }

    setRelease(time){
        this.state.release = tiime;
    }

    onVelocity(){
        now = context.currentTime;
        this.outputNode.cancelScheduledValues(now);
        this.outputNode.setValueAtTime(0, now);
        this.outputNode.linearRampToValueAtTime(1, now + this.state.attack);
        this.outputNode.linearRamptoValueAtTime(this.state.sustain, now + this.state.attack + this.state.decay);
        
    }
    offVelocity(){
        this.outputNode.linearRampToValueAtTime()
        this.outputNode.linearRampToValueAtTime(0, now + this.state.attack + this.state.release);
    }

}




export default OscillatorModule;

