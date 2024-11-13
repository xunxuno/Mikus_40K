import React from 'react';
import Router from './router/router';
import Navbar from './components/navbar/navbar';
import SidebarUser from './components/sidebar/SidebarUser';
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
