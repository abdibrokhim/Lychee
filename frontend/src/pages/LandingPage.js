import BasicPageWrapper from "../components/BasicPageWrapper";
import colors from "../colors";
// import LycheeLogo from ".././LycheeLogo.png";
import NavBar from '../components/NavBar';
import teamwork from '../teamwork.png';
import { useNavigate } from "react-router-dom";
import '.././App.css';


function LandingPage() {

    const navigate = useNavigate();

    return (
        <>
            <NavBar />
            <BasicPageWrapper>
                {/* <div
                    style={{
                        // color: '#BA0B32',
                        fontSize: '10rem',
                        }}>
                    LandingPage
                </div> */}
                {/* <img src={LycheeLogo} alt="Lychee Logo" /> */}
                <div className='row text-start container align-items-start'>
                    <div className='col'>
                        <div className="landingPageContent">
                            <div 
                                className="text-5xl mb-3 fw-bold" style={{color: colors.const_dark_text}}>Learn more from YouTube videos with AI</div>
                            <div 
                                className="d-inline-block pt-1 pb-1 ps-3 pe-3" 
                                style={{backgroundColor: colors.const_brand_name,
                                    color: colors.const_light_text
                                }}>Ask questions. Get a summary. Quiz yourself.</div>
                            {/* <div 
                                className="d-inline-block p-2" 
                                style={{backgroundColor: colors.const_brand_name,
                                    color: colors.const_light_text
                                }}>Get a summary.</div>
                            <div 
                                className="d-inline-block p-2" 
                                style={{backgroundColor: colors.const_brand_name,
                                    color: colors.const_light_text
                                }}>Quiz yourself.</div> */}
                            <button 
                                onClick={() => navigate('/video')}
                                className="d-block mt-5 btn btn-danger pt-3 pb-3 ps-4 pe-4">
                                    Get Started
                            </button>
                        </div>
                    </div>
                    <div className='col'>
                        <div>
                            <img src={teamwork} alt="Teamwork Logo" />
                        </div>
                    </div>
                </div>
            </BasicPageWrapper>
        </>
    );
  }
  
  export default LandingPage;