import React from 'react';
import Router from './router/router';
import Navbar from './components/Navbar';
import SidebarUser from './components/SidebarUser';

function App() {
    return (
        <div className="App">
            <Navbar/>
            <Router />
            <SidebarUser />

        </div>
    );
}

export default App;
