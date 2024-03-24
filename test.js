const { generate, parseEntry } = require("./generate");
const context = {
  clip: {
    time_selection_start: 0.0,
    time_selection_end: 4.0,
    insert_marker_time: 0.0,
    first_note_start: 0.9,
    last_note_end: 0.25,
    lowest_pitch: 36,
    highest_pitch: 36,
  },
  scale: {
    scale_mode: 1, // this one is 0 when scale is turned off in clip view
    root_note: 1, // starting from c - 12 options
    scale_intervals: [0, 2, 4, 5, 7, 9, 11], // this one represents the scale selected in semitones
  },
  grid: {
    interval: 0.25,
    enabled: 1,
  },
};

// console.log(generate(context, "2,5,1"), "\n");
// console.log(generate(context, "2(sus2),5(seven),1,1"), "\n");
// console.log(generate(context, "2(modifier1+modifier2),5,1"));

// console.log(parseEntry("2"));
// console.log(parseEntry("2(modifier)"));
// console.log(parseEntry("2(modifier1 modifier2)"));
// console.log(parseEntry("1(seven+nine+eleven)"));

console.log(generate(context, "2,2(sd)"));
