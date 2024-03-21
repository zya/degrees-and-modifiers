var accidentalValues = {
  bb: -2,
  b: -1,
  "": 0,
  "#": 1,
  x: 2,
};

exports = function accidentalNumber(acc) {
  return accidentalValues[acc];
};

exports.interval = function accidentalInterval(acc) {
  var val = accidentalValues[acc];
  return [-4 * val, 7 * val];
};
