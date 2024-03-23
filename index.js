autowatch = 1;
outlets = 2;

var ready = true;
var context = {};
var { generate } = require("./generate");
var chordProgression = "2,5,1,1";

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

  const notes = generate(context, chordProgression);
  outlet(0, "dictionary", jsonToDict({ notes: notes }).name);
}

function set_ready() {
  ready = true;
}

function set_context(dummy, dictName) {
  context = dictToJson(dictName);
}

function set_chord_progression() {
  const args = arrayfromargs(messagename, arguments);

  chordProgression = args
    .join("")
    .replace("set_chord_progression", "")
    .replace("text", "")
    .replace(/0/g, ",");

  change();
}

function change() {
  if (ready) {
    outlet(1, "bang");
  }
}
