var { Note } = require("./note.js");
var { Interval } = require("./interval");
var { Chord } = require("./chord");
var { Scale } = require("./scale");
var { sugar } = require("./sugar.js");

var teoria;

// never thought I would write this, but: Legacy support
function intervalConstructor(from, to) {
  // Construct a Interval object from string representation
  if (typeof from === "string") return Interval.toCoord(from);

  if (typeof to === "string" && from instanceof Note)
    return Interval.from(from, Interval.toCoord(to));

  if (to instanceof Interval && from instanceof Note)
    return Interval.from(from, to);

  if (to instanceof Note && from instanceof Note)
    return Interval.between(from, to);

  throw new Error("Invalid parameters");
}

intervalConstructor.toCoord = Interval.toCoord;
intervalConstructor.from = Interval.from;
intervalConstructor.between = Interval.between;
intervalConstructor.invert = Interval.invert;

function noteConstructor(name, duration) {
  if (typeof name === "string") return Note.fromString(name, duration);
  else return new Note(name, duration);
}

noteConstructor.fromString = Note.fromString;
noteConstructor.fromKey = Note.fromKey;
noteConstructor.fromFrequency = Note.fromFrequency;
noteConstructor.fromMIDI = Note.fromMIDI;

function chordConstructor(name, symbol) {
  if (typeof name === "string") {
    var root, octave;
    root = name.match(/^([a-h])(x|#|bb|b?)/i);
    if (root && root[0]) {
      octave = typeof symbol === "number" ? symbol.toString(10) : "4";
      return new Chord(
        Note.fromString(root[0].toLowerCase() + octave),
        name.substr(root[0].length)
      );
    }
  } else if (name instanceof Note) return new Chord(name, symbol);

  throw new Error("Invalid Chord. Couldn't find note name");
}

function scaleConstructor(tonic, scale) {
  tonic = tonic instanceof Note ? tonic : teoria.note(tonic);
  return new Scale(tonic, scale);
}

teoria = {
  note: noteConstructor,
  chord: chordConstructor,
  interval: intervalConstructor,
  scale: scaleConstructor,
  Note: Note,
  Chord: Chord,
  Scale: Scale,
  Interval: Interval,
};

// sugar(teoria);

exports.teoria = teoria;

// exports.test = function () {
//   return "test";
// };

// exports.Note = Note;
// exports.Scale = Scale;
// exports.Interval = Interval;
// exports.Chord = Chord;
