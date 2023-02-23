import BasicPageWrapper from "../components/BasicPageWrapper";
import colors from "../colors";
// import LycheeLogo from ".././LycheeLogo.png";
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useNavigate } from "react-router-dom";
import '.././App.css';

function LandingPage() {

    const navigate = useNavigate();

    return (
        <>
            <NavBar />
            <BasicPageWrapper>
                <div className='container'>
                    <div className="landingPageContent items-center">
                        <div 
                            className="mb-3" 
                            style={{
                                color: colors.const_dark_text,
                                fontSize: '76px',
                                fontWeight: '700',
                                marginTop: '100px',
                            }}>
                                Learn more from YouTube videos with AI
                        </div>
                        <div 
                            className="pt-1 pb-1 ps-3 pe-3 " 
                            style={{
                                // backgroundColor: colors.const_brand_name,
                                // color: colors.const_light_text,
                                fontSize: '22px',
                                fontWeight: '500',
                            }}>
                                Ask questions. Get a summary. Quiz yourself.
                        </div>
                        <button 
                            onClick={() => navigate('/video')}
                            className="mt-5 btn btn-danger pt-3 pb-3 ps-4 pe-4">
                                Get Started
                        </button>
                    </div>
                    <div
                        className="mt-5 mb-5"
                        >
                        <a
                            href="#howItWorks"
                            style={{
                                color: colors.const_dark_text,
                                fontSize: '28px',
                                fontWeight: '700',
                            }}
                            >
                                How It Works?
                        </a>
                    </div>
                    <div
                        id="howItWorks"
                        className="featuredVideo d-flex justify-content-center mt-5" 
                        >
                            <iframe 
                                width="854"
                                height="480"
                                src="https://www.youtube.com/embed/MMBnm0a1_VE" 
                                title="Lychee - Learn more from YouTube videos with AI | Open Data Challenge" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
                    <Footer />
                </div>
            </BasicPageWrapper>
        </>
    );
  }
  
  export default LandingPage;