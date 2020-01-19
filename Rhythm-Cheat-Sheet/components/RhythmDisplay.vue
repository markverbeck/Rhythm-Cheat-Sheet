<template>
<div class="rhythmDiv">
  <div>
    <button v-on:click="startStop" class="greenButton">{{choice}}</button>
    <img :src="image" :class="noteShape">
  </div>
  <div :class="{'active': show, showHideDiv}">
    <div :class="pulseClass">
        <div :class="animationClass" :style="styles"><p>{{beat}}</p></div>
    </div>
  </div>
  <div :class="{'active': show, showHideDiv}  ">
    <div :class="pulseClass">
      <div :class="secondaryAnimationClass" :style="secondaryStyles"><p>{{eigthBeat}}</p></div>
    </div>
  </div>
</div>
  

</template>

<script>
import Choices from '@/data/noteInfo.js';
import PrimaryBeat from "@/helper_functions/PrimaryBeat.js";
import PrimaryAnimation from "@/helper_functions/PrimaryAnimation.js";
import PulseBackground from "@/helper_functions/PulseBackground.js";
import Click from "@/assets/click.mp3";
import Computed from "@/helper_functions/computedProperties.js";

export default {
  name:"Rhythm-Display",
  props: {
    choice:{
      type: String,
      required: true,
      default: function(){
        return "Whole"
      }
    }
    
  },
  data(){
    return{
      choices: Choices,
      beat: 1,
      eigthBeat: '',
      time: this.primaryBeat,
      secondaryTime: this.secondaryBeat,
      running: false,
      timer: '',
      secondaryTimer: '',
      animationClass: "squareYellow flexNumber",
      secondaryAnimationClass: "squareYellow flexNumber",
      styles: "transition: " + this.primaryBeat + "ms ease-out;",
      secondaryStyles: "transition: " + this.secondaryBeat + "ms ease-out;", 
      show: false,
      showHideDiv: "showHideDiv",
      pulseClass: 'home',
      noteShape: "displayNote",
      
    }
  },
  methods:{
    start: function(){
      this.styles = "transition: " + this.primaryBeat + "ms ease-out;";
      this.secondaryStyles= "transition: " + this.secondaryBeat + "ms ease-out;";
      this.noteShape = "displayNote fadeOut";
       this.timer = setInterval(() => {
          this.beat = PrimaryBeat(this.beat);
          this.animationClass = PrimaryAnimation(this.animationClass);
          this.pulseClass = PulseBackground(this.pulseClass);
          this.playSound(Click);
    }, this.primaryBeat);

    this.secondaryTimer = setInterval(() => {      
      this.secondaryAnimationClass = PrimaryAnimation(this.secondaryAnimationClass);
    }, this.secondaryBeat);

    },
    stop: function(){
      this.noteShape = "displayNote fadeIn";
        clearInterval(this.timer);
        clearInterval(this.secondaryTimer);

        this.beat = 1;
        // this.secondaryBeat = '';
    },
    startStop: function(){
      if(this.running === false){
        this.start();
        this.running = true;
        this.show = true;
        this.animationClass = "squareYellow flexNumber";
        this.secondaryAnimationClass = "squareYellow flexNumber";


      }else{
        this.stop();
        this.running = false;
        this.show = false;
        this.animationClass = "squareHide flexNumber";
        this.secondaryAnimationClass = "squareHide flexNumber";


      }
    },
    playSound (sound) {
      if(sound) {
        var audio = new Audio(sound);
        audio.play();
      }
    }
  },
  computed:{
    image(){
      return Computed(Choices, this.choice).image;
    },
    primaryBeat(){
      return Computed(Choices, this.choice).primaryDuration;
    },
    secondaryBeat(){
      return Computed(Choices, this.choice).secondaryDuration;
    }
  },
  created(){
    
    var self = this;
    this.setTransition = setTimeout(function(){
        self.styles = "transition: " + self.primaryBeat + "ms ease-out;";
        self.secondaryStyles= "transition: " + self.secondaryBeat + "ms ease-out;";
      }, 500);
    
  }
  

}

</script>


<style lang="scss"> 
</style>