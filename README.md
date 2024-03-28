# Degrees & Modifiers - Ableton Live MIDI Generator

Chords & Modifiers is a Max4Live MIDI Generator for Ableton Live that allows users to generate complex chord progressions specified using simple language.

https://github.com/zya/degrees-and-modifiers/assets/4020253/63d0c3cd-b498-4dc9-8ce4-6ece23186cf8

## Installation Guide

1. Download the latest version package from [here](https://github.com/zya/degrees-and-modifiers/releases)
2. Unzip the package and place the directory in Ableton's MIDI tools directory
   - On MAC the location is: `/Applications/Ableton Live 12 Suite.app/Contents/App-Resources/Builtin/Devices/MIDI Tools/Transformations/`
   - On Windows the location is: `C:\ProgramData\Ableton\Live 12\Resources\Builtin\Devices\MIDI Tools\Transformations`
3. Restart Ableton Live 12
4. Create a new MIDI Clip and navigate to the "Generate" section and find "Degrees & Modifiers" from the dropdown menu.

## How to Use

You can use the device one of the two ways below:

1. Choose chord sequence presets from the dropdown.
2. Enter your own sequence using the text box & pressing enter.

## Sequence format

The sequence format describes the chord progression in a very simple language.

A sequence in it's simplest term is a comma separated list of numbers. Each number representing the nth [degree](<https://en.wikipedia.org/wiki/Degree_(music)>) chord in the current scale.

For example `2,5,1` will generate a chord progression representing second, fifth and first degree chords in the selected scale. In C Major, that would be Dmin, GMaj and CMaj.

### Modifiers

Each chord can be modified with one or more of the following modifiers.
The modifiers are represented in parentheses next the number representing the chord degree. And are combined using `+`.

For example:

```
5(sus4),2(sus4+7),1
```

The above sequence has one modifier for the 5 chord, two modifiers for the 2 chord and no modifiers for the 1 chord.

#### 7: Seventh Chord

This will extend the chord to a [seventh chord](https://en.wikipedia.org/wiki/Seventh_chord). For example `5(7)`

#### 9: Ninth Chord

This will extend the chord to a [ninth chord](https://en.wikipedia.org/wiki/Ninth_chord). For example `5(9)`

#### 11: Eleventh Chord

This will extend the chord to a [eleventh chord](https://en.wikipedia.org/wiki/Eleventh_chord). For example `5(11)`

#### 13: Eleventh Chord

This will extend the chord to a [thirteenth chord](https://en.wikipedia.org/wiki/Thirteenth_chord). For example `5(13)`

#### sus2: Suspended 2 Chord

This will generate the [suspended two chord](https://en.wikipedia.org/wiki/Secondary_chord). For example: `3(sus2)`

#### sus4: Suspended 4 Chord

This will generate the [suspended four chord](https://en.wikipedia.org/wiki/Secondary_chord). For example: `3(sus4)`

#### sd: Secondary Dominant Chord

This will generate the [secondary dominant](https://en.wikipedia.org/wiki/Secondary_chord) tonicising the selected degree. For example: `3(sd),3`

#### parallel: Parallel Chord

This will generate the [parallel chord](https://en.wikipedia.org/wiki/Parallel_and_counter_parallel). For example `5(p)`

#### power: Power Chord

This will generate the [power chord](https://en.wikipedia.org/wiki/Power_chord). For example `5(power)`

#### add:6: Adds 6th note

This will add a 6th to the chord. For example `1(add:6)`

#### add:7: Adds 7th note

This will add a 7th to the chord. For example `1(add:7)`

#### add:9: Adds 9th note

This will add a 9th to the chord. For example `1(add:9)`

#### add:11: Adds 11th note

This will add a 11th to the chord. For example `1(add:11)`

#### add:13: Adds 13th note

This will add a 13th to the chord. For example `1(add:13)`

> ⚠️ **Current Limitation**
>
> Currently `sd` and `parallel` can only be used individually. Any other modifiers will be ignored when these modifiers are present.
