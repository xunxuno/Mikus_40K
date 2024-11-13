import React from 'react';
import Router from './router/router';
import Navbar from './components/navbar';
import SidebarUser from './components/SidebarUser';
import { BrowserRouter } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Navbar />
                <Router />
                <SidebarUser />
            </div>
        </BrowserRouter>
    );
}

export default App;
