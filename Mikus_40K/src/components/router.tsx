import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useParams,
    generatePath,
} from 'react-router-dom';

//Routes definition
const routes = {
    home: '/',
    login: '/login',
};



function Router(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path={routes.home} element={<Home/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;