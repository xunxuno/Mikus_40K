import React from 'react';
import Router from './router/router';
import SidebarUser from './components/sidebar/SidebarUser';
import { BrowserRouter } from 'react-router-dom';
import NavCont from './components/navbar/NavCont';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <NavCont />
                <Router />
                <SidebarUser />
            </div>
        </BrowserRouter>
    );
}

export default App;