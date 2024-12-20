import React from 'react'
import Header from '../layout/Home/Header'
import Footer from '../layout/Home/Footer'

const layoutStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
};

const contentStyle = {
    flex: '1',
};
const HomeLayout = ({ children }) => {
    return (
        <>
            <div style={layoutStyle}>
                <Header />
                <div style={contentStyle}>
                    {children}
                </div>
                <Footer />
            </div>
        </>
    )
}

export default HomeLayout
