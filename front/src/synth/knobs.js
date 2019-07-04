import React, { Component } from 'react';


class Knob extends Component{
    // constructor(props){
    //     super(props);

    // }

    componentDidMount(){
        this.initKnob();
    }

    initKnob(){
        window.$(this.refs.SynthKnob).knob({
            'min' : this.props.min,
            'max' : this.props.max,
            'step' : this.props.step, 
            'change': (v) => { 
                this.props.onChange({
                    'id':this.props.id,
                    'param': this.props.className,
                    'value': v
                })
            }
        });
        window.$(this.refs.SynthKnob)
        .val(this.props.value)
        .trigger('change');
    }

    render(){
        return (
            <div className="knob">
                <input ref="SynthKnob" type="text" className="dial"></input>
            </div>
        );
    }
}


export default Knob;