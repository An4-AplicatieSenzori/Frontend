//Imports:
import React from 'react'
import styles from '../styles/project-style.css';

//Same style of class, cu constructor;
//Props pentru componente;
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    //Pentru log:
    componentDidCatch(error, info) {
        this.setState({ hasError: true });
        console.log("Error:" + error);
        console.log("Info:" + info);
    }

    //Functia render din Component, returneaza un H1; Sau error;
    render() {
        if (this.state.hasError) {
            return <h1 className={styles.errorTitle}>An error occured at component level.</h1>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary
