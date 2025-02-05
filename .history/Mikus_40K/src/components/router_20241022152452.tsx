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

// Home component
function Home() {
    return (
        <div>
            <h2>MIKUS 40K</h2>
            <Link to={routes.login}>Sing Up</Link>
        </div>
    );
}

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