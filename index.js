autowatch = 1;
outlets = 1;

// var { teoria } = require("./teoria.js");

var ready = true;
var context = {};

function jsonToDict(json_representation) {
  var dict = new Dict();
  dict.parse(JSON.stringify(json_representation));
  return dict;
}

function dictToJson(dictionary_name) {
  var dict = new Dict(dictionary_name);
  var string_representation = dict.stringify();
  return JSON.parse(string_representation);
}

function bang() {
  if (!ready) return;

  const notes = generateBasedOnContext(context);

  outlet(0, "dictionary", jsonToDict({ notes: notes }).name);
}

function set_ready() {
  ready = true;
}

function set_context(dummy, dictName) {
  context = dictToJson(dictName);
}

var C1 = 36;

function generateBasedOnContext(context) {
  if (!context) return [];

  const progression = ["2", "5", "1", "1"];
  const length =
    context.clip.time_selection_end - context.clip.time_selection_start;

  const starTimeOffset = context.clip.time_selection_start;
  const lengthPerChord = length / progression.length;

  const chords = [];
  for (var i = 0; i < progression.length; i++) {
    const chordNumber = progression[i];
    const scaleOffsetForCurrentChord = Number(chordNumber) - 1;
    const scaleRootNote = C1 + context.scale.root_note;

    chords.push({
      pitch:
        scaleRootNote +
        context.scale.scale_intervals[scaleOffsetForCurrentChord],
      start_time: starTimeOffset + lengthPerChord * i,
      velocity: 100,
      duration: lengthPerChord,
    });
    chords.push({
      pitch:
        scaleRootNote +
        context.scale.scale_intervals[
          (scaleOffsetForCurrentChord + 2) %
            context.scale.scale_intervals.length
        ],
      start_time: starTimeOffset + lengthPerChord * i,
      velocity: 100,
      duration: lengthPerChord,
    });
    chords.push({
      pitch:
        scaleRootNote +
        context.scale.scale_intervals[
          (scaleOffsetForCurrentChord + 4) %
            context.scale.scale_intervals.length
        ],
      start_time: starTimeOffset + lengthPerChord * i,
      velocity: 100,
      duration: lengthPerChord,
    });
  }

  return chords;
}

exports.generateBasedOnContext = generateBasedOnContext;
