<template>
<div class="bodyDiv">
  <Hero />
  <div  :class="animationClass">
    <NotePicker @note-choice="noteChoice" :theChoice="choiceNote"/>
    <div class="wrapper">
      <RhythmDisplay :style="style" :choice="choiceNote"/>
    </div>
  </div>
  </div>
</template>

<script>
import NotePicker from "@/components/NotePicker.vue";
import RhythmDisplay from "@/components/RhythmDisplay.vue";
import Hero from "@/components/Hero.vue";



export default {
  name:"home",
  components: {
    NotePicker,
    RhythmDisplay,
    Hero,
  },
  head: {
    meta: [
      {
        hid: "og:title",
        property: "og:title",
        content: "A visualizer for helping with understanding basic rhythm"
      },
      {
        hid: "description",
        name: "description",
        content: "A visualizer that is designed to help with understanding the basic concepts of rhythm and music."
      },
      { hid: "robots", name: "robots", content: "index follow" }
    ]
  },
  data(){
    return{
      tempo: 60,
      tempoSpeed: '',
      milliValues: '',
      pulse: '',
      animationClass: "green-theme",
      choiceNote: 'Whole',
      style: {
        transition: ".5s",
        opacity: 1,
      },
      fadeIn: null,
      
    }
  },
  methods:{
    pulseBackground: function(){ 
        if(this.animationClass === "home ripple"){
          this.animationClass = "homePulse ripple";
        }else{
          this.animationClass = "home ripple";
        }
    },
    noteChoice: function(choice){
      this.style.opacity = 0;
      var self = this;
      this.fadeIn = setTimeout(function(){
        self.choiceNote = choice;
        self.style.opacity = 1;
      }, 500);
    },
    

  },
  
}

</script>


