<template>
  <div class="noteCard" @mouseenter="startAnim" @mouseleave="stopAnim">
    <img :src="image" />
    <div class="mask">
      <h3>{{duration}}<br>{{perBeat}}</h3>
      <div style="display: flex; width: 100%; justify-content: center; padding-top: 20px;">
        <div :style="circleOne"></div>
        <div :style="circleTwo"></div>
      </div>
    </div>
  </div>
    
</template>
<script>
import Choices from '@/data/noteInfo.js';
import Click from "@/assets/click.mp3";
import Computed from "@/helper_functions/computedProperties.js";
import CircleTansform from "@/helper_functions/circleTransform.js";
import BorderAnimation from "@/helper_functions/borderAnimation.js";


export default {
  name: "NoteCard",
  props:{
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
      circleOne: {
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        background: "#ccff00",
        border: "solid black 3px",
        transitionDuration: '',
        marginRight: "10%",
        transform: "scale(1)",
      },
      circleTwo: {
        width: "50px",
        heigth: "50px",
        borderRadius: "50%",
        background: "#ccff00",
        border: "solid black 3px",
        transition: '',
        marginLeft: "10%",
        transform: "scale(1)"
      },
      setTransition: '',
      primaryA: '',
      secondaryA: '',
    }
  },
  methods:{
    startAnim: function(){
      this.circleTwo.transition = this.secondaryBeat  + "ms";
      this.circleOne.transition = this.primaryBeat  + "ms";
      var self = this;

      this.primaryA = setInterval(function(){
       self.circleOne.transform = self.primaryAnim;
       self.circleOne.border = self.primaryBorderAnim;
       self.playSound(Click);
      }, self.primaryBeat);

      this.secondaryA = setInterval(function(){
       self.circleTwo.transform = self.secondaryAnim;
       self.circleTwo.border = self.secondaryBorderAnim;
      }, self.secondaryBeat);
      
    },
    stopAnim: function(){
      clearInterval(this.primaryA);
      clearInterval(this.secondaryA);
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
      return Computed(this.choices, this.choice).image;
    },
    duration(){
      return "Duration: " + Computed(this.choices, this.choice).duration;
    },
    perBeat(){
      return "Notes per beat: " + Computed(this.choices, this.choice).perBeat;
    },
    primaryBeat(){
      return Computed(this.choices, this.choice).primaryDuration;
    },
    secondaryBeat(){
      return Computed(this.choices, this.choice).secondaryDuration;
    },
    primaryAnim(){
      return CircleTansform(this.circleOne.transform);
    },
    secondaryAnim(){
      return CircleTansform(this.circleTwo.transform )
    },
    primaryBorderAnim(){
      return BorderAnimation(this.circleOne.border);
    },
    secondaryBorderAnim(){
      return BorderAnimation(this.circleTwo.border);
    }
  },
  created(){
    
    var self = this;
    this.setTransition = setTimeout(function(){
        self.circleTwo.transition = self.secondaryBeat  + "ms";
        self.circleOne.transition = self.primaryBeat  + "ms";
      }, 500);
    
  }
  }

</script>