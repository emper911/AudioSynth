import React, { Component } from 'react';


class Knob extends Component{

    componentDidMount(){
        this.initKnob();
    }

    initKnob(){
        window.$(this.refs.SynthKnob).knob({
            'min' : this.props.min,
            'max' : this.props.max,
            'step' : this.props.step, 
            'cursor': "30",
            'width' : "100%",
            'height': "100%",
            "fgColor": "#ffec03",
            "bgColor": "black",
            "thickness": "0.2",
            "angleOffset": "-125",
            "displayPrevious": true,
            "angleArc":"250", 
            // "rotation": "clockwise",
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