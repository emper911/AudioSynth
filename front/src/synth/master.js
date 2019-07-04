import React, { Component } from 'react';
import Knob from './knobs';

class MasterModule extends Component {
    // constructor(props){
    //     super(props);
    // }
    render(){
        return (
            <div className="global-module">
                <div className="global-heading">
                    <h3>Master</h3>
                </div>
                <div className="global-knobs knob-component">
                    <h4>Volume:</h4>
                    <Knob
                        id="master"
                        className="VolumeKnob"
                        min={-50}
                        max={10}
                        step={0.1}
                        value={-10}
                        onChange={this.props.masterHandler}
                    />
                </div>
            </div>
        );
    }
}

export default MasterModule;