<script>
  import { onMount } from 'svelte';
  import * as Tone from 'tone';

  export let volume = 0;
  export let modulation = 0;

  let bass;
  let bassLoop;

  const startBassLoop = () => {
    bassLoop.start(0);
    Tone.Transport.start();
  };

  const stopBassLoop = () => {
    bassLoop.stop();
  };

  const updateVolume = (event) => {
    bass.volume.value = event.target.value;
  };

  const updateModulation = (event) => {
    bass.filter.frequency.value = event.target.value;
  };

  onMount(() => {
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
  });
</script>

<div class="controls mb-8">
  <h2 class="text-xl mb-2">Bass</h2>
  <button class="bg-green-500 text-white py-2 px-4 rounded mb-2" on:click={startBassLoop}>Play Bass</button>
  <button class="bg-red-500 text-white py-2 px-4 rounded mb-2" on:click={stopBassLoop}>Stop Bass</button>
  <div class="flex items-center">
    <label for="bassVolume" class="mr-2">Volume:</label>
    <input type="range" id="bassVolume" min="-60" max="10" value={volume} on:input={updateVolume} class="mr-4">
    <label for="bassModulation" class="mr-2">Modulation:</label>
    <input type="range" id="bassModulation" min="0" max="2000" value={modulation} on:input={updateModulation} class="mr-4">
  </div>
</div>
