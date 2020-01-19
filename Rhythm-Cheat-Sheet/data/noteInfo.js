import Whole from "@/assets/whole-note.png";
import Half from "@/assets/half-note.png";
import Quarter from "@/assets/quarter-note.png";
import Eighth from "@/assets/eighth-note.png";
import Sixteenth from "@/assets/sixteenth-note.png";
import Triplet from "@/assets/tiplets.png";
import Sextuplet from "@/assets/sextuplet.png";
import DottedHalf from "@/assets/dotted-half.png";
import DottedQuarter from "@/assets/dotted-quarter.png";
import SetMilli from "@/helper_functions/SetMilli.js";

var millies = SetMilli(60);

var choices = [
    {
      note: "Whole",
      duration: "4 beats",
      perBeat: "4 beats per Whole Note",
      image: Whole,
      primaryDuration: millies.quarter,
      secondaryDuration: millies.whole,
    }, 
    {
      note: "Half",
      duration: "2 beats",
      perBeat: "2 bears per Half Note",
      image: Half,
      primaryDuration: millies.quarter,
      secondaryDuration: millies.half,
    }, 
    {
      note: "Quarter",
      duration: "1 beat",
      perBeat: "1 Quarter Note per beat",
      image: Quarter,
      primaryDuration: millies.quarter,
      secondaryDuration: millies.quarter,
    }, 
    {
      note: "Eighth",
      duration: "1/2 beat",
      perBeat: "2 Eighth Notes per beat",
      image: Eighth,
      primaryDuration: millies.quarter,
      secondaryDuration: millies.eigth,
    }, 
    {
      note: "Sixteenth",
      duration: "1/4 beat",
      perBeat: "4 Sixteenth Notes per beat",
      image: Sixteenth,
      primaryDuration: millies.quarter,
      secondaryDuration: millies.sixteenth,
    }, 
    {
      note: "Triplet",
      duration: "1/3 beat",
      perBeat: "3 Triplets per beat",
      image: Triplet,
      primaryDuration: millies.quarter,
      secondaryDuration: millies.triplet,
    }, 
    {
      note: "Sextuplet",
      duration: "1/6 beat",
      perBeat: "6 Sextuplets per beat",
      image: Sextuplet,
      primaryDuration: millies.quarter,
      secondaryDuration: millies.sextuplet,
    }, 
    {
      note: "Dotted Half",
      duration: "3 beats",
      perBeat: "3 beats per Dotted Half Note",
      image: DottedHalf,
      primaryDuration: millies.quarter,
      secondaryDuration: millies.dottedHalf,
    }, 
    {
      note: "Dotted Quarter",
      duration: " 1 1/2 beats",
      perBeat: "1 1/2 beats per Dotted Quarter Note",
      image: DottedQuarter,
      primaryDuration: millies.quarter,
      secondaryDuration: millies.dottedQuarter,
    }];

    export default choices;