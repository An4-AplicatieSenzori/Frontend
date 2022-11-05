//Imports:
import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NavigationBar from './navigation-bar'
import Home from './home/home';
import PersonContainer from './person/person-container'
import ErrorPage from './commons/errorhandling/error-page';
import styles from './commons/styles/project-style.css';


//Clasa componenta: Cu render:
class App extends React.Component {

    render() {
        return (
            <div className={styles.back}>
                <!-- Avem rutarile aici!!! -->
            <Router>
                <div>
                    <NavigationBar />
                    <!-- TOATE SUNT IN NAVBAR, SI ALEGI RUTELE INTRE ELE!!! -->
                    <Switch>
                        <Route
                            exact
                            path='/'
                            render={() => <Home/>}
                        />
                        <Route
                            exact
                            path='/person'
                            render={() => <PersonContainer/>}
                        />
                        {/*Error*/}
                        <!-- Page not found! Pagina generica de eroare! -->
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




