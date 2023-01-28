import React, { useState } from 'react';
import ReactPlayer from 'react-player';

const CustomReactPlayer = ({ url, timeStamp }) => {

    const [playing, setPlaying] = useState(false);
    const playerRef = React.useRef(null);
    // const [timestamp, setTimestamp] = useState(0.00);

    // setTimestamp(timeStamp);

    React.useEffect(() => {
        playerRef.current.seekTo(timeStamp);
    }, [timeStamp]);
    
    return (
        <ReactPlayer
            // url={url+"&t="+timeStamp+"s"}
            url={url}
            playing={playing}
            controls={true}
            width="100%"
            height="100%"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            ref={playerRef}
        />
    );
};

export default CustomReactPlayer;
