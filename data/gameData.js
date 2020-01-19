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
      primVarCount: 4,
      keyDown: [1],
      keyUp: [4],
      image: Whole,
      primaryDuration: millies.quarter,
      secondaryDuration: millies.quarter,
    }, 
    {
      note: "Half",
      primVarCount: 4,
      keyDown: [1,3],
      keyUp: [2,4],
      image: Half,
      primaryDuration: millies.quarter,
      secondaryDuration: millies.quarter,
    }, 
    {
      note: "Quarter",
      primVarCount: 16,
      keyDown: [1,5,9,13],
      keyUp: null,
      image: Quarter,
      primaryDuration: millies.quarter,
      secondaryDuration: millies.sixteenth,
    }, 
    {
      note: "Eighth",
      primVarCount: 16,
      keyDown: [1,3,5,7,9,11,13,15],
      keyUp: null,
      image: Eighth,
      primaryDuration: millies.quarter,
      secondaryDuration: millies.sixteenth,
    }, 
    {
      note: "Sixteenth",
      primVarCount: 32,
      keyDown: [1,3,5,7,9,11,13,15,19,21,23,25,27,29,31],
      keyUp: null,
      image: Sixteenth,
      primaryDuration: millies.quarter,
      secondaryDuration: millies.sixteenth / 2,
    }, 
    {
      note: "Triplet",
      primVarCount: 6,
      keyDown: [1,3,5],
      keyUp: null,
      image: Triplet,
      primaryDuration: millies.quarter,
      secondaryDuration: millies.sextuplet,
    }, 
    {
      note: "Sextuplet",
      primVarCount: 12,
      keyDown: [1,3,5,7,9,11],
      keyUp: null,
      image: Sextuplet,
      primaryDuration: millies.quarter,
      secondaryDuration: millies.sextuplet / 2,
    }, 
    {
      note: "Dotted Half",
      primVarCount: 6,
      keyDown: [1,4],
      keyUp: [3,6],
      image: DottedHalf,
      primaryDuration: millies.quarter,
      secondaryDuration: millies.quarter,
    }, 
    {
      note: "Dotted Quarter",
      primVarCount: 6,
      keyDown: [1,3],
      keyUp: null,
      image: DottedQuarter,
      primaryDuration: millies.quarter,
      secondaryDuration: millies.eigth,
    }];

    export default choices;