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

  buttonHandler(e){
    this.refs.oscModule.changeNote(440, 0);
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
        <button onClick={(e) => this.buttonHandler(e)}>Play Sound!</button>
      </div>
    );
  }
}

export default App;
