//Importuri
import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";

//Endpoint pentru pagina noua!
const endpoint = {
    person: '/person'
};

//Functie 1: GET all persons;
function getPersons(callback) {
    let request = new Request(HOST.backend_api + endpoint.person, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

//Functie 2: GET 1 person, by id:
function getPersonById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.person + params.id, {
       method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

//Functie 3: POST 1 person; (oricum daca dai datele bune)
function postPerson(user, callback){
    let request = new Request(HOST.backend_api + endpoint.person , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

//Export functii;
export {
    getPersons,
    getPersonById,
    postPerson
};






