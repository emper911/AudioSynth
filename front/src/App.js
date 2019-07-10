import React, { Component } from 'react';
import './App.css';
import Synthesizer from './synth/synthesizer';
// import SynthesizerRender from './synth/synthRender';
// import Tone from 'tone';

class App extends Component {
    // constructor(props){
    //     super(props);

    //     this.AudioOut = this.AudioOut.bind(this);
    // }


    render(){
        return (
            <div className="App">
                <Synthesizer
                />
                
                
            </div>
        );
    }
}

export default App;
