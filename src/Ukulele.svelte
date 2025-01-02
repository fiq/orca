<script>
  import { onMount } from 'svelte';
  import * as Tone from 'tone';
  import { get_scale } from './scales.js';
  export let volume = 0;
  export let modulation = 0;

  const defaultScale = 'mixolydian';
  let ukulele;
  let ukuleleLoop;
  let scale = get_scale('C4', defaultScale);
  let ukuleleIndex = 0;

  const startUkuleleLoop = () => {
    ukuleleLoop.start(0);
    Tone.Transport.start();
  };

  const stopUkuleleLoop = () => {
    ukuleleLoop.stop();
  };

  const updateVolume = (event) => {
    ukulele.volume.value = event.target.value;
  };

  const updateModulation = (event) => {
    // Placeholder for actual modulation logic
  };

  const updateScale = (event) => {
    scale = get_scale('C4', event.target.value);
    console.debug(scale);
  }

  onMount(() => {
    ukulele = new Tone.Sampler({
      urls: {
        G4: 'ukulele/G4.mp3',
        C4: 'ukulele/C4.mp3',
        E4: 'ukulele/E4.mp3',
        A4: 'ukulele/A4.mp3',
      },
      // Adjust the base URL as needed
    }).toDestination();

    ukuleleLoop = new Tone.Loop(time => {
      ukulele.triggerAttack(scale[ukuleleIndex]);
      ukuleleIndex = (ukuleleIndex + 1) % scale.length;
    }, '4n');
  });
</script>

<div class="controls mb-8">
  <h2 class="text-xl mb-2">Ukulele</h2>
  <button class="bg-green-500 text-white py-2 px-4 rounded mb-2" on:click={startUkuleleLoop}>Play Ukulele</button>
  <button class="bg-red-500 text-white py-2 px-4 rounded mb-2" on:click={stopUkuleleLoop}>Stop Ukulele</button>
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
    <label for="ukuleleVolume" class="mr-2">Volume:</label>
    <input type="range" id="ukuleleVolume" min="-60" max="10" value={volume} on:input={updateVolume} class="mr-4">
    <label for="ukuleleModulation" class="mr-2">Modulation:</label>
    <input type="range" id="ukuleleModulation" min="0" max="2" step="0.01" value={modulation} on:input={updateModulation} class="mr-4">
  </div>
</div>
