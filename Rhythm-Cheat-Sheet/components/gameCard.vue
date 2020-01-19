<template>
<div style="perspective: 700px;">
  <div class="gameCard" :style="flipStyle">
              <h1 :style="measureStyle" :class="measureClass">{{measure}}</h1>
    <div class="columns gameHead is-mobile is-tablet" >
        <div class="column is-one-third-mobile is-one-third-tablet" >
            <div :class="hitClass"></div>
        </div>
        <div class="column is-one-third-mobile is-one-third-tablet" >
            <div :class="beatClass"></div>
        </div>
        <div class="column is-one-third-mobile is-one-third-tablet" >
            <div :class="missClass"></div>
        </div>
    </div>
    <div class="imgDiv" :style="imgDivStyle">
        <img :src="image"/>
        <button v-on:click="startStop" class="greenButton" >Get Clicking</button>
    </div>
    <div class="mask" :style="maskStyle">
        <h1>Your Accuracy rate is: {{endPercentage}}%</h1>
        <button v-on:click="startOver" class="greenButton tryAgain" >Try Again</button>
    </div>
    <div class="columns  gameFoot" >
        <p class="desktopMessage">Click Button, count 2..3..4.. and press shift to the rhythm</p>
        <button v-on:click="keyDownFunct" class="greenButton mobileButton" >2.. 3.. 4.. Tap</button>
    </div>
    <GlobalEvents
        @keydown.shift="keyDownFunct"
        ></GlobalEvents>
  </div>
  </div>
    
</template>
<script>
import GameData from '@/data/gameData.js';
import GlobalEvents from 'vue-global-events';
import Click from "@/assets/click.mp3";
import Computed from "@/helper_functions/computedProperties.js";
const axios = require("axios");


