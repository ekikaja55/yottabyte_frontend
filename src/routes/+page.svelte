<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { io } from 'socket.io-client';

  const socket = io('https://yottabytebackend-production.up.railway.app');
  const roomId = 'byteSpace';

  let audioRef: HTMLAudioElement;
  let isHost = false; // ganti manual jadi true untuk menguji sebagai host
  let currentAction = 'pause';

  onMount(() => {
    socket.emit('join-room', roomId);

    socket.on('sync-state', ({ action, timestamp }) => {
      console.log('🔁 Sync state:', action, timestamp);
      if (!isHost) {
        syncToState(action, timestamp);
      }
    });

    socket.on('player-action', ({ action, timestamp }) => {
      console.log('🎧 Received action:', action, timestamp);
      if (!isHost) {
        syncToState(action, timestamp);
      }
    });
  });

  function syncToState(action: string, timestamp: number) {
    if (!audioRef) return;

    audioRef.currentTime = timestamp;

    if (action === 'play') {
      audioRef.play();
    } else if (action === 'pause') {
      audioRef.pause();
    }
    currentAction = action;
  }

  function handlePlayPause() {
    if (!audioRef) return;

    const action = audioRef.paused ? 'play' : 'pause';
    const timestamp = audioRef.currentTime;

    audioRef[action]();
    currentAction = action;

    socket.emit('player-action', { roomId, action, timestamp });
  }
</script>

<svelte:window on:keydown={(e) => {
  if (e.key === ' ') {
    e.preventDefault();
    handlePlayPause();
  }
}} />

<main class="flex flex-col items-center justify-center h-screen gap-4 bg-gray-100 text-gray-800">
  <h1 class="text-2xl font-bold">🎵 ByteSpace Music Player</h1>

  <audio bind:this={audioRef} class="w-full max-w-md" controls>
    <source src="/sample.mp3" type="audio/mp3" />
    Your browser does not support the audio element.
  </audio>

  <button on:click={handlePlayPause} class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
    {currentAction === 'play' ? '⏸ Pause' : '▶️ Play'} (as {isHost ? 'Host' : 'Client'})
  </button>
</main>

<style>
  audio::-webkit-media-controls-panel {
    background-color: #f0f0f0;
  }
</style>
