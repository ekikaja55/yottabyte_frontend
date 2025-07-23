<script>
  import { onMount } from 'svelte';
  import io from 'socket.io-client';

  let socket;
  let roomId = 'default-room'; // bisa ganti nanti
  let audio;
  let isHost = false;
  let currentTime = 0;

  onMount(() => {
    socket = io('yottabytebackend-production.up.railway.app'); // ganti URL ini

    socket.emit('join-room', roomId);

    socket.on('sync-play', (timestamp) => {
      if (!isHost) {
        audio.currentTime = timestamp;
        audio.play();
      }
    });

    socket.on('sync-pause', (timestamp) => {
      if (!isHost) {
        audio.currentTime = timestamp;
        audio.pause();
      }
    });

    socket.on('sync-time', (timestamp) => {
      if (!isHost) {
        audio.currentTime = timestamp;
      }
    });
  });

  function handlePlay() {
    isHost && socket.emit('sync-play', { roomId, timestamp: audio.currentTime });
  }

  function handlePause() {
    isHost && socket.emit('sync-pause', { roomId, timestamp: audio.currentTime });
  }

  function toggleHost() {
    isHost = !isHost;
  }
</script>

<style>
  audio {
    width: 100%;
    margin-top: 1rem;
  }
</style>

<h1>ByteDance x ByteSpace 🎧</h1>
<p>Room ID: {roomId}</p>
<button on:click={toggleHost}>
  {isHost ? 'You are HOST' : 'Become Host'}
</button>

<audio
  bind:this={audio}
  src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  on:play={handlePlay}
  on:pause={handlePause}
  controls
></audio>
