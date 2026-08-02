# Degrees & Modifiers - Generador MIDI para Ableton Live

Degrees & Modifiers es un Generador MIDI Max4Live para Ableton Live que permite a los usuarios generar progresiones de acordes complejas especificadas mediante un lenguaje simple.

https://github.com/zya/degrees-and-modifiers/assets/4020253/63d0c3cd-b498-4dc9-8ce4-6ece23186cf8

## Guía de Instalación

1. Descargue el paquete de la última versión desde [aquí](https://github.com/zya/degrees-and-modifiers/releases)
2. Descomprima el paquete y coloque el directorio en el directorio de herramientas MIDI de Ableton
   - En MAC la ubicación es: `/Applications/Ableton Live 12 Suite.app/Contents/App-Resources/Builtin/Devices/MIDI Tools/Transformations/`
   - En Windows la ubicación es: `C:\ProgramData\Ableton\Live 12\Resources\Builtin\Devices\MIDI Tools\Transformations`
3. Reinicie Ableton Live 12
4. Cree un nuevo Clip MIDI y navegue a la sección "Generate" y encuentre "Degrees & Modifiers" en el menú desplegable.

## Cómo Usarlo

Puede usar el dispositivo de una de las dos maneras siguientes:

1. Elegir preset de secuencias de acordes desde el menú desplegable.
2. Introducir su propia secuencia utilizando el cuadro de texto y pulsando intro.

## Formato de la Secuencia

El formato de la secuencia describe la progresión de acordes en un lenguaje muy simple.

Una secuencia en su forma más simple es una lista de números separados por comas. Cada número representa el enésimo [grado](<https://en.wikipedia.org/wiki/Degree_(music)>) de acorde en la escala actual.

Por ejemplo `2,5,1` generará una progresión de acordes que representa los acordes de segundo, quinto y primer grado en la escala seleccionada. En Do Mayor, eso sería Dmin, GMaj y CMaj.

### Modificadores

Cada acorde puede ser modificado con uno o más de los siguientes modificadores.
Los modificadores se representan entre paréntesis al lado del número que representa el grado del acorde. Y se combinan usando `+`.

Por ejemplo:

```
5(sus4),2(sus4+7),1
```

La secuencia anterior tiene un modificador para el acorde 5, dos modificadores para el acorde 2 y ningún modificador para el acorde 1.

#### 7: Acorde de Sétima

Esto extenderá el acorde a un [acorde de séptima](https://en.wikipedia.org/wiki/Seventh_chord). Por ejemplo `5(7)`

#### 9: Acorde de Novena

Esto extenderá el acorde a un [acorde de novena](https://en.wikipedia.org/wiki/Ninth_chord). Por ejemplo `5(9)`

#### 11: Acorde de Undécima

Esto extenderá el acorde a un [acorde de undécima](https://en.wikipedia.org/wiki/Eleventh_chord). Por ejemplo `5(11)`

#### 13: Acorde de Decimotercera

Esto extenderá el acorde a un [acorde de decimotercera](https://en.wikipedia.org/wiki/Thirteenth_chord). Por ejemplo `5(13)`

#### sus2: Acorde Suspendido 2

Generará el [acorde suspendido dos](https://en.wikipedia.org/wiki/Secondary_chord). Por ejemplo: `3(sus2)`

#### sus4: Acorde Suspendido 4

Generará el [acorde suspendido cuatro](https://en.wikipedia.org/wiki/Secondary_chord). Por ejemplo: `3(sus4)`

#### sd: Acorde Dominante Secundario

Generará el [dominante secundario](https://en.wikipedia.org/wiki/Secondary_chord) que tonaliza el grado seleccionado. Por ejemplo: `3(sd),3`

#### parallel: Acorde Paralelo

Generará el [acorde paralelo](https://en.wikipedia.org/wiki/Parallel_and_counter_parallel). Por ejemplo `5(p)`

#### power: Acorde de Fuerza

Generará el [acorde de fuerza](https://en.wikipedia.org/wiki/Power_chord). Por ejemplo `5(power)`

#### add:6: Añade Nota Sexta

Añadirá una sexta al acorde. Por ejemplo `1(add:6)`

#### add:7: Añade Nota Séptima

Añadirá una séptima al acorde. Por ejemplo `1(add:7)`

#### add:9: Añade Nota Novena

Añadirá una novena al acorde. Por ejemplo `1(add:9)`

#### add:11: Añade Nota Undécima

Añadirá una undécima al acorde. Por ejemplo `1(add:11)`

#### add:13: Añade Nota Decimotercera

Añadirá una decimotercera al acorde. Por ejemplo `1(add:13)`

> ⚠️ **Limitación Actual**
>
> Actualmente `sd` y `paralell` pueden usarse individualmente. Cualquier otro modificador será ignorado cuando estos modificadores estén presentes.
