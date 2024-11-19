import React from 'react';
import Router from './router/router';
import SidebarUser from './components/sidebar/SidebarUser';
import { BrowserRouter } from 'react-router-dom';
import NavCont from './components/navbar/NavCont';
import Footer from './components/Footer/Footer';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <NavCont />
                <SidebarUser />
                <Router />
                {/* Footer al final */}
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;

