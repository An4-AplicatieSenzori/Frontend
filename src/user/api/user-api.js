//Importuri
import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";

//Endpoint pentru pagina noua!
//Se refera la ce este in backend aici?
//Asa user face combinatie cu user;
const endpoint = {
    user: '/user'
};



//Lucreaza direct cu backend-ul;
//Functie 1: GET all users;
function getUsers(callback) {
    let request = new Request(HOST.backend_api + endpoint.user, {
        method: 'GET',
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}



//Result de la get este ROLE ca sa vad ce role are userul;
function getUserRole(callback){
    let request = new Request(HOST.backend_api + endpoint.user + "/userRole", {
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
    let request = new Request(HOST.backend_api + endpoint.user, {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback); //Ca la POST:
}



//Export functii;
//Functii ca in service;
export {
    getUsers,
    getUserRole,
    getUserById,
    postUser
};






