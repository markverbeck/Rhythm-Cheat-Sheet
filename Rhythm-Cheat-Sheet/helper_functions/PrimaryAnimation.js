  //  This function handles the animation 
   
   var primaryAnimation = function(aniClass){
    
    if(aniClass === "squareYellow flexNumber"){
        aniClass = "squareAqua flexNumber"
    }else if(aniClass === "squareAqua flexNumber"){
        aniClass = "squareYellow flexNumber"
    }

   return aniClass;
      };

   export default primaryAnimation;
