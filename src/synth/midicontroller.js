import React, { Component } from 'react';


class MidiController extends Component{
    

    //Initialize midi input 
    componentDidMount(){
        this.initMidi();
    }

    initMidi(){
        var input = '';
        //rename for ease of use
        var WebMidi = window.WebMidi;
        //due to scoping of 'this' keyword easier to save external handler in variable
        var MidiOutput = this.props.MidiOutput;
        //tries to connect
        WebMidi.enable(function (err){
            if (err) {
                console.log("WebMidi could not be enabled.", err);
            } 
            else {
                // Retrieve an input by name, id or index
                if (WebMidi.inputs.length > 0){//If a valid midi device detected, will be greater than 0
                    // console.log(WebMidi.inputs);
                    if (WebMidi.inputs[0].name === "Scarlett 2i4 USB"){
                        input = WebMidi.getInputByName(WebMidi.inputs[1].name);
                    }   
                    else {
                        input = WebMidi.getInputByName(WebMidi.inputs[0].name); //picks the first midi controller
                    }
                    // this.refs.status.text = "Midi is Connected";
                    console.log(WebMidi.inputs);
                    // Listen for a 'note on' message on all channels
                    input.addListener('noteon', "all",
                        //TODO -- START TIMER. If the note is on measure for a duration to automatically set to off, so theres no keyhold
                        //However if adding a keyhold function then can keep note continuous with no off. Consider using a limited number of voices. 
                        function (e) {
                            // console.log(e);,
                            MidiOutput({
                                "note":e.note.name + e.note.octave,
                                "velocity": e.velocity,
                                "status": "on"
                            });
                            console.log("Received 'noteon' message (" + e.note.name + e.note.octave + ").");
                        }
                    );
                    input.addListener('noteoff', "all",
                        function (e) {
                            MidiOutput({
                                "note":e.note.name + e.note.octave,
                                "velocity": e.velocity,
                                "status": "off"
                            });
                            // console.log("Received 'noteoff' message (" + e.note.name + e.note.octave + ").");
                        }
                    );
                }
                // console.log("WebMidi enabled!");
                // console.log(WebMidi.outputs);
            }
              
        }, true);

    }

    render(){
        return (
            <div className="midi-controls">
                {/* <p ref="selectController">web</p> */}
            </div>
        );
    }
}


export default MidiController;