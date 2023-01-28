// import React, { useState } from "react";
// import AudioRecorderPlayer, {
//     AVEncoderAudioQualityIOSType,
//     AVEncodingOption,
//     AudioEncoderAndroidType,
//     AudioSourceAndroidType,
// } from 'react-native-audio-recorder-player';

// const useAudio = () => {
//     const [recording, setRecording] = useState(false);
//     const [setRecordTime] = useState('00:00:00');
//     const [setRecordSecs] = useState(0);

    // const filePath = ".././audios/"

//     const audioRecorderPlayer = new AudioRecorderPlayer();
//     audioRecorderPlayer.setSubscriptionDuration(0.09); // optional. Default is 0.1

//     const toggle = async () => {
//     if (!recording) {
//         setRecording(true);
//         const path = `${filePath}input.wav`;
//         const audioSet = {
//             AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
//             AudioSourceAndroid: AudioSourceAndroidType.MIC,
//             AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
//             AVNumberOfChannelsKeyIOS: 2,
//             AVFormatIDKeyIOS: AVEncodingOption.aac,
//         };

//         const uri = await audioRecorderPlayer.startRecorder(path, audioSet);
//         audioRecorderPlayer.addRecordBackListener((e) => {
//             setRecordSecs(e.current_position);
//             setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.current_position)));
//         });
//         console.log(`uri: ${uri}`);
//     } else {
//         setRecording(false);
//         const result = await audioRecorderPlayer.stopRecorder();
//         audioRecorderPlayer.removeRecordBackListener();
//         setRecordSecs(0);
//         console.log(result);
//     }
//     };

//     return [recording, toggle];

// };

// const SpeechInput = () => {
//     const [recording, toggle] = useAudio();

//     return (
//         <button 
            // className="ms-3 btn btn-success"
//             onClick={toggle}>{recording ? "Stop" : "Speak"}
//         </button>
//     );
// };

// export default SpeechInput;

import React, { useState } from 'react';
import AudioRecorder from 'react-audio-recorder';
import FileSaver from 'file-saver';


const SpeechInput = () => {
    const [recording, setRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);
    const [audioBlob, setAudioBlob] = useState(null);

    // const filePath = ".././audios/"

    const toggle = () => {
        setRecording(!recording);
    }

    const stopRecording = (blob) => {
        setRecording(false);
        setAudioUrl(blob.blobURL);
        setAudioBlob(blob);
        saveRecording();
    };

    const saveRecording = () => {
        if (audioBlob) {
            const file = new File([audioBlob], 'input.wav', { type: 'audio/wav' });
            FileSaver.saveAs(file, 'input.wav');
        }
    }

    return (
        <div>
            <button 
                className="btn btn-success"
                onClick={toggle}>{recording ? "Stop" : "Speak"} 
            </button>
            {recording ? <AudioRecorder onRecordingComplete={stopRecording}/> : null}
            {audioUrl ? <audio src={audioUrl} controls /> : null}
        </div>
    );
};

export default SpeechInput;

