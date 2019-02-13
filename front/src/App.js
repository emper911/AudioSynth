import React, { Component } from 'react';
import './App.css';
import Oscillator from './synth';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      context: new AudioContext(),
      //gainNode: this.state.context.createGain(),
    };
    this.gainNode = this.state.context.createGain();
    this.connectOutput(this.gainNode);
    this.buttonHandler = this.buttonHandler.bind(this);
    this.connectOutput = this.connectOutput.bind(this);
  }

  oscHandler(){

  }

  lfoHandler(){

  }

  envelopeHandler(){

  }

  filterHandler(){
    
  }

  connectOutput(node){
    node.connect(this.state.context.destination);
  }
  buttonHandler(e){
    // this.osc = this.state.context.createOscillator();
    // this.gainNode = this.state.context.createGain();
    // this.osc.connect(this.gainNode);
    // //this.osc.connect(this.state.context.destination);
    // this.gainNode.connect(this.state.context.destination);
    // this.osc.type = 'square';
    // this.osc.frequency.value = 440;
    // let time = this.state.context.currentTime;
    // this.gainNode.gain.setValueAtTime(1, time);
    // this.osc.start(time);
    // this.gainNode.gain.exponentialRampToValueAtTime(0.001, time + 1);
    // this.osc.stop(time + 1);
    // this.osc.disconnect();
    this.refs.osc1.play(440, 0);
  }

  render() {
    return (
    
      <div className="App">
        <h1>hello, world!</h1>
        <Oscillator 
          id="osc1"
          ref="osc1"
          nextNode={this.gainNode}
          //connectOutput={this.connectOutput}
          context={this.state.context}

        />
        <button onClick={(e) => this.buttonHandler(e)}>Play Sound!</button>
      </div>
    );
  }
}

export default App;
