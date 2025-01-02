<script>
  import { onMount } from 'svelte';
  import * as Tone from 'tone';
  import {get_scale} from './scales.js';

  export let volume = 0;
  export let modulation = 0;
  const defaultScale = 'dorian';

  let piano;
  let pianoLoop;
  let scale = get_scale('C4', defaultScale);
  let pianoIndex = 0;

  const startPianoLoop = () => {
    pianoLoop.start(0);
    Tone.Transport.start();
  };

  const stopPianoLoop = () => {
    pianoLoop.stop();
  };

  const updateVolume = (event) => {
    piano.volume.value = event.target.value;
  };

  const updateModulation = (event) => {
    // Placeholder for actual modulation logic
  };

  const updateScale = (event) => {
    const scale_type = event.target.value;
    scale = get_scale('C4', scale_type);
    console.debug(scale);
  }

  onMount(() => {
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
      // Adjust the base URL as needed
    }).toDestination();

    pianoLoop = new Tone.Loop(time => {
      piano.triggerAttack(scale[pianoIndex]);
      pianoIndex = (pianoIndex + 1) % scale.length;
    }, '4n');
  });
</script>

<div class="controls mb-8">
  <h2 class="text-xl mb-2">Piano</h2>
  <button class="bg-green-500 text-white py-2 px-4 rounded mb-2" on:click={startPianoLoop}>Play Piano</button>
  <button class="bg-red-500 text-white py-2 px-4 rounded mb-2" on:click={stopPianoLoop}>Stop Piano</button>
  <select on:input={updateScale} class="mr-4">
    <option value='ionian'>Ionian(Major)</option>
    <option selected value='dorian'>Dorian</option>
    <option value='phyrigian'>Phyrigian</option>
    <option value='lydian'>Lydian</option>
    <option value='mixolydian'>Mixolydian</option>
    <option value='aeolian'>Aeolian(minor)</option>
    <option value='locrian'>Locrian</option>
  </select>

  <div class="flex items-center">
    <label for="pianoVolume" class="mr-2">Volume:</label>
    <input type="range" id="pianoVolume" min="const -60" max="10" value={volume} on:input={updateVolume} class="mr-4">
    <label for="pianoModulation" class="mr-2">Modulation:</label>
    <input type="range" id="pianoModulation" min="0" max="2" step="0.01" value={modulation} on:input={updateModulation} class="mr-4">
 </div>
</div>
