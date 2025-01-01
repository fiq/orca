<script>
  import Piano from './Piano.svelte';
  import Bass from './Bass.svelte';
  import Drum from './Drum.svelte';
  import Ukulele from './Ukulele.svelte';
  import { onMount } from 'svelte';
  import * as Tone from 'tone';

  const startAudioContext = async () => {
    await Tone.start();
    console.log('Audio context started');
  };

  const stopLoops = () => {
    Tone.Transport.stop();
  };
</script>

<main class="p-4 text-center">
  <h1 class="text-2xl font-bold mb-4">Orca: Svelte and Tone.js Instruments</h1>
  <button class="bg-blue-500 text-white py-2 px-4 rounded mb-4" on:click={startAudioContext}>Initialize Audio</button>
  <button class="bg-red-500 text-white py-2 px-4 rounded mb-4" on:click={stopLoops}>Stop All</button>

  <Piano volume={0} modulation={0} />
  <Ukulele volume={0} modulation={0} />
  <Bass volume={0} modulation={0} />
  <Drum volume={0} modulation={0} />
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
