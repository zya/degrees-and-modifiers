autowatch = 1;
outlets = 1;

var { teoria } = require("./teoria.js");

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

  post(teoria.note());

  const note = {
    pitch: 36,
    start_time: 0,
    velocity: 100,
    duration: 0.25,
  };

  outlet(0, "dictionary", jsonToDict({ notes: [note] }).name);
}

function set_ready() {
  ready = true;
}

function set_context(dummy, dictName) {
  context = dictToJson(dictName);
}
