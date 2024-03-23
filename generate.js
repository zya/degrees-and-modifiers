var C1 = 36;

function generate(context, chordProgression) {
  if (!context) return [];

  const progression = chordProgression.split(",");
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

exports.generate = generate;
