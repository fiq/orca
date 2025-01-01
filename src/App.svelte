<script>
  import { onMount } from 'svelte';
  import * as Tone from 'tone';

  let piano, bass, drum;
  let pianoLoop, bassLoop, drumLoop;
  let pianoVolume = 0;
  let bassVolume = 0;
  let drumVolume = 0;
  let pianoModulation = 0;
  let bassModulation = 0;
  let drumModulation = 0;

  const dorianScale = ['C4', 'D4', 'Eb4', 'F4', 'G4', 'A4', 'Bb4', 'C5'];
  let pianoIndex = 0;

  const startAudioContext = async () => {
    await Tone.start();
    console.log('Audio context started');
  };

  const startLoops = () => {
    Tone.Transport.start();
  };

  const stopLoops = () => {
    Tone.Transport.stop();
  };

  const addPianoToLoop = () => {
    pianoLoop.start(0);
    startLoops();
  };

  const stopPianoLoop = () => {
    pianoLoop.stop();
  };

  const addBassToLoop = () => {
    bassLoop.start(0);
    startLoops();
  };

  const stopBassLoop = () => {
    bassLoop.stop();
  };

  const addDrumToLoop = () => {
    drumLoop.start(0);
    startLoops();
  };

  const stopDrumLoop = () => {
    drumLoop.stop();
  };

  const updatePianoVolume = (event) => {
    piano.volume.value = event.target.value;
  };

  const updateBassVolume = (event) => {
    bass.volume.value = event.target.value;
  };

  const updateDrumVolume = (event) => {
    drum.volume.value = event.target.value;
  };

  const updatePianoModulation = (event) => {
    piano.harmonicity.value = event.target.value;
  };

  const updateBassModulation = (event) => {
    bass.filter.frequency.value = event.target.value;
  };

  const updateDrumModulation = (event) => {
    drum.envelope.sustain = event.target.value;
  };

  onMount(() => {
    // Piano setup
    piano = new Tone.Sampler({
      urls: {
        C4: 'piano/C4.mp3',
        D4: 'piano/D4.mp3',
        Eb4: 'piano/Eb4.mp3',
        F4: 'piano/F4.mp3',
        G4: 'piano/G4.mp3',
        A4: 'piano/A4.mp3',
        Bb4: 'piano/Bb4.mp3',
        C5: 'piano/C5.mp3'
      },
    }).toDestination();

      //      baseUrl: "https://github.com/fuhton/piano-mp3/raw/refs/heads/master/piano-mp3/"
    pianoLoop = new Tone.Loop(time => {
      //piano.triggerAttackRelease(dorianScale[pianoIndex], '8n', time);
      piano.triggerAttack(dorianScale[pianoIndex]);
      pianoIndex = (pianoIndex + 1) % dorianScale.length;
    }, '4n');

    // Bass setup
    bass = new Tone.MonoSynth({
      oscillator: {
        type: 'sine'
      },
      filter: {
        type: 'lowpass',
        frequency: 200
      },
      envelope: {
        attack: 0.01,
        decay: 0.5,
        sustain: 0.5,
        release: 1.0
      }
    }).toDestination();

    bassLoop = new Tone.Loop(time => {
      bass.triggerAttackRelease('C2', '8n', time);
    }, '4n');

    // Drum setup
    drum = new Tone.MembraneSynth().toDestination();

    drumLoop = new Tone.Loop(time => {
      drum.triggerAttackRelease('C2', '8n', time);
    }, '4n');
  });
</script>

<main class="p-4 text-center">
  <h1 class="text-2xl font-bold mb-4">Orca: Svelte and Tone.js Instruments</h1>
  <button class="bg-blue-500 text-white py-2 px-4 rounded mb-4" on:click={startAudioContext}>Initialize Audio</button>
  <button class="bg-red-500 text-white py-2 px-4 rounded mb-4" on:click={stopLoops}>Stop All</button>

  <div class="controls mb-8">
    <h2 class="text-xl mb-2">Piano</h2>
    <button class="bg-green-500 text-white py-2 px-4 rounded mb-2" on:click={addPianoToLoop}>Play Piano</button>
    <button class="bg-red-500 text-white py-2 px-4 rounded mb-2" on:click={stopPianoLoop}>Stop Piano</button>
    <div class="flex items-center">
      <label for="pianoVolume" class="mr-2">Volume:</label>
      <input type="range" id="pianoVolume" min="-60" max="10" value={pianoVolume} on:input={updatePianoVolume} class="mr-4">
      <label for="pianoModulation" class="mr-2">Modulation:</label>
      <input type="range" id="pianoModulation" min="0" max="2" step="0.01" value={pianoModulation} on:input={updatePianoModulation} class="mr-4">
    </div>
  </div>

  <div class="controls mb-8">
    <h2 class="text-xl mb-2">Bass</h2>
    <button class="bg-green-500 text-white py-2 px-4 rounded mb-2" on:click={addBassToLoop}>Play Bass</button>
    <button class="bg-red-500 text-white py-2 px-4 rounded mb-2" on:click={stopBassLoop}>Stop Bass</button>
    <div class="flex items-center">
      <label for="bassVolume" class="mr-2">Volume:</label>
      <input type="range" id="bassVolume" min="-60" max="10" value={bassVolume} on:input={updateBassVolume} class="mr-4">
      <label for="bassModulation" class="mr-2">Modulation:</label>
      <input type="range" id="bassModulation" min="0" max="2000" value={bassModulation} on:input={updateBassModulation} class="mr-4">
    </div>
  </div>

  <div class="controls mb-8">
    <h2 class="text-xl mb-2">Drum</h2>
    <button class="bg-green-500 text-white py-2 px-4 rounded mb-2" on:click={addDrumToLoop}>Play Drum</button>
    <button class="bg-red-500 text-white py-2 px-4 rounded mb-2" on:click={stopDrumLoop}>Stop Drum</button>
    <div class="flex items-center">
      <label for="drumVolume" class="mr-2">Volume:</label>
      <input type="range" id="drumVolume" min="-60" max="10" value={drumVolume} on:input={updateDrumVolume} class="mr-4">
      <label for="drumModulation" class="mr-2">Modulation:</label>
      <input type="range" id="drumModulation" min="0" max="1" step="0.01" value={drumModulation} on:input={updateDrumModulation} class="mr-4">
    </div>
  </div>
</main>

<style>
  .controls {
    margin-bottom: 20px;
  }

  .controls label {
    margin-right: 10px;
  }

  .controls input {
    margin-right: 20px;
  }

  button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    margin: 10px;
  }
</style>
