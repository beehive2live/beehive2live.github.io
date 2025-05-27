document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const playlist = document.getElementById('playlist');
    const currentTrack = document.getElementById('current-track');
    const prevTrackBtn = document.getElementById('prev-track');
    const nextTrackBtn = document.getElementById('next-track');

    let tracks = Array.from(playlist.querySelectorAll('li'));
    let currentIndex = 0;

    // Load the first track
    function loadTrack(index) {
        const track = tracks[index];
        audio.src = track.getAttribute('data-src');
        currentTrack.textContent = `Now Playing: ${track.textContent}`;
        audio.play();
    }

    // Play the next track
    function nextTrack() {
        currentIndex = (currentIndex + 1) % tracks.length;
        loadTrack(currentIndex);
    }

    // Play the previous track
    function prevTrack() {
        currentIndex = (currentIndex - 1 + tracks.length) % tracks.length;
        loadTrack(currentIndex);
    }

    // Add event listeners
    nextTrackBtn.addEventListener('click', nextTrack);
    prevTrackBtn.addEventListener('click', prevTrack);

    // Play track when clicked in the playlist
    tracks.forEach((track, index) => {
        track.addEventListener('click', () => {
            currentIndex = index;
            loadTrack(currentIndex);
        });
    });

    // Automatically play the next track when the current one ends
    audio.addEventListener('ended', nextTrack);

    // Load the first track on page load
    loadTrack(currentIndex);
});