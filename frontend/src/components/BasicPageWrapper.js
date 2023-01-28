import colors from "../colors";

const BasicPageWrapper = ({ children }) => {
    return (
        <div 
            style={{
                textAlign: 'center',
            }}
        >
            <div
                style={{
                    // backgroundColor: 'white',
                    backgroundColor: colors.const_light_bg,
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'calc(10px + 2vmin)',
                    color: colors.const_dark_text,
                }}>
                {children}
            </div>
        </div>
    );
}

export default BasicPageWrapper;