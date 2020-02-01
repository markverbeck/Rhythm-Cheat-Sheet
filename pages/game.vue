<template>
  <div :key="key" class="bodyDiv">
    <div class="home" v-if="loggedIn">
      <Hero />
      <SignOut @signed-in="signedIn" />
      <NotePicker @note-choice="noteChoice" :theChoice="choiceNote" />
      <GameCard :style="style" :choice="choiceNote" />
    </div>
    <div class="forms" v-if="!loggedIn">
      <div class="columns is-4">
        <div class="column">
          <h2 v-on:click="signIn = !signIn" v-if="!signIn">Sign In</h2>
          <SignIn v-if="signIn" @signed-in="signedIn" />
        </div>
        <div class="column" is-one-half-widescreen>
          <h2 v-on:click="createNew = !createNew" v-if="!createNew">Create New Player</h2>
          <CreateNew v-if="createNew" @signed-in="signedIn" />
        </div>
      </div>
    </div>
    <h2 class="comingSoon">
      Mobile version coming soon...
      <br />Please enjoy the Rhythm Cheat Sheet game on your desktop!
    </h2>
  </div>
</template>

<script>
import NotePicker from "@/components/NotePicker.vue";
import Hero from "@/components/Hero.vue";
import GameCard from "@/components/gameCard.vue";
import SignIn from "@/components/sign-in.vue";
import CreateNew from "@/components/create-new.vue";
import SignOut from "@/components/sign-out.vue";

export default {
  name: "HomePage",

  components: {
    NotePicker,
    Hero,
    GameCard,
    SignIn,
    CreateNew,
    SignOut
  },
  head: {
    meta: [
      {
        hid: "og:title",
        property: "og:title",
        content: "A game designed to help with understanding basic rhythm"
      },
      {
        hid: "description",
        name: "description",
        content:
          "A game that is designed to help with understanding the basic concepts of rhythm and music."
      },
      { hid: "robots", name: "robots", content: "index follow" }
    ]
  },
  data() {
    return {
      choiceNote: "Whole",
      fadeIn: null,
      style: {
        transition: ".5s",
        opacity: 1
      },
      stats: [],
      loggedIn: false,
      signIn: false,
      createNew: false,
      key: 1
    };
  },
  methods: {
    noteChoice: function(choice) {
      this.style.opacity = 0;
      var self = this;
      this.fadeIn = setTimeout(function() {
        self.choiceNote = choice;
        self.style.opacity = 1;
      }, 500);
    },
    signedIn: function() {
      this.loggedIn = !this.loggedIn;
      this.signIn = false;
      this.createNew = false;
    }
  },
  mounted() {
    if (process.client) {
      if (document.cookie) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.comingSoon {
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
}

.bodyDiv {
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    padding: 20px;
    justify-content: center;
  }
}
.forms {
  margin-top: 7em;
  .column {
    width: 100%;
    max-width: 600px;
    border: 3px solid #42b983;
    margin: auto;
    height: 40vh;
    display: -webkit-box;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    background: #fff;
    @media (max-width: 1200px) {
      max-width: 500px;
    }
    @media (max-width: 1000px) {
      max-width: 350px;
      height: 45vh;
    }
    @media (max-width: 768px) {
      max-width: 600px;
      height: auto;
      margin: 2em auto;
      padding: 2em !important;
    }
  }
  .columns {
    align-items: center;
    height: inherit;
  }
  @media (max-width: 768px) {
    display: none;
    padding: 0 1em;
    margin-top: 0em;
  }
}
h2 {
  font-weight: 500;
  // margin-bottom: 2.5rem;
  font-family: monospace;
  font-size: 24px;
  text-shadow: 1px 1px 3px #42b983;
  transition: 0.5s;
  &:hover {
    cursor: pointer;
    transform: scale(1.5);
  }
  @media (max-width: 1000px) {
    font-size: 18px;
  }
}

.home {
  @media (max-width: 768px) {
    display: none;
  }
}
</style>
