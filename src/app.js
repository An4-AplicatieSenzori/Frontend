//Imports:
import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NavigationBar from './navigation-bar'
//import Home from './home/home';
import Admin from './admin/admin';
import HomeContainer from './home/home-container'
import ClientContainer from './client/client-container'
import UserContainer from './user/user-container'
import DeviceContainer from './device/device-container'
import AdminContainer from './admin/admin-container'
import ErrorPage from './commons/errorhandling/error-page';
import styles from './commons/styles/project-style.css';
// import BackgroundImgAdmin from "./commons/images/adminBackground2.jpg";
// import BackgroundImgClient from "./commons/images/clientBackground2.png";


// const backgroundStyleAdmin = {
//     overflow: 'hidden',
//     backgroundPosition: 'center',
//     backgroundSize: 'cover',
//     // backgroundRepeat: 'no-repeat',
//     width: "100%",
//     // height: "3840px",
//     backgroundImage: `url(${BackgroundImgAdmin})`
// };


// const backgroundStyleClient = {
//     overflow: 'hidden',
//     backgroundPosition: 'center',
//     // backgroundSize: 'cover',
//     backgroundRepeat: 'no-repeat',
//     width: "100%",
//     // height: "3840px",
//     backgroundImage: `url(${BackgroundImgClient})`
// };


//Clasa componenta: Cu render:
class App extends React.Component {

    //Avem rutarile aici!!! Grija la comentarii!
    //TOATE SUNT IN NAVBAR, SI ALEGI RUTELE INTRE ELE!!!
    //Page not found! Pagina generica de eroare!
    //In Switch poti pune route; Accesibile prin acele linkuri;

    render() {
        return (
            <div className={styles.back}>
            <Router>
                <div>
                    <Switch>
                        <Route
                            exact
                            path='/'
                            render={() => <HomeContainer/>}
                        />
                        <Route
                            exact
                            path='/admin'
                            render={() =>
                                // <div style = {backgroundStyleAdmin}>
                                <div>
                                    <NavigationBar/>
                                    <AdminContainer/>
                                </div>
                        }/>
                        <Route
                            exact
                            path='/client'
                            // style = {backgroundStyleClient}
                            render={() => <ClientContainer />}
                        />
                        <Route
                            exact
                            path='/admin/user'
                            render={() =>
                                // <div style = {backgroundStyleAdmin}>
                                <div>
                                    <NavigationBar/>
                                    <UserContainer/>
                                </div>
                        }/>
                        <Route
                            exact
                            path='/admin/device'
                            render={() =>
                                // <div style = {backgroundStyleAdmin}>
                                <div>
                                    <NavigationBar/>
                                    <DeviceContainer/>
                                </div>
                        }/>
                        {/*Error*/}
                        <Route
                            exact
                            path='/error'
                            render={() => <ErrorPage/>}
                        />
                        <Route render={() =><ErrorPage/>} />
                    </Switch>
                </div>
            </Router>
            </div>
        )
    };
}



//PENTRU ERORI!!!
//<Route render={() =><ErrorPage/>} />
//<NavigationBar />
//Apare error dupa orice pt ca este pus route de 2 ori???

//Probabil ca un fel de main pentru react, programul principal:
export default App




