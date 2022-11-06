//Importuri
import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";

//Endpoint pentru pagina noua!
const endpoint = {
    user: '/user'
};

//Functie 1: GET all users;
function getUsers(callback) {
    let request = new Request(HOST.backend_api + endpoint.user, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

//Functie 2: GET 1 user, by id:
function getUserById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.user + params.id, {
       method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

//Functie 3: POST 1 user; (oricum daca dai datele bune)
function postUser(user, callback){
    let request = new Request(HOST.backend_api + endpoint.user , {
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
    getUsers,
    getUserById,
    postUser
};






