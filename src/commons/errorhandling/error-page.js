//Import:
import React from 'react'
import styles from '../styles/project-style.css';

//Pentru eroare, fara constructor, doar un render;
class ErrorPage extends React.Component
{
    render() {
            return <h3 className={styles.errorTitle}>Page not found.</h3>;
    }
}

//Export la date anume JS;
export default ErrorPage
