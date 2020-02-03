<template>
  <section>
    <p class="button is-primary is-medium" @click="player">Stats</p>
    <b-modal :active.sync="isImageModalActive">
      <div class="modalDiv">
        <h1 style="text-align: center; text-decoration: underline;">{{Player.name}}'s Stats:</h1>
        <ul>
          <li v-for="(playerScore, index) in Player.scores" :key="index">
            <h2>{{playerScore.name}}:</h2>
            <p>{{playerScore.score}}%</p>
            <h3
              style="color: #cd7f32;"
              v-if="playerScore.score >= 70 && playerScore.score < 80"
            >&#9733;</h3>
            <h3
              style="color: #C0C0C0;"
              v-if="playerScore.score >= 80 && playerScore.score < 90"
            >&#9733;</h3>
            <h3
              style="color: #D4AF37;"
              v-if="playerScore.score >= 90 && playerScore.score <= 100"
            >&#9733;</h3>
          </li>
        </ul>
      </div>
    </b-modal>
  </section>
</template>

<script>
const axios = require("axios");
export default {
  name: "Stats",
  data() {
    return {
      isImageModalActive: false,
      timeout: "",
      Player: {}
    };
  },
  methods: {
    async player() {
      const self = this;
      const play_er = await axios
        .get("/api/player/" + this.id)
        .then(function(response) {
          self.Player = response.data;
          self.isImageModalActive = true;
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
  }
};
</script>
<style lang="scss" scoped>
p {
  color: #87af9d !important;
  background: transparent !important;
  font-style: italic;
  font-weight: 600 !important;
  transition: 0.5s !important;
  display: inline !important;
  font-size: 16px !important;
  display: inline !important;
  padding: 0 !important;
  height: fit-content;
  margin-right: 3px;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

.modalDiv {
  background: #fff;
  text-align: left;
  width: 35%;
  margin: auto;
  padding: 2em 0;
  border: 6px solid #42b983;
  border-radius: 5px;
  @media (max-width: 768px) {
    width: 50%;
  }
  @media (max-width: 500px) {
    width: 95%;
  }
}
h2 {
  font-weight: 900;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-family: monospace;
  font-size: 24px;
  text-shadow: 1px 1px 3px #42b983;
  display: inline;
}
ul {
  width: 66%;
  margin: auto;
}
h3 {
  display: inline;
}
</style>