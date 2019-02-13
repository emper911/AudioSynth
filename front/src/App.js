import React, { Component } from 'react';
import './App.css';
import OscillatorModule from './synth';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      context: new AudioContext(),
    };
    this.buttonHandler = this.buttonHandler.bind(this);
  }

  oscHandler(){

  }

  lfoHandler(){

  }

  envelopeHandler(){

  }

  filterHandler(){
    
  }

  buttonHandler(val){
    this.refs.oscModule.changeNote(val, 0);
  }

  render() {
    return (
    
      <div className="App">
        <h1>Web Synthesizer</h1>
        <OscillatorModule
          ref="oscModule"
          context={this.state.context}
          outputNode={this.state.context.destination}
        />
        <button onClick={this.buttonHandler.bind(this,261.63)}>C</button>
        <button onClick={this.buttonHandler.bind(this,293.66)}>D</button>
        <button onClick={this.buttonHandler.bind(this,329.63)}>E</button>
        <button onClick={this.buttonHandler.bind(this,349.23)}>F</button>
        <button onClick={this.buttonHandler.bind(this,392.00)}>G</button>
        <button onClick={this.buttonHandler.bind(this,440.00)}>A</button>
        <button onClick={this.buttonHandler.bind(this,493.88)}>B</button>
        <button onClick={this.buttonHandler.bind(this,523.25)}>C</button>

      </div>
    );
  }
}

export default App;
