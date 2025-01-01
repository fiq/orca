<script>
  import { onMount } from 'svelte';
  import * as Tone from 'tone';

  export let volume = 0;
  export let modulation = 0;

  let drum;
  let drumLoop;

  const startDrumLoop = () => {
    drumLoop.start(0);
    Tone.Transport.start();
  };

  const stopDrumLoop = () => {
    drumLoop.stop();
  };

  const updateVolume = (event) => {
    drum.volume.value = event.target.value;
  };

  const updateModulation = (event) => {
    drum.envelope.sustain = event.target.value;
  };

  onMount(() => {
    drum = new Tone.MembraneSynth().toDestination();

    drumLoop = new Tone.Loop(time => {
      drum.triggerAttackRelease('C2', '8n', time);
    }, '4n');
  });
</script>

<div class="controls mb-8">
  <h2 class="text-xl mb-2">Drum</h2>
  <button class="bg-green-500 text-white py-2 px-4 rounded mb-2" on:click={startDrumLoop}>Play Drum</button>
  <button class="bg-red-500 text-white py-2 px-4 rounded mb-2" on:click={stopDrumLoop}>Stop Drum</button>
  <div class="flex items-center">
    <label for="drumVolume" class="mr-2">Volume:</label>
    <input type="range" id="drumVolume" min="-60" max="10" value={volume} on:input={updateVolume} class="mr-4">
    <label for="drumModulation" class="mr-2">Modulation:</label>
    <input type="range" id="drumModulation" min="0" max="1" step="0.01" value={modulation} on:input={updateModulation} class="mr-4">
  </div>
</div>
