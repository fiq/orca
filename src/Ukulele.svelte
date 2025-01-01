<script>
  import { onMount } from 'svelte';
  import * as Tone from 'tone';

  export let volume = 0;
  export let modulation = 0;

  let ukulele;
  let ukuleleLoop;
  const notes = ['C4', 'D4', 'Eb4', 'F4', 'G4', 'A4', 'Bb4', 'C5'];
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
      ukulele.triggerAttack(notes[ukuleleIndex]);
      ukuleleIndex = (ukuleleIndex + 1) % notes.length;
    }, '4n');
  });
</script>

<div class="controls mb-8">
  <h2 class="text-xl mb-2">Ukulele</h2>
  <button class="bg-green-500 text-white py-2 px-4 rounded mb-2" on:click={startUkuleleLoop}>Play Ukulele</button>
  <button class="bg-red-500 text-white py-2 px-4 rounded mb-2" on:click={stopUkuleleLoop}>Stop Ukulele</button>
  <div class="flex items-center">
    <label for="ukuleleVolume" class="mr-2">Volume:</label>
    <input type="range" id="ukuleleVolume" min="-60" max="10" value={volume} on:input={updateVolume} class="mr-4">
    <label for="ukuleleModulation" class="mr-2">Modulation:</label>
    <input type="range" id="ukuleleModulation" min="0" max="2" step="0.01" value={modulation} on:input={updateModulation} class="mr-4">
  </div>
</div>
