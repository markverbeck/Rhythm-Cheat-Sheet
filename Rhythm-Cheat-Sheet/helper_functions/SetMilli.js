  //  This function calculates the milliseconds for each type of rhythm needed to run the setInterval functions and transition times for the animations. 
   
   var setMilli = function(temp){
        var BPMseconds = 60 / temp;
        var BPMmillisecond = BPMseconds * 1000;
        var eigth = BPMmillisecond / 2;
        var sixteenth = eigth / 2;
        var triplet = BPMmillisecond / 3;
        var sextuplet = triplet / 2;
        var half = BPMmillisecond * 2;
        var whole = BPMmillisecond * 4;
        var dottedHalf = half + BPMmillisecond;
        var dottedQuarter = BPMmillisecond + eigth;
  
        var rhythms = {
          quarter: BPMmillisecond,
          eigth: eigth,
          sixteenth: sixteenth,
          triplet: triplet,
          sextuplet: sextuplet,
          half: half,
          whole: whole,
          dottedHalf: dottedHalf,
          dottedQuarter: dottedQuarter
        }
        return rhythms;
      };

      export default setMilli;


    