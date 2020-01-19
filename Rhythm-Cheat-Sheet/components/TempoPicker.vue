<template>
  <div class="tempoPicker">
        <div class="columns wrapper">
            <div  class="column" is-half>
              <h3>Choose Tempo: {{tempoChoice}}</h3>
          <b-field label="">
            <b-select v-model="tempo" placeholder="Select a name">
                <option                  
                    value= 50                 
                    >
                    Slow
                </option>
                <option                  
                    value= 60                 
                    >
                    Medium
                </option>
                <option                  
                    value= 70                 
                    >
                    Fast
                </option>
            </b-select>
            <button v-on:click="tempoPicker(tempo)" class="greenButton">Set Tempo!</button>
        </b-field>
          

            </div>
        </div>
    </div>

</template>

<script>
var choices = [];
for (let index = 60; index < 201; index++) {
  choices.push(index);
  
}

export default {
  name:"tempoPicker",
  props: {
    tempoPicker: Function,
    tempoChoice: String,
  },
  data(){
    return{
      choices: choices,
      tempo: '',
    }
  },
  methods:{
    

  }
}
</script>


