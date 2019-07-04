import React, { Component } from 'react';


class MidiController extends Component{
    

    //Initialize midi input 
    componentDidMount(){
        this.initMidi();
    }
    initMidi(){
        //rename for ease of use
        var WebMidi = window.WebMidi;
        //due to scoping of 'this' keyword easier to save in variable
        var MidiOutput = this.props.MidiOutput;
        //tries to connect
        WebMidi.enable(function (err){
            console.log(this);
            if (err) {
                console.log("WebMidi could not be enabled.", err);
            } 
            else {
                // Retrieve an input by name, id or index
                var input = WebMidi.getInputByName("nanoKEY2 KEYBOARD");
                // this.refs.status.text = "Midi is Connected";

                // Listen for a 'note on' message on all channels
                input.addListener('noteon', "all",
                    function (e) {
                        MidiOutput({
                            "note":e.note.name + e.note.octave,
                            "status": "on"
                        });
                        // console.log("Received 'noteon' message (" + e.note.name + e.note.octave + ").");
                    }
                );
                input.addListener('noteoff', "all",
                    function (e) {
                        MidiOutput({
                            "note":e.note.name + e.note.octave,
                            "status": "off"
                        });
                        // console.log("Received 'noteoff' message (" + e.note.name + e.note.octave + ").");
                    }
                );
                console.log("WebMidi enabled!");
                // console.log(WebMidi.inputs);
                // console.log(WebMidi.outputs);
            }
              
        });

    }
    render(){
        return (
            <div>
                <p ref="status">web</p>
            </div>
        );
    }
}


export default MidiController;