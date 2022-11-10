import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


//Legatura cu backend user: Din home folosim;
//Doar un endpoint putem folosi? Un controller?
const endpoint = {
    home: '/user'
};

/*
//Se ia 8080 + /user pentru adresa controller;
//MAV / thymeleaf;
//Daca nu vreau method get / post atunci cum se face;
function getUsers(callback) {
    let request = new Request(HOST.backend_api + endpoint.user, {
    //8080/user;
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}
//Params din metode backend, de exemplu id;
function getUserById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.user + params.id, {
    //8080/user/idDatCaParametru;
       method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}
*/


//Probabil trebuie alt link:
//Endpointuri diferite!!!
function getNoRole(callback){
    let request = new Request(HOST.backend_api + endpoint.home + "/noRole", {
        method: 'GET',
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}


//Apeleaza pentru post:
function userRoleRedirect(homeUser, callback){
    let request = new Request(HOST.backend_api + endpoint.home + "/userRoleRedirect", {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(homeUser)
    });

    console.log("URL: " + request.url);
    //console.log("User is: " + typeof homeUser.name + " and " + typeof homeUser.password + " ;");
    //console.log("All User is: " + typeof homeUser);
    //Request + Callback;
    //String - Json - String;
    RestApiClient.performRequest(request, callback);
}


export {
    //getUsers,
    //getUserById,
    getNoRole,
    userRoleRedirect
};






