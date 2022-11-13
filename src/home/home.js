//Pagina de prezentare, cu buton de login and register!
import React from 'react';

//import BackgroundImg from '../commons/images/future-medicine.jpg';
import BackgroundImg from '../commons/images/energy.jpeg'; //???

//Din react:
import {Button, Container, Jumbotron} from 'reactstrap';
import {eventCenter} from "recharts/lib/util/Events";

//Pentru background, cu imagine:
const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    //width: "100%",
    width: "100%",
    //height: "1920px",
    height: "3840px",
    backgroundImage: `url(${BackgroundImg})`
};

//Text style: Toate componentele folosesc asta aparent;
const textStyle =
    {color: 'white',
    textAlign: 'center',
    paddingBottom: '5%'
    };

const buttonStyle =
    {
      //alignContent: 'auto',
      //paddingLeft: '50%',
      marginLeft: '45%',
      padding: '1% 4.5% 1% 4.5%',
    };

const buttonStyle2 =
    {
        marginLeft: '45%',
        backgroundColor: '#0a0303',
        padding: '1% 4% 1% 4%',
    };



//Tot componenta react, Home:
class Home extends React.Component {

    //Doar metoda, nu public pricate static?
    render() {

        return (
            <div>
                <Jumbotron fluid style={backgroundStyle}>
                    <Container fluid>

                        <h1 className="display-3" style={{textAlign: 'center',
                        color: '#000000', marginBottom: '5%'}}>Energy monitoring platform</h1>

                        <p className="lead" style={textStyle}> <b>
                            Renowned for our expertise in the field of precision measurement in high-current applications,
                            EnergyConsumptionMeasuringCompany has been a leading global provider of advanced measuring systems for many years.
                            Marketed under the ISA® brand, our precision measuring systems offer exceptionally high performance.
                            Our commitment to achieving the ultimate in precision is combined with ease of use and a
                            high degree of variability!
                        </b> </p>

                    </Container>
                </Jumbotron>
            </div>
        )
    };
}



//Export:
//export default HomeContainer;
export default Home


/*
<Button color="primary" onClick={() => window.open('https://www.youtube.com/feed/subscriptions')}
                            style={buttonStyle}>
                                Learn More</Button>



Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type
                            specimen book. It has survived not only five centuries, but also the leap into
                            electronic typesetting, remaining essentially unchanged. It was popularised in
                            the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                            and more recently with desktop publishing software like Aldus PageMaker including
                            versions of Lorem Ipsum.



<!-- Modificat: -->
Cel original:
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

Pentru login redirect la o pagina sau la cealalta;

                        <p className="lead">
                            <Button color="primary" style={buttonStyle}>
                                Login
                            </Button>

                            <p></p>

                            <Button color="primary" style={buttonStyle2}>
                                Register
                            </Button>
                        </p>
*/










