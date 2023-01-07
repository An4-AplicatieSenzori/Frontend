//Empty
// App.jsx
import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import {Button} from "reactstrap";




//State merge ca si get, same cookies;
class userCookie extends Component
{
    //Initialize:
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };



    //Constructor: Importante sunt stateurile:
    constructor(props)
    {
        super(props);
        //const { cookies } = props; //this.props?

        //Ce este in state:
        //Paranteze duble:
        this.state = {
            id: this.props.cookies.get("id") || "noId",
            name: this.props.cookies.get("name") || "noName",
            address: this.props.cookies.get("address") || "noAddress",
            age: this.props.cookies.get("age") || "noAge",
            email: this.props.cookies.get("email") || "noEmail",
            password: this.props.cookies.get("password") || "noPassword",
            role: this.props.cookies.get("role") || "noRole",
        };

        //console.log("Test: " + this.state.id + ", " + this.state.name + ", " + this.state.address + "...");
    }



    //For Handleing:
    //Aici set state si set cookies:
    handleUserChange(result)
    {
        const { cookies } = this.props;

        //In functie de ce user avem, client sau admin, se poate seta doar in 1 fel anume:
        // if(result.role === "admin")
        // {
        //     cookies.set("id", result.id, { path: "/admin" });
        //     cookies.set("name", result.name, { path: "/admin" });
        //     cookies.set("address", result.address, { path: "/admin" });
        //     cookies.set("age", result.age, { path: "/admin" });
        //     cookies.set("email", result.email, { path: "/admin" });
        //     cookies.set("password", result.password, { path: "/admin" });
        //     cookies.set("role", result.role, { path: "/admin" });
        // }
        // else if(result.role === "client")
        // {
        //     cookies.set("id", result.id, { path: "/client" });
        //     cookies.set("name", result.name, { path: "/client" });
        //     cookies.set("address", result.address, { path: "/client" });
        //     cookies.set("age", result.age, { path: "/client" });
        //     cookies.set("email", result.email, { path: "/client" });
        //     cookies.set("password", result.password, { path: "/client" });
        //     cookies.set("role", result.role, { path: "/client" });
        // }
        //else

        cookies.set("id", result.id, { path: "/" });
        cookies.set("name", result.name, { path: "/" });
        cookies.set("address", result.address, { path: "/" });
        cookies.set("age", result.age, { path: "/" });
        cookies.set("email", result.email, { path: "/" });
        cookies.set("password", result.password, { path: "/" });
        cookies.set("role", result.role, { path: "/" });

        this.setState({ id: result.id });
        this.setState({ name: result.name });
        this.setState({ address: result.address });
        this.setState({ age: result.age });
        this.setState({ email: result.email });
        this.setState({ password: result.password });
        this.setState({ role: result.role });
    }


    setAllNull()
    {
        const { cookies } = this.props;

        //Cand esti pe home, trebuie refacut!!!
        cookies.set("id", "noId", { path: "/" });
        cookies.set("name", "noName", { path: "/" });
        cookies.set("address", "noAddress", { path: "/" });
        cookies.set("age", "noAge", { path: "/" });
        cookies.set("email", "noEmail", { path: "/" });
        cookies.set("password", "noPassword", { path: "/" });
        cookies.set("role", "noRole", { path: "/" });

        this.setState({ id: "noId" });
        this.setState({ name: "noName" });
        this.setState({ address: "noAddress" });
        this.setState({ age: "noAge" });
        this.setState({ email: "noEmail" });
        this.setState({ password: "noPassword" });
        this.setState({ role: "noRole" });
    }



    //Nu trebuie nimic, doar apelul metodei;
    render() {

        //Nu stiu daca merg const:
        // const { id } = this.state.id;
        // const { name } = this.state.name;
        // const { address } = this.state.address;
        // const { age } = this.state.age;
        // const { email } = this.state.email;
        // const { role } = this.state.password;

        //Trebuie luata data:
        return (
            // <div onChange = {this.handleUserChange(result)}>
            //     {/*{this.state.name && <h1>Test: {this.state.name}!</h1>}*/}
            // </div>
            <div>
            </div>
        );
    }
}


export default withCookies(userCookie);



