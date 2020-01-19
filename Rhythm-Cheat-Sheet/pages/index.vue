<template>
  <div class="home bodyDiv">
    <Hero />
    <NotePicker @note-choice="noteChoice" :theChoice="choiceNote"/>
    <NoteCard :style="style" :choice="choiceNote" />
  </div>
</template>

<script>
import NotePicker from "@/components/NotePicker.vue";
import NoteCard from "@/components/NoteCard.vue";
import Hero from "@/components/Hero.vue";



export default {
  name: 'HomePage',

  components: {
    NotePicker,
    NoteCard,
    Hero,
  },
  data(){
    return{
      choiceNote: 'Whole',
      fadeIn: null,
      style: {
        transition: ".5s",
        opacity: 1,
      }
    }
  },
  methods:{
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
