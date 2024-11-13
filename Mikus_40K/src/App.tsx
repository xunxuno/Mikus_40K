import React from 'react';
import Router from './router/router';
import Navbar from './components/navbar';
import SubNavbar from './components/SubNavbar'
import SidebarUser from './components/SidebarUser';
import NavCont from './components/NavCont';

function App() {
    return (
        <div className="App">
            <NavCont />
            <Router />
            <SidebarUser />

        </div>

    );
}

export default App;
