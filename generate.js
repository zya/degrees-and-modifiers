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

function generate(context, chordProgression) {
  if (!context) return [];

  const progression = chordProgression.split(",");
  const length =
    context.clip.time_selection_end - context.clip.time_selection_start;

  const starTimeOffset = context.clip.time_selection_start;
  const lengthPerChord = length / progression.length;

  const chords = [];
  for (var i = 0; i < progression.length; i++) {
    const [chordNumber, modifiers] = parseEntry(progression[i]);

    post(progression[i], modifiers, modifiers.length);
    const scaleOffsetForCurrentChord = Number(chordNumber) - 1;
    const scaleRootNote = C1 + context.scale.root_note;

    const first = {
      pitch:
        scaleRootNote +
        getNoteFromScaleIntervals(
          scaleOffsetForCurrentChord,
          context.scale.scale_intervals
        ),
      start_time: starTimeOffset + lengthPerChord * i,
      velocity: 100,
      duration: lengthPerChord,
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
      start_time: starTimeOffset + lengthPerChord * i,
      velocity: 100,
      duration: lengthPerChord,
    };

    const third = {
      pitch:
        scaleRootNote +
        getNoteFromScaleIntervals(
          scaleOffsetForCurrentChord + 4,
          context.scale.scale_intervals
        ),
      start_time: starTimeOffset + lengthPerChord * i,
      velocity: 100,
      duration: lengthPerChord,
    };

    chords.push(first, second, third);

    if (includes(modifiers, "six")) {
      chords.push({
        pitch:
          scaleRootNote +
          getNoteFromScaleIntervals(
            scaleOffsetForCurrentChord + 5,
            context.scale.scale_intervals
          ),
        start_time: starTimeOffset + lengthPerChord * i,
        velocity: 100,
        duration: lengthPerChord,
      });
    }

    if (includes(modifiers, "seven")) {
      chords.push({
        pitch:
          scaleRootNote +
          getNoteFromScaleIntervals(
            scaleOffsetForCurrentChord + 6,
            context.scale.scale_intervals
          ),
        start_time: starTimeOffset + lengthPerChord * i,
        velocity: 100,
        duration: lengthPerChord,
      });
    }

    if (includes(modifiers, "nine")) {
      chords.push({
        pitch:
          scaleRootNote +
          getNoteFromScaleIntervals(
            scaleOffsetForCurrentChord + 8,
            context.scale.scale_intervals
          ),
        start_time: starTimeOffset + lengthPerChord * i,
        velocity: 100,
        duration: lengthPerChord,
      });
    }

    if (includes(modifiers, "eleven")) {
      chords.push({
        pitch:
          scaleRootNote +
          getNoteFromScaleIntervals(
            scaleOffsetForCurrentChord + 10,
            context.scale.scale_intervals
          ),
        start_time: starTimeOffset + lengthPerChord * i,
        velocity: 100,
        duration: lengthPerChord,
      });
    }

    if (includes(modifiers, "13")) {
      chords.push({
        pitch:
          scaleRootNote +
          getNoteFromScaleIntervals(
            scaleOffsetForCurrentChord + 12,
            context.scale.scale_intervals
          ),
        start_time: starTimeOffset + lengthPerChord * i,
        velocity: 100,
        duration: lengthPerChord,
      });
    }
  }

  return chords;
}

exports.generate = generate;
exports.parseEntry = parseEntry;
