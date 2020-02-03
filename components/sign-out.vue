<template>
  <div>
    <h2>Welcome {{Player.name}}!</h2>
    <div style="display: flex; justify-content: center; align-items: center;">
      <Stats />|
      <p v-on:click="submit">Sign Out</p>
    </div>
    <!-- <button v-on:click="submit" class="greenButton">Sign Out</button> -->
  </div>
</template>

<script>
const axios = require("axios");
import Stats from "./stats.vue";

export default {
  name: "SignOut",
  components: {
    Stats
  },
  data() {
    return {
      id: "",
      Player: {}
    };
  },
  methods: {
    async submit(e) {
      e.preventDefault();
      const self = this;
      const submit = await axios
        .post("/api/sign-out")
        .then(function(response) {
          console.log(response.data);
          self.$emit("signed-in");
        })
        .catch(function(err) {
          console.log("this is a big daggum error dude. " + err);
        });
    },
    async player() {
      const self = this;
      const play_er = await axios
        .get("/api/player/" + this.id)
        .then(function(response) {
          self.Player = response.data;
        })
        .catch(function(err) {
          console.log("this is a big daggum error dude. " + err);
        });
    }
  },
  mounted() {
    if (process.client) {
      const cookiez = document.cookie.split(";");
      for (let i = 0; i < cookiez.length; i++) {
        var id = cookiez[i].split("=");
        for (let index = 0; index < id.length; index++) {
          // console.log(id[index]);
          if (
            id[index] === "true" ||
            id[index] === "id" ||
            id[index] === " loggedIn"
          ) {
          } else {
            this.id = id[index];
          }
        }
      }
    }
    this.player();
  }
};
</script>
<style lang="scss" scoped>
h2 {
  font-weight: 900;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-family: monospace;
  font-size: 24px;
  text-shadow: 1px 1px 3px #42b983;
}
p {
  color: #87af9d;
  font-style: italic;
  font-weight: 600;
  transition: 0.5s;
  display: inline;
  font-size: 16px;
  padding-left: 3px;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}
</style>

