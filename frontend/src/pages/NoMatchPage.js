import BasicPageWrapper from '../components/BasicPageWrapper';
import NavBar from '../components/NavBar';

function NoMatchPage() {
    return (
        <>
            <NavBar />
            <BasicPageWrapper>
                <div 
                    style={{
                        fontSize: '10rem',
                        }}>
                    404
                </div>
                <div 
                    style={{
                        fontSize: '2rem',
                    }}>
                    Page not found
                </div>
            </BasicPageWrapper>
        </>
    );
}

export default NoMatchPage;