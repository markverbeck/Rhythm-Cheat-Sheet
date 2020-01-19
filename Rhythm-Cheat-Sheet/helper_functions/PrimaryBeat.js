  //  This function handles the animation and beat counter for the primary beat, usually quarter note. 
   
   var primaryBeat = function(beat){
  

   if(beat >= 1){
     beat ++;
   }
   if(beat === 5){
     beat = 1;
   }
   if(beat === ''){
     beat = 1;
   }
   return beat;
      };

   export default primaryBeat;

//  if(this.animationClass === "squareYellow flexNumber"){
          //      this.animationClass = "squareAqua flexNumber"
          //  }else if(this.animationClass === "squareAqua flexNumber"){
          //      this.animationClass = "squareYellow flexNumber"
          //  }

          // if(this.beat >= 1){
          //   this.beat ++;
          // }
          // if(this.beat === 5){
          //   this.beat = 1;
          // }
          // if(this.beat === ''){
          //   this.beat = 1;
          // }