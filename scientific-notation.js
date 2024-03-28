var { coords, A4 } = require("./notecoord.js");
var { accval, interval } = require("./accidental-value.js");

exports.scientific = function scientific(name) {
  var format = /^([a-h])(x|#|bb|b?)(-?\d*)/i;

  var parser = name.match(format);
  if (!(parser && name === parser[0] && parser[3].length)) return;

  var noteName = parser[1];
  var octave = +parser[3];
  var accidental = parser[2].length ? parser[2].toLowerCase() : "";

  var accidentalValue = interval(accidental);
  var coord = coords(noteName.toLowerCase());

  coord[0] += octave;
  coord[0] += accidentalValue[0] - A4[0];
  coord[1] += accidentalValue[1] - A4[1];

  return coord;
};
