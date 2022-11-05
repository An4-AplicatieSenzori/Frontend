import React from 'react';

//import BackgroundImg from '../commons/images/future-medicine.jpg';
import BackgroundImg from '../commons/images/energy.jpeg'; //???

//Din react:
import {Button, Container, Jumbotron} from 'reactstrap';

//Pentru background, cu imagine:
const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    //height: "1920px",
    height: "3840px",
    backgroundImage: `url(${BackgroundImg})`
};

//Text style:
const textStyle = {color: 'white', };

//Tot componenta react, Home:
class Home extends React.Component {

    //Doar metoda, nu public pricate static?
    render() {

        return (
            <div>
                <Jumbotron fluid style={backgroundStyle}>
                    <Container fluid>

                        <!-- Cel original: -->
                        <!--
                        <h1 className="display-3" style={textStyle}>Integrated Medical Monitoring Platform for Home-care assistance</h1>
                        <p className="lead" style={textStyle}> <b>Enabling real time monitoring of patients, remote-assisted care services and
                            smart intake mechanism for prescribed medication.</b> </p>
                        <hr className="my-2"/>
                        <p  style={textStyle}> <b>This assignment represents the first module of the distributed software system "Integrated
                            Medical Monitoring Platform for Home-care assistance that represents the final project
                            for the Distributed Systems course. </b> </p>
                        <p className="lead">
                            <Button color="primary" onClick={() => window.open('http://coned.utcluj.ro/~salomie/DS_Lic/')}>Learn
                                More</Button>
                        </p>
                        -->

                        <!-- Modificat: -->
                        <h1 className="display-3" style={textStyle}>Energy monitoring platform</h1>
                        <p className="lead" style={textStyle}> <b>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type
                            specimen book. It has survived not only five centuries, but also the leap into
                            electronic typesetting, remaining essentially unchanged. It was popularised in
                            the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                            and more recently with desktop publishing software like Aldus PageMaker including
                            versions of Lorem Ipsum.
                        </b> </p>
                        <hr className="my-2"/>
                        <p  style={textStyle}> <b>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type
                            specimen book. It has survived not only five centuries, but also the leap into
                            electronic typesetting, remaining essentially unchanged. It was popularised in
                            the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                            and more recently with desktop publishing software like Aldus PageMaker including
                            versions of Lorem Ipsum.</b> </p>
                        <p className="lead">
                            <Button color="primary" onClick={() => window.open('https://www.youtube.com/feed/subscriptions')}>
                                Learn More</Button>
                        </p>

                    </Container>
                </Jumbotron>
            </div>
        )
    };
}

//Export:
export default Home











