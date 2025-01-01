<script>
  import { onMount } from 'svelte';
  import * as Tone from 'tone';

  export let volume = 0;
  export let modulation = 0;

  let piano;
  let pianoLoop;
  const dorianScale = ['C4', 'D4', 'Eb4', 'F4', 'G4', 'A4', 'Bb4', 'C5'];
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
      piano.triggerAttack(dorianScale[pianoIndex]);
      pianoIndex = (pianoIndex + 1) % dorianScale.length;
    }, '4n');
  });
</script>

<div class="controls mb-8">
  <h2 class="text-xl mb-2">Piano</h2>
  <button class="bg-green-500 text-white py-2 px-4 rounded mb-2" on:click={startPianoLoop}>Play Piano</button>
  <button class="bg-red-500 text-white py-2 px-4 rounded mb-2" on:click={stopPianoLoop}>Stop Piano</button>
  <div class="flex items-center">
    <label for="pianoVolume" class="mr-2">Volume:</label>
    <input type="range" id="pianoVolume" min="-60" max="10" value={volume} on:input={updateVolume} class="mr-4">
    <label for="pianoModulation" class="mr-2">Modulation:</label>
    <input type="range" id="pianoModulation" min="0" max="2" step="0.01" value={modulation} on:input={updateModulation} class="mr-4">
  </div>
</div>
