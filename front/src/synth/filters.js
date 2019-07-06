import React, { Component } from 'react';
import Knob from './knobs';


class FilterModule extends Component {

    render(){
        return (
            <div className="filter-module">
                <Filter 
                    id="Filter1"
                    filterHandler={this.props.filterHandler}
                />
                <Filter
                    id="Filter2"
                    filterHandler={this.props.filterHandler}
                />
                <Filter
                    id="Filter3"
                    filterHandler={this.props.filterHandler}
                />
            </div>

        );
    }
}

function Filter(props){
    return (
        <div className= "filter-group module">
            <h3>{props.id}</h3>
            <div className="filter-controls" id={props.id}>
                <div className="filter-freq-knob knob-component">
                    <h4>Frequency:</h4>
                    <Knob
                        id={props.id}
                        className="frequency"
                        min={50}
                        max={10000}
                        value={200}
                        onChange={props.filterHandler}
                    />
                </div>
                <div className="filter-gain-knob knob-component">
                    <h4>Gain:</h4>
                    <Knob
                        id={props.id}
                        className="gain"
                        min={0}
                        max={1}
                        step={0.01}
                        value={0.5}
                        onChange={props.filterHandler}
                        />
                </div>
                <div className="filter-q-knob knob-component">
                    <h4>Q:</h4>
                    <Knob
                        id={props.id}
                        className="Q"
                        min={0}
                        max={2}
                        value={0.3}
                        step={0.01}
                        onChange={props.filterHandler}
                    />
                </div>
                <div className="filter-bandtype">
                    <h4>Bandtype:</h4>
                    <div className="filter-bandtype-buttons">
                        <button onClick={() => props.filterHandler({'id' : props.id, 'param':'type', 'value' : 'allpass'})}>ALL</button>
                        <button onClick={() => props.filterHandler({'id' : props.id, 'param':'type', 'value' : 'highpass'})}>HP</button>
                        <button onClick={() => props.filterHandler({'id' : props.id, 'param':'type', 'value' : 'lowpass'})}>LP</button>
                        <button onClick={() => props.filterHandler({'id' : props.id, 'param':'type', 'value' : 'bandpass'})}>BP</button>
                        <button onClick={() => props.filterHandler({'id' : props.id, 'param':'type', 'value' : 'highshelf'})}>HS</button>
                        <button onClick={() => props.filterHandler({'id' : props.id, 'param':'type', 'value' : 'lowshelf'})}>LS</button>
                        <button onClick={() => props.filterHandler({'id' : props.id, 'param':'type', 'value' : 'peaking'})}>Peak</button>
                        <button onClick={() => props.filterHandler({'id' : props.id, 'param':'type', 'value' : 'notch'})}>Notch</button>
                    </div>
                </div>
    
                <div className="filter-rolloff">
                        <h4>Rolloff:</h4>
                        <div className="filter-rolloff-buttons">
                            <button onClick={() => props.filterHandler({'id' : props.id, 'param':'rolloff', 'value' : -12})}>-12</button>
                            <button onClick={() => props.filterHandler({'id' : props.id, 'param':'rolloff', 'value' : -24})}>-24</button>
                            <button onClick={() => props.filterHandler({'id' : props.id, 'param':'rolloff', 'value' : -48})}>-48</button>
                            <button onClick={() => props.filterHandler({'id' : props.id, 'param':'rolloff', 'value' : -96})}>-96</button>
                        </div>
        
                    </div>
            </div>
        </div>
    );
}


export default FilterModule;