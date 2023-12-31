//Imports:
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './app'
import { CookiesProvider } from "react-cookie";

//Foloseste bootstrap! In sfarsit!
import 'bootstrap/dist/css/bootstrap.min.css';

//SETAM DOCUMENTUL SA FIE ROOT PENTRU JS?
ReactDOM.render(
    <CookiesProvider>
        <App />
    </CookiesProvider>,
    document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
