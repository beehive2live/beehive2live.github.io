const { useState, useEffect, useRef } = React;

function MusicPlayer() {
    const [tracks] = useState([
        { title: "Bauhaus - Bela Lugosi's Dead", src: "audio/Bauhaus - Bela Lugosi's Dead.m4a" },
        { title: "Dean Blunt - Smile Please", src: "audio/Dean Blunt - Smile Please.m4a" },
        { title: "Fresno Bob - FEAR IS TEMPORARY", src: "audio/Fresno Bob - FEAR IS TEMPORARY REGRET IS FOREVER.m4a" },
        // Add your other tracks here
    ]);

    const [currentTrack, setCurrentTrack] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(new Audio());

    useEffect(() => {
        audioRef.current.src = tracks[currentTrack].src;
        if (isPlaying) audioRef.current.play();
    }, [currentTrack]);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const nextTrack = () => {
        setCurrentTrack((prev) => (prev + 1) % tracks.length);
    };

    const prevTrack = () => {
        setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
    };

    return (
        <div className="playlist-container">
            <h2>React Music Player</h2>
            <div id="track-info">
                <p>Now Playing: {tracks[currentTrack].title}</p>
            </div>
            <div id="playlist-controls">
                <button onClick={prevTrack}>←</button>
                <button onClick={togglePlay}>
                    {isPlaying ? '⏸️' : '▶️'}
                </button>
                <button onClick={nextTrack}>→</button>
            </div>
            <ul id="playlist">
                {tracks.map((track, index) => (
                    <li
                        key={index}
                        onClick={() => setCurrentTrack(index)}
                        style={{
                            cursor: 'pointer',
                            color: index === currentTrack ? 'chartreuse' : 'palegoldenrod'
                        }}
                    >
                        {track.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}

ReactDOM.render(<MusicPlayer />, document.getElementById('root'));