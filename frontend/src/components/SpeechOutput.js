import React, { useState, useEffect } from "react";

const useAudio = url => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);    
 
    const toggle = () => setPlaying(!playing);

    useEffect(() => {
        playing ? audio.play() : audio.pause();
    },
    );

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
        audio.removeEventListener('ended', () => setPlaying(false));
        };
    }
    );
    return [playing, toggle];
};

const SpeechOutput = ({ url }) => {
    const [playing, toggle] = useAudio(url);
    
    return (
        <button 
            className="btn btn-success"
            onClick={toggle}>{playing ? "Pause" : "Listen"} 
        </button>
    );
};

export default SpeechOutput;