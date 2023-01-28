// import { useState, useEffect } from "react";
import { useEffect } from "react";
import axios from "axios";
import ".././App.css";

export default function TranscriptAxios({ videoID }) {
    // const [transcript, setTranscript] = useState("");
    // const transcriptJson = JSON.parse(transcript);
    // const transcriptJson = transcript;

    useEffect(() => {
        axios.defaults.headers.post['Content-Type'] ='application/json; charset=utf-8';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.get(`http://127.0.0.1:8000/video/${videoID}`)
            .then(res => {
                console.log(res.data);
                if (res.data) {
                    return true;
                }
                // setTranscript(res.data);
            })
            .catch(err => {
                console.log(err);
                return false;
            })
        }, [videoID]);
  
    // console.log(typeof transcript);
    // console.log(transcriptJson[0]);
}

