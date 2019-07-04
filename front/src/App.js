import React, { Component } from 'react';
import './App.css';
import Synthesizer from './synth/synthesizer.js';
// import SynthesizerRender from './synth/synthRender';
// import Tone from 'tone';

class App extends Component {
    constructor(props){
        super(props);

        this.AudioOut = this.AudioOut.bind(this);
    }
    //function is sent to midi controller
    

    AudioOut(){

    }


    render(){
        return (
            <div className="App">
                <h1>Mr. Polyfone</h1>
                <Synthesizer
                    AudioOut={this.AudioOutHandler}
                />
                
                {/* <AudioVisualizer/> */}
                
            </div>
        );
    }
}

export default App;
