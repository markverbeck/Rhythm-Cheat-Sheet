<template>
  <div class="signInForm">
    <form action="/api/sign-in" method="post" :style="errorBorder">
      <label for="name">User Name</label>
      <br />
      <input type="text" name="name" v-model="player.name" :style="errorBorder" />
      <br />
      <label for="password">Password</label>
      <br />
      <input type="password" name="password" v-model="player.password" :style="errorBorder" />
      <br />
      <p :style="errorStyle">Please submit correct player information..</p>
      <button v-on:click="submit" class="greenButton">Sign In</button>
    </form>
    <nuxt-link to="/forgot-password">Forgot password?</nuxt-link>
  </div>
</template>

<script>
import Hero from "@/components/Hero.vue";
const axios = require("axios");

export default {
  name: "signInForm",

  components: {
    Hero
  },
  data() {
    return {
      player: {
        name: "",
        password: ""
      },
      errorBorder: {
        border: "",
        transition: ".3s"
      },
      errorStyle: {
        color: "red",
        opacity: 0,
        fontSize: "14px",
        transition: ".3s",
        textAlign: "center"
      }
    };
  },
  methods: {
    async submit(e) {
      e.preventDefault();
      const self = this;
      const submit = await axios
        .post("/api/sign-in", this.player)
        .then(function(response) {
          self.$emit("signed-in");
        })
        .catch(function(err) {
          self.errorBorder.border = "3px solid red";
          self.errorStyle.opacity = 1;
          self.errorStyle.padding = "10px 0";
          console.log("this is a big dagum error dude. " + err);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
a {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  color: #87af9d;
  @media (max-width: 768px) {
    bottom: 4px;
  }
}
.signInForm {
  width: 75%;
  @media (max-width: 768px) {
    width: 100%;
  }
}
form {
  text-align: left;
  border: 3px solid #42b983;
  background: #f7fcfa;
  padding: 20px;
  label {
    font-weight: 500;
    margin-bottom: 2.5rem;
    font-family: monospace;
    font-size: 24px;
    text-shadow: 1px 1px 3px #42b983;
  }
  input {
    height: 3em;
    border-radius: 5px;
    border: 1px solid #42b983;
    width: 100%;
    padding-left: 10px;
  }
  .greenButton {
    border-radius: 5px;
    max-width: 100%;
  }
}
</style>

