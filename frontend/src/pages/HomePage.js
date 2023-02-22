import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../App.css';
import BasicPageWrapper from '.././components/BasicPageWrapper';
import NavBar from '../components/NavBar';
// import colors from '../colors';
import Icons from '.././Icons';

function HomePage() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const youtubeLinkHandler = async () => {
    const youtubeRegex = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
    if (youtubeRegex.test(input)) {
        let videoID = input.split('v=')[1];
        console.log(videoID);
        navigate(`/video/${videoID}`);
        // navigate(`/video/${videoID}`);
        // if (videoID.includes('&')) {
          // let t1 = videoID.split('&t=')[1];
          // let t2 = t1.split('s')[0];
          // navigate(`/video/${videoID}${t1}`);
        // } else {
            // navigate(`/video/${videoID}`);
        // }
    } else {
        alert("Invalid YouTube link. Please enter a valid link.");
  }
};

return (
    <>
      <NavBar />
      <BasicPageWrapper>
          <p 
            className='title'>Lychee</p>
          <div 
            className='d-flex align-baseline'>
            <input 
              value={input}
              autoComplete="off"
              autofocus="true"
              id="search_input" 
              type="text" 
              placeholder='Enter YouTube link here'
              onChange={(e) => setInput(e.target.value)}
            ></input>
            {input.length > 0 ? 
            <button 
              className='me-3'
              disabled={input === ""}
              id="remove" 
              onClick={() => setInput("")}>
                {Icons.removeIcon}
            </button> 
            : <></>}
            <button 
              disabled={input === ""}
              id="search" 
              onClick={() => youtubeLinkHandler()}>
                {Icons.navigateIcon}
            </button>
          </div>
      </BasicPageWrapper>
    </>
  );
}

export default HomePage;