export default {
  name: "GameCard",
  components:{
     GlobalEvents, 
  },
  props:{
    choice:{
      type: String,
      required: true,
      default: function(){
        return "Quarter"
      }
    }
  },
  data(){
    return{
      choices: GameData,
      beat: 1,
      varC: 1,
      measure: 0,
      beatInt: '',
      varInt: '',
      appRunning: false,
      hit: 0,
      miss: 0,
      hitClass: 'greenCircle',
      missClass: 'redCircle',
      beatClass: 'yellowCircle',
      measureClass: 'measure',
      stopBeatAnim:'',
      stopAnim: '',
      isKeyDown: false,
      flipStyle:{
          transition: "3s cubic-bezier(.55, -.62, 0.27, 1.2)",
          transform: '',
      },
      maskStyle:{
        zIndex: "-1",
      },
      imgDivStyle:{
        transitionDuration: "3s",
        opacity: 1,
      },
      measureStyle:{},
      endPercentage: 0,
      imgDiv: 'imgDiv',
      Player: '',
    }
    
  },
  methods:{
      startOver: function(){
          this.flipStyle.transform = "rotateY(0deg)";
          this.maskStyle.opacity = 0;
          this.maskStyle.zIndex = "-1";
          this.imgDivStyle.opacity = 1;
          this.hit = 0;
          this.miss = 0;
          this.measureStyle.opacity = 1;
      },
      startTimer: function(){
        var self= this;
        this.beatInt =  setInterval(() => {
            this.measureClass = 'measure'
            this.beatClass = 'yellowCircle yellowAnimation';
            this.playSound(Click);
            if(self.beat <= 3 ){
                self.beat += 1;
            }else{
                self.beat = 1;
            }
            if(self.beat === 1){
                self.measure += 1;
                this.measureClass = 'measure measureAnimation';
            }
            if(this.measure === 9){
                this.stopTimer();
                this.appRunning = false; 
                this.flipStyle.transform = "rotateY(360deg)";
                this.imgDivStyle.opacity = 0;
                this.measureStyle.opacity = 0;
                this.maskStyle.opacity = 1;
                this.maskStyle.zIndex = 0;
                this.endPercentage = Math.trunc( (this.hit / (this.hit + this.miss)) * 100 );
                const note = this.choice;
                const scoreSubmit = {
                  note: this.choice,
                  score: this.endPercentage
                }

                if(this.endPercentage > this.Player.scores[note].score){
                  console.log("We have working.");
                  const newScore = axios.put('/api/player/' + this.Player.id, scoreSubmit).then(function(response){
                    console.log("Score Saved");
                    self.Player.scores[self.choice].score = self.endPercentage;
                  }).catch(function(err){
                    console.log(err);
                  })
                }
            }
            
            this.stopBeatAnim = setTimeout(() => {
                self.beatClass = 'yellowCircle';
            }, 300);
            
        }, self.primaryDuration);

        self.varInt = setInterval(() => {
            if(self.varC <= self.primVarCount - 1){
                self.varC += 1;
            }else{
                self.varC = 1;
            }
        }, self.secondaryDuration);

      },
      stopTimer: function(){
          clearInterval(this.beatInt);
          clearInterval(this.varInt);
          this.beat = 1;
          this.varC = 1;
          this.measure = 0;
      },
      startStop: function(){
          this.hit = 0;
          this.miss = 0;
          if(!this.appRunning){
              this.startTimer();
              this.appRunning = true;
          }else{
              this.stopTimer();
              this.appRunning = false;
          }
      },
      keyDownFunct: function(){
          if(this.appRunning && this.measure > 0){
              if(this.keyUp === null){
                    this.isKeyDown = true;
                    var string = this.varC.toString();
                    if(this.keyDown.includes(string)){
                        this.hit += 1;
                        this.hitClass = "greenCircle greenAnimation";
                    }else{
                        this.miss += 1;
                        this.missClass = "redCircle redAnimation";
                    }
              }else{
                  var string = this.varC.toString();
                    if(this.keyDown.includes(string)){
                        this.hit += 1;
                        this.hitClass = "greenCircle greenAnimation";
                    }else{
                        this.miss += 1;
                        this.missClass = "redCircle redAnimation";
                    }
              }
          }else{
              return null;
          }
          var self = this;
          this.stopAnim = setTimeout(() => {
            this.isKeyDown = false;
            self.hitClass = 'greenCircle';
            self.missClass = 'redCircle';
          }, 300);
      },
      keyUpFunction: function(event){
          if(this.keyUp !== undefined){
              if (event.keyCode == 16) { 
              
            if(this.appRunning && this.measure > 0){
              if(this.keyUp !== null){
                    var string = this.varC.toString();
                    if(this.keyUp.includes(string)){
                        this.hit += 1;
                        this.hitClass = "greenCircle greenAnimation";
                    }else{
                        this.miss += 1;
                        this.missClass = "redCircle redAnimation";
                    }
              }
          }else{
              return null;
          }
        }
      }
          
        var self = this;
          this.stopAnim = setTimeout(() => {
            self.hitClass = 'greenCircle';
            self.missClass = 'redCircle';
          }, 300);
      },
      playSound (sound) {
      if(sound) {
        var audio = new Audio(sound);
        audio.play();
      }
    },
    async player(){
        const self = this;
        const play_er = await axios.get('/api/player/' + this.id).then(function(response){
          self.Player = response.data;
        }).catch(function (err){
            console.log("this is a big daggum error dude. " + err)
        })
      }
  },
  computed:{
    keyDown(){
        return Computed(this.choices, this.choice).keyDown.toString();
    },
    keyUp(){
        if(Computed(this.choices, this.choice).keyUp !== null){
         return Computed(this.choices, this.choice).keyUp.toString();
        }
    },
    primVarCount(){
        return Computed(this.choices, this.choice).primVarCount;
    },
    primaryDuration(){
        return Computed(this.choices, this.choice).primaryDuration;
    },
    secondaryDuration(){
        return Computed(this.choices, this.choice).secondaryDuration;
    },
    image(){
      return Computed(this.choices, this.choice).image;
    }
  },
  created: function () {
      if (process.client) {
        window.addEventListener('keyup', this.keyUpFunction);
        const cookiez = document.cookie.split("=");
        this.id = cookiez[2];
      }
    this.player();
  },
  beforeDestroy: function () {
      if (process.client) {
        window.removeEventListener('keyup', this.keyUpFunction)
    }
  },

}


</script>
<style lang="scss" scoped>
.greenButton{
  @media(max-width: 768px){
    max-width: 100%;
  }
}
.tryAgain{
  @media(max-width: 768px){
    max-width: 50% !important;
  }
}
.desktopMessage{
  @media(max-width: 768px){
    display: none;
  }
}

.mobileButton{
  display: none;
  border-radius: 5px;
  background: #00b637;
  @media(max-width: 768px){
    display: block;
    max-width: 54% !important;
  }
}
  
  
</style>