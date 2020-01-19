<template>
  <div class="forgotPassword bodyDiv">
    <div v-if="!userName" class="formDiv" :style="errorBorder">
        <form>
            <label for="userName">User Name:</label><br>
            <div class="inline-input">
              <input type="text" v-model="name" :style="errorBorder"/><br>
              <button class="greenButton" v-on:click="checkUN">Submit</button><br>
            </div>
            <p :style="errorStyle">Please submit correct username <br> (case sensative)..</p>
        </form>
    </div>
    <div v-if="userName && !answered" class="formDiv" :style="errorBorder">
      <form>
        <label for="answer">Your favorite {{player.fav}}?</label>
        <div class="inline-input">
              <input type="text" v-model="answer" :style="errorBorder"/><br>
              <button class="greenButton" v-on:click="checkAnswer">Submit</button><br>
            </div>
        <p :style="errorStyle">Please submit correct answer <br> (case sensative)..</p>
      </form>
    </div>

    <div v-if="answered" class="passwordDiv" :style="errorBorder">
      <form>
        <label for="password">Change password</label><br>
        <input type="password" v-model="password" :style="errorBorder"/><br>
        <label for="passwordVerify">Verify password</label><br>
        <input type="password" v-model="passwordVerify" :style="errorBorder"/><br>
        <button class="greenButton" v-on:click="changePassword">Submit</button><br>
        <p :style="errorStyle">Passwords must match <br> (case sensative)..</p>
      </form>
    </div>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  name: 'ForgotPassword',

  components: {
    
  },
  head: {
    meta: [
      { hid: "robots", name: "robots", content: "noindex nofollow" }
    ]
  },
  data(){
    return{
      userName: false,
      name: '',
      answer: '',
      answered: false,
      password: '',
      passwordVerify: '',
      player: {},
      errorBorder:{
          border: '',
          transition: '.3s',
          
        },
        errorStyle:{
          color: "red",
          opacity: 0,
          fontSize: '14px',
          transition: '.3s',
          textAlign: "center"
        }
    }
  },
  methods:{
    checkUN: function(e){
        e.preventDefault();
        const self = this;
        axios.get('/api/change-password/' + this.name ).then(function(response){
          self.userName = true
          console.log("This is the response: " + response);
          self.player = response.data;
          self.errorBorder.border = "";
          self.errorStyle.opacity = 0;
          self.errorStyle.padding = "";
        }).catch(function(err){
          self.errorBorder.border = "3px solid red";
          self.errorStyle.opacity = 1;
          self.errorStyle.padding = "10px 0";
          console.log("this is a big daggum error dude. " + err);
        });
    },
    checkAnswer: function(e){
      e.preventDefault();
      if(this.answer == this.player.answer){
        this.answered = true;
        this.errorBorder.border = "";
        this.errorStyle.opacity = 0;
        this.errorStyle.padding = "";
      }else{
        this.errorBorder.border = "3px solid red";
        this.errorStyle.opacity = 1;
        this.errorStyle.padding = "10px 0";
      }
    },
    changePassword: function(e){
      e.preventDefault();
      if(this.password == this.passwordVerify && this.password.length > 0){
        console.log("passwords match");
        this.errorBorder.border = "";
        this.errorStyle.opacity = 0;
        this.errorStyle.padding = "";
        const self = this;
        axios.post('/api/change-password', {id: this.player.id, password: this.password}).then(function(response){
          console.log("Password Changed");
          self.$router.push('/game');
        }).catch(function(err){
          console.log("this is a big daggum error dude. " + err);
        })
      }else{
        this.errorBorder.border = "3px solid red";
        this.errorStyle.opacity = 1;
        this.errorStyle.padding = "10px 0";
      }
    },
  },
  
}
</script>

<style lang="scss" scoped>
.forgotPassword{
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    @media(max-width: 768px){
      padding: 0 2em ;
    }
    
}
  .formDiv{
    text-align: left;
    border: 3px solid #42b983;
    background: #f7fcfa;
    padding: 20px;
    width: 20em;
    background: #fff;
    @media(max-width: 768px){
      width: 100%;
    }
    label{
      font-weight: 500;
    margin-bottom: 2.5rem;
    font-family: monospace;
    font-size: 24px;
    text-shadow: 1px 1px 3px #42b983;
    padding-bottom: 1em;
    }
    input{
      height: 3em;
      border-radius: 5px 0 0 5px;
      border: 1px solid #42b983;
      width: 50%;
      margin-top: 1em;
      padding-left: 10px;
    }
    .greenButton{
      border-radius: 0 5px 5px 0;
      max-width: 100%;
      width: 50%;
      height: 3em;
      margin-top: 1em;
    }
  }

  .passwordDiv{
    text-align: left;
    border: 3px solid #42b983;
    background: #f7fcfa;
    padding: 20px;
    width: 20em;
    background: #fff;
    @media(max-width: 768px){
      width: 100%;
    }
    label{
      font-weight: 500;
    margin-bottom: 2.5rem;
    font-family: monospace;
    font-size: 24px;
    text-shadow: 1px 1px 3px #42b983;
    padding-bottom: 1em;
    }
    input{
      height: 3em;
      border-radius: 5px;
      border: 1px solid #42b983;
      width: 100%;
      margin-top: 1em;
      padding-left: 10px;
    }
    .greenButton{
      border-radius: 5px;
      max-width: 100%;
      width: 100%;
      height: 3em;
      margin-top: 1em;
    }
  }
</style>
