var { teoria } = require("./teoria");

var C1 = 36;

function includes(array, value) {
  return array.indexOf(value) !== -1;
}

function parseEntry(s) {
  var match = s.match(/^(\d+)(?:\((.*)\))?$/);
  if (!match) {
    throw new Error("The format of string is invalid.");
  }
  var num = Number(match[1]);
  var modifiers = match[2] ? match[2].split("+") : [];
  return [num, modifiers];
}

function getNoteFromScaleIntervals(index, scaleIntervals) {
  if (index < scaleIntervals.length) {
    return scaleIntervals[index];
  }

  return scaleIntervals[index % scaleIntervals.length] + 12;
}

function generate(context, progression) {
  if (!context) return [];

  const chords = [];

  for (var i = 0; i < progression.length; i++) {
    const [chordNumber, modifiers] = parseEntry(progression[i]);

    const scaleOffsetForCurrentChord = Number(chordNumber) - 1;
    const scaleRootNote = C1 + context.scale.root_note;
    const chord = [];

    if (!includes(modifiers, "sd")) {
      const first = {
        pitch:
          scaleRootNote +
          getNoteFromScaleIntervals(
            scaleOffsetForCurrentChord,
            context.scale.scale_intervals
          ),
      };

      const secondIntervalIndexOffset = includes(modifiers, "sus2")
        ? 1
        : includes(modifiers, "sus4")
        ? 3
        : 2;

      const second = {
        pitch:
          scaleRootNote +
          getNoteFromScaleIntervals(
            scaleOffsetForCurrentChord + secondIntervalIndexOffset,
            context.scale.scale_intervals
          ),
      };

      const third = {
        pitch:
          scaleRootNote +
          getNoteFromScaleIntervals(
            scaleOffsetForCurrentChord + 4,
            context.scale.scale_intervals
          ),
      };

      chord.push(first, second, third);

      if (includes(modifiers, "six")) {
        chord.push({
          pitch:
            scaleRootNote +
            getNoteFromScaleIntervals(
              scaleOffsetForCurrentChord + 5,
              context.scale.scale_intervals
            ),
        });
      }

      if (includes(modifiers, "seven")) {
        chord.push({
          pitch:
            scaleRootNote +
            getNoteFromScaleIntervals(
              scaleOffsetForCurrentChord + 6,
              context.scale.scale_intervals
            ),
        });
      }

      if (includes(modifiers, "nine")) {
        chord.push({
          pitch:
            scaleRootNote +
            getNoteFromScaleIntervals(
              scaleOffsetForCurrentChord + 8,
              context.scale.scale_intervals
            ),
        });
      }

      if (includes(modifiers, "eleven")) {
        chord.push({
          pitch:
            scaleRootNote +
            getNoteFromScaleIntervals(
              scaleOffsetForCurrentChord + 10,
              context.scale.scale_intervals
            ),
        });
      }

      if (includes(modifiers, "13")) {
        chord.push({
          pitch:
            scaleRootNote +
            getNoteFromScaleIntervals(
              scaleOffsetForCurrentChord + 12,
              context.scale.scale_intervals
            ),
        });
      }
    } else {
      const chordNotes = getSecondaryDominantNotes(
        scaleRootNote,
        scaleOffsetForCurrentChord,
        context.scale.scale_intervals
      );
      for (var j = 0; j < chordNotes.length; j++) {
        chord.push({
          pitch: chordNotes[j],
        });
      }
    }

    chords.push(chord);
  }

  return chords;
}

function getSecondaryDominantNotes(
  scaleRootNote,
  scaleOffsetForCurrentChord,
  scaleIntervals
) {
  const note = teoria.Note.fromMIDI(
    scaleRootNote +
      getNoteFromScaleIntervals(scaleOffsetForCurrentChord + 4, scaleIntervals)
  );
  return getSecondaryDominant(note);
}

function getSecondaryDominant(root) {
  const chord = teoria.chord(root, "7");
  const notes = chord.notes();
  const midi = [];
  for (var b = 0; b < notes.length; b++) {
    midi.push(notes[b].midi());
  }
  return midi;
}

exports.generate = generate;
exports.parseEntry = parseEntry;
