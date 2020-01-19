<template>
  <div class="tempoPicker">
        <div class="columns wrapper">
            <div  class="column" is-half>
              <!-- <h3>Choose Rhythm: {{theChoice}}</h3> -->
          <b-field label="">
            <b-select v-model="choice" placeholder="Select a name">
                <option
                    v-for="(choices, index) in choices"
                    :value="choices.note"
                    :key="index"
                    >
                    {{ choices.note }}
                </option>
            </b-select>
            <button v-on:click="noteChoice" class="greenButton">Display note</button>
        </b-field>
          

            </div>
        </div>
    </div>

</template>

<script>
import Choices from '@/data/noteInfo.js';

export default {
  name:"tempoPicker",
  props: {
    theChoice: {
      type: String,
      required: true
    }
    
  },
  data(){
    return{
      choices: Choices,
      choice: '',
    }
  },
  methods:{
    noteChoice: function(){
      this.$emit("note-choice", this.choice);
    }
  }
}
</script>


