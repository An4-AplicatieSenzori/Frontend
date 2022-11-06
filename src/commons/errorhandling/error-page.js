//Import:
import React from 'react'
import styles from '../styles/project-style.css';

//Pentru eroare, fara constructor, doar un render;
class ErrorPage extends React.Component
{
    render() {
            return (
                <div>
                    <p></p>
                    <p></p>
                    <p></p>
                    <h1 style = {{color: 'red', textAlign: 'center',
                    margin: '20% 0% 0% 0%'}}>Page not found.</h1>
                    <p></p>
                    <p></p>
                    <p></p>
                </div>
            )
    }
}

//Trebuie in div! jsx!
//className={styles.errorTitle}
//Export la date anume JS;
export default ErrorPage
