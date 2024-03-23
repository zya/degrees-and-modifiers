const { generateBasedOnContext } = require("./index");
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

console.log(generateBasedOnContext(context));
