import React, { Component } from 'react';
import Knob from './knobs';


class FilterModule extends Component {
    // constructor(props){
    //     super(props);
    // }

    render(){
        return (
            <div className="filter-modules">
                <Filter 
                    id="filter1"
                    filterHandler={this.props.filterHandler}
                />
                <Filter
                    id="filter2"
                    filterHandler={this.props.filterHandler}
                />
                <Filter
                    id="filter3"
                    filterHandler={this.props.filterHandler}
                />
            </div>

        );
    }
}

function Filter(props){
    return (
        <div className="filter-controls">
            <h3>Filter</h3>
            <div className="filter-freq-knob knob-component">
                <h4>Frequency:</h4>
                <Knob
                    id={props.id}
                    className="frequency"
                    min={1}
                    max={1000}
                    value={100}
                    onChange={props.filterHandler}
                />
            </div>
            <div className="filter-volume-knob knob-component">
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
                    max={100}
                    value={10}
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
                    <button onClick={() => props.filterHandler({'id' : props.id, 'param':'type', 'value' : 'peaking'})}>Peaking</button>
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
    );
}


export default FilterModule;