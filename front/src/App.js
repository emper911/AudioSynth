import React, { Component } from 'react';
import './App.css';
import SynthesizerRender from './synth/synthRender';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      context: new AudioContext(),
      oscMod: {
        osc1:{
          detune:0, 
          type:'sine'
        },
        osc2:{
          detune:0, 
          type: 'sine'
        },
        osc3:{
          detune:0, 
          type: 'sine'
        },
        voice: 4,
        mix:[1,1,1]
      },
      envMod:{
        attack: 0,
        decay: 0,
        sustain: 0,
        release: 0,
      },
      lfoMod:{
        freq: 220,
        waveform: 'sine',
        gain: 0,
        routing: 'pitch',
      },
      filterMod:{
        freq: 220,
        gain: 0,
        type: 'lowpass',
      },
      lfoMod:{
        freq: 220,
        gain: 0,
        type: 'sine',
      },



    };


    this.handleChange = this.handleChange.bind(this);
    // this.buttonHandler = this.buttonHandler.bind(this);
    // let osc1 = this.state.context.createOscillator();
    // let osc2 = this.state.context.createOscillator();
    // let osc3 = this.state.context.createOscillator();
    // let osc4 = this.state.context.createOscillator();
    // let gain1 = this.state.context.createGain();
    // let merge = this.state.context.createChannelMerger();

    // gain1.gain.linearRampToValueAtTime(value, endTime)
  }

  oscHandler(){

  }

  setWave(id, wave){

  }

  detuneKnob(){

  }

  triangleGain(){

  }

  lfoHandler(){

  }

  envelopeHandler(){

  }

  filterHandler(){
    
  }

  handleChange = (newValue) => {
    console.log(newValue);
  }

  render() {
    return (
    
      <div className="App">
        <h1>Polyphonic Synthesizer</h1>
        <SynthesizerRender 
          oscHandler={this.oscHandler}
          envelopeHandler={this.envelopeHandler}
          filterHandler={this.filterHandler}
          lfoHandler={this.lfoHandler}
          globalHandler={this.globalHandler}
          lofiHandler={this.lofiHandler}
          patch={this.state}
          handleChange={this.handleChange}
        />

      </div>
    );
  }
}

export default App;
