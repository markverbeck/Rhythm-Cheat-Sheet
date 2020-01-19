<template>
 <div class="home homeHero">
  <div class="hero wrapper">
      <div class="columns">
        <div class="column musicBackground" :style="{ backgroundImage: 'url(' + require('@/assets/music-background.png') + ')' }" >
          <h1>Welcome to the Rhythm Cheat Sheat</h1>
          <h2>A simple reference to help with the understanding of rhythm</h2>
        </div>
      </div> 
  </div>
 </div>
</template>

<script>



export default {
  name: 'Hero',

  components: {
    
  },
  data(){
    return{
      
    }
  },
  methods:{
    
  },
  
}
</script>
