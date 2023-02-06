import { useParams } from "react-router-dom";
// import ChatGPT from '.././components/ChatGPT';
import React from 'react';
// import YouTube from 'react-youtube';
import '.././App.css';
import Transcript from '.././components/Transcript';
import TranscriptAxios from '.././components/TranscriptAxios';
import ChatGPT from "../components/ChatGPT";
import VideoPageNavBar from "../components/VideoPageNavBar";
// import ChatSonic from "../components/ChatSonic";
// import CustomReactPlayer from "../components/CustomReactPlayer";
import PuffLoader from "react-spinners/PuffLoader";
import colors from ".././colors";
import BasicPageWrapper from "../components/BasicPageWrapper";


const Video = () => {
    let { id } = useParams();
    // let { timestamp } = id.split('&t=')[1];
    // let { timestamp } = timestampS.split('s')[1];

    // const videoURL = `https://www.youtube.com/watch?v=${id}`;
    const [loading, setLoading] = React.useState(true);
    // const [isReadyTranscript, setIsReadyTranscript] = React.useState("");

    // React.useEffect(() => {
        // <TranscriptAxios videoID={id} />
    //     setLoading(false);
    // });
    // }, [id];

    // React.useEffect(() => {
    //     setLoading(false);
    // }, [id]);

    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 5000);
    }, [id]);

    return (
        <>
            {loading ? 
                <BasicPageWrapper>
                    <PuffLoader 
                        color={colors.const_brand_name} /> 
                    <TranscriptAxios 
                        videoID={id} />
                </BasicPageWrapper>
                : 
                <>
                    <VideoPageNavBar />
                    <div className='Content container-fluid'>
                        <div className="row pt-3">
                            <div className='LeftSide col'>
                                {/* <div className='Video'>
                                    <CustomReactPlayer url={videoURL}/>
                                    <YouTube
                                        videoId={id}
                                        />
                                </div> */}
                                {/* <TranscriptAxios videoID={id} /> */}
                                <Transcript 
                                    videoID={id}
                                    />
                                </div>
                            <ChatGPT />
                            {/* <ChatSonic /> */}
                        </div>
                    </div>
                </>
            }
        </>
    );
};

export default Video;
