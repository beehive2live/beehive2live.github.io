document.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const scrollY = window.scrollY;

    if (scrollY === 0) {
        header.style.height = '100px'; // Reset to default height
    } else {
        header.style.height = 'auto'; // Reset to auto height when scrolling
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const playlist = document.getElementById('playlist');
    const currentTrack = document.getElementById('current-track');
    const prevTrackBtn = document.getElementById('prev-track');
    const playPauseBtn = document.getElementById('play-pause'); // Add this line
    const nextTrackBtn = document.getElementById('next-track');

    let tracks = Array.from(playlist.querySelectorAll('li'));
    let currentIndex = 0;

    // Play/pause button logic
    playPauseBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playPauseBtn.textContent = '⏸️';
        } else {
            audio.pause();
            playPauseBtn.textContent = '▶️';
        }
    });

    // Update play/pause button icon when audio ends or plays
    audio.addEventListener('play', () => {
        playPauseBtn.textContent = '⏸️';
    });
    audio.addEventListener('pause', () => {
        playPauseBtn.textContent = '▶️';
    });

    // --- Add this block for space bar play/pause ---
    document.addEventListener('keydown', (event) => {
        const active = document.activeElement;
        if (
            event.code === 'Space' &&
            active.tagName !== 'INPUT' &&
            active.tagName !== 'TEXTAREA' &&
            active.tagName !== 'BUTTON'
        ) {
            event.preventDefault();
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        }
    });

    document.addEventListener('keydown', (event) => {
        const active = document.activeElement;
        // Prevent triggering when typing in input, textarea, or button
        if (
            active.tagName !== 'INPUT' &&
            active.tagName !== 'TEXTAREA' &&
            active.tagName !== 'BUTTON'
        ) {
            if (event.code === 'ArrowLeft') {
                event.preventDefault();
                prevTrackBtn.click(); // or call your prevTrack() function directly
            }
            if (event.code === 'ArrowRight') {
                event.preventDefault();
                nextTrackBtn.click(); // or call your nextTrack() function directly
            }
        }
    });

    // Load and play the selected track
    function loadTrack(index) {
        const track = tracks[index];
        audio.src = track.getAttribute('data-src');
        currentTrack.textContent = track.textContent;
        audio.play();
    }

    // Navigate tracks
    function nextTrack() {
        currentIndex = (currentIndex + 1) % tracks.length;
        loadTrack(currentIndex);
    }

    function prevTrack() {
        currentIndex = (currentIndex - 1 + tracks.length) % tracks.length;
        loadTrack(currentIndex);
    }

    // Add event listeners
    nextTrackBtn.addEventListener('click', nextTrack);
    prevTrackBtn.addEventListener('click', prevTrack);

    tracks.forEach((track, index) => {
        track.addEventListener('click', () => {
            currentIndex = index;
            loadTrack(currentIndex);
        });
    });

    audio.addEventListener('ended', nextTrack);

    // Load the first track on page load
    loadTrack(currentIndex);
}); 