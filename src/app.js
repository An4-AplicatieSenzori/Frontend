//Imports:
import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NavigationBar from './navigation-bar'
import Home from './home/home';
import UserContainer from './user/user-container'
import DeviceContainer from './device/device-container'
import ErrorPage from './commons/errorhandling/error-page';
import styles from './commons/styles/project-style.css';

//Clasa componenta: Cu render:
class App extends React.Component {

    //Avem rutarile aici!!! Grija la comentarii!
    //TOATE SUNT IN NAVBAR, SI ALEGI RUTELE INTRE ELE!!!
    //Page not found! Pagina generica de eroare!
    render() {
        return (
            <div className={styles.back}>
            <Router>
                <div>
                    <NavigationBar />
                    <Switch>
                        <Route
                            exact
                            path='/'
                            render={() => <Home/>}
                        />
                        <Route
                            exact
                            path='/user'
                            render={() => <UserContainer/>}
                        />
                        <Route
                            exact
                            path='/device'
                            render={() => <DeviceContainer/>}
                        />
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


//Probabil ca un fel de main pentru react, programul principal:
export default App




