import React from "react";
import { useParams } from "react-router-dom";
// import React, { useState, useEffect } from "react";
import transcriptJson from ".././transcripts/script.json";
import ".././App.css";
import CustomReactPlayer from "../components/CustomReactPlayer";

const Transcript = () => {
    let { id } = useParams();
    
    // const [singleWords, setSingleWords] = React.useState([]);
    const [timeSt, setTimeSt] = React.useState(0.00);
    // let t = parseFloat(timeSt);
    
    let videoURL = `https://www.youtube.com/watch?v=${id}`;

    React.useEffect(() => {
        videoURL = `${id}&t=${timeSt}s`;
    }, [timeSt]);

    console.log(videoURL);
    
    const timeFunc = (e) => {
        console.log(e.target.id);
        setTimeSt(e.target.id);
    }

    const toSingleWord = (text, start) => {
        // setTimeSt(start);

        const words = text.split(' ');
        const wordsWithBreaks = words.map((word, index) => {
            return (
                <div
                    onClick={timeFunc}
                    key={index} 
                    className="me-2 highlight d-inline" 
                    // href={videoURL+"/&t="+start+"s"} 
                    id={start} 
                    style={{cursor: "pointer"}}
                    >
                    {word}
                </div>
            );
        });
        return wordsWithBreaks;
    }

    return (
        <>
            <div className='Video'>
                <CustomReactPlayer url={videoURL} timeStamp={timeSt}/>
            </div>
                <div className="Transcript mt-3">
                <div className="Transcript-Content p-3">
                { transcriptJson.length > 0 ?

                    transcriptJson.map((line, index) => {
                        return (
                            <div key={index} className="">{toSingleWord(line.text, line.start)}
                                {/* <div>{toSingleWord(line.text)}</div> */}
                            </div>
                        );
                    }) : <p>Loading...</p>
                }
                </div>
            </div>
        </>
    ); 
}

export default Transcript;
