class Oscillator{
    constructor(context){
        this.context = context;
        this.osc = context.createOscillator();
        this.osc.type = 'sine';
        this.osc.frequency.value = '440'
    }

    setWave(wave){
        //sets the wave type of the oscillator
        this.osc.type = wave;
    }

    connectNode(node){
        //takes an audio node as input to connect oscillator to
        this.osc.connect(node);
    }
    
    play(value, time){ 
        //value = pitch of note, time = 
            this.init();
            this.osc.frequency.value = value;
            this.gainNode.gain.setValueAtTime(1, this.context.currentTime);
            this.osc.start(time);
            this.stop(time);
            
    }

    stop(time){
        this.gainNode.gain.exponentialRampToValueAtTime(0.001, time + 1);
        this.osc.stop(time + 1);
    }
}