import React, { Component } from 'react';
import Knob from './knobs';

class MasterModule extends Component {
    // constructor(props){
    //     super(props);
    // }
    render(){
        return (
            <div className="master-module module">
                <div className="master-heading">
                    <h3>Master</h3>
                </div>
                <div className="master-volume-knob">
                    <h4>Volume:</h4>
                    <Knob
                        id="master"
                        className="VolumeKnob"
                        min={0}
                        max={10}
                        step={0.1}
                        value={5}
                        onChange={this.props.masterHandler}
                    />
                </div>
            </div>
        );
    }
}

export default MasterModule;