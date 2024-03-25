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

function getNote(
  scaleRootNote,
  currentChordRootOffset,
  offset,
  scaleIntervals
) {
  return (
    scaleRootNote +
    getNoteFromScaleIntervals(currentChordRootOffset + offset, scaleIntervals)
  );
}

function getNotesForOffsets(
  scaleRootNote,
  scaleOffsetForCurrentChord,
  offsetsToAdd,
  scaleIntervals
) {
  var notes = [];
  for (var i = 0; i < offsetsToAdd.length; i++) {
    notes.push({
      pitch: getNote(
        scaleRootNote,
        scaleOffsetForCurrentChord,
        offsetsToAdd[i],
        scaleIntervals
      ),
    });
  }
  return notes;
}

function generate(context, progression) {
  if (!context) return [];

  const chords = [];

  for (var i = 0; i < progression.length; i++) {
    const [chordNumber, modifiers] = parseEntry(progression[i]);

    const scaleOffsetForCurrentChord = Number(chordNumber) - 1;
    const scaleRootNote = C1 + context.scale.root_note;
    var chord = [];

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
        pitch: getNote(
          scaleRootNote,
          scaleOffsetForCurrentChord,
          secondIntervalIndexOffset,
          context.scale.scale_intervals
        ),
      };

      const third = {
        pitch: getNote(
          scaleRootNote,
          scaleOffsetForCurrentChord,
          4,
          context.scale.scale_intervals
        ),
      };

      chord.push(first);

      if (!includes(modifiers, "power")) {
        chord.push(second);
      }

      chord.push(third);

      if (includes(modifiers, "add:6")) {
        chord.push({
          pitch: getNote(
            scaleRootNote,
            scaleOffsetForCurrentChord,
            5,
            context.scale.scale_intervals
          ),
        });
      }

      if (includes(modifiers, "add:7") || includes(modifiers, "7")) {
        chord.push({
          pitch: getNote(
            scaleRootNote,
            scaleOffsetForCurrentChord,
            6,
            context.scale.scale_intervals
          ),
        });
      }

      if (includes(modifiers, "9")) {
        chord = chord.concat(
          getNotesForOffsets(
            scaleRootNote,
            scaleOffsetForCurrentChord,
            [6, 8],
            context.scale.scale_intervals
          )
        );
      }

      if (includes(modifiers, "add:9")) {
        chord.push({
          pitch: getNote(
            scaleRootNote,
            scaleOffsetForCurrentChord,
            8,
            context.scale.scale_intervals
          ),
        });
      }

      if (includes(modifiers, "add:11")) {
        chord.push({
          pitch: getNote(
            scaleRootNote,
            scaleOffsetForCurrentChord,
            10,
            context.scale.scale_intervals
          ),
        });
      }

      if (includes(modifiers, "11")) {
        chord = chord.concat(
          getNotesForOffsets(
            scaleRootNote,
            scaleOffsetForCurrentChord,
            [6, 8, 10],
            context.scale.scale_intervals
          )
        );
      }

      if (includes(modifiers, "add:13")) {
        chord.push({
          pitch: getNote(
            scaleRootNote,
            scaleOffsetForCurrentChord,
            12,
            context.scale.scale_intervals
          ),
        });
      }

      if (includes(modifiers, "13")) {
        chord = chord.concat(
          getNotesForOffsets(
            scaleRootNote,
            scaleOffsetForCurrentChord,
            [6, 8, 10, 12],
            context.scale.scale_intervals
          )
        );
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
