import React, { Component } from 'react';
import './App.css';
import Synthesizer from './synth/synthesizer.js';
// import SynthesizerRender from './synth/synthRender';
// import Tone from 'tone';

class App extends Component {
//   constructor(props){
//     super(props);
//     // var synth = new Tone.Synth().toMaster()
//     // //play a 'C' for one 8th note
//     // synth.triggerAttackRelease('C4', '8n')

//     // this.handleChange = this.handleChange.bind(this);
//   }

  render(){
    return (
    
      <div className="App">
        <h1>Mr. Monofone</h1>
        <Synthesizer/>
        {/* <MidiInput/> */}
        {/* <AudioVisualizer/> */}
        
      </div>
    );
}
}

export default App;

/* <SynthesizerRender 
  oscHandler={this.oscHandler}
  envelopeHandler={this.envelopeHandler}
  filterHandler={this.filterHandler}
  lfoHandler={this.lfoHandler}
  globalHandler={this.globalHandler}
  lofiHandler={this.lofiHandler}
  patch={this.state}
  handleChange={this.handleChange}
/> */