import React, { Component } from 'react';
import firebase from "../Firebase";

export default class Signup extends Component {

    constructor(props){
        super(props);

        this.state = {
            fullname : "",
            username : "",
            password : "",
            email : "",
            errorMessage : "",
            isLoading : false,
            loginPass : "",
            loginUser : ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })        
    }
    
    handleSubmit(e){

        this.setState({
            isLoading : true
        })
        
        let { email , password } = this.state;

        let msm = firebase.auth().createUserWithEmailAndPassword(email, password).then(result=>{
            console.log('It should be user:',  result);
            
        }).catch((error)=> {
            // Handle Errors here.
            // var errorCode = error.code;
            var errorMessage = error.message;
            this.setState({
                errorMessage : errorMessage,
                isLoading : false
            })
          });

        // this.setState({
        //     fullname : "",
        //     username : "",
        //     password : "",
        //     email : "",
        // })
        console.log(` Error Message :${msm}`);

        e.preventDefault();
    }


    submitLogin = (e) => {
        e.preventDefault();
        if(this.state.loginUser === "" || this.state.loginPass === ""){
            this.setState({
                errorMessage : "Don't leave empty cells."
            })
            return null
        }else{
            this.setState({
                isLoading : true
            })
        }
        

        

        const {loginPass, loginUser} = this.state;
        let email = loginUser;
        let password = loginPass;

        firebase.auth().signInWithEmailAndPassword(email, password).then(result => {
            
            this.setState({
                isLoading : false
            })
                
        }).catch((error) => {
            // Handle Errors here.
            // var errorCode = error.code;
            var errorMessage = error.message;
            this.setState({
                errorMessage : errorMessage,
                isLoading : false
            })
          });

    }

    render() {

        const {errorMessage, isLoading} = this.state;

        let errorNotification = errorMessage !== "" ?
         <div className="error-notification">
            <p>{this.state.errorMessage}</p>
         </div> : null

        let loadingClass = isLoading ? "loading-screen" : "loading-screen hide-loading";

        return (
            <div className="account">
            { errorNotification }
                <div className="forms">
                <div className="signup-form">
                    <h1>Create Account</h1>
                    <form onSubmit={this.handleSubmit}>

                        <label htmlFor="fullName">Full Name</label>
                        <input value={this.state.fullname} onChange={this.handleChange} id="fullName" name="fullname" type="text"/>

                        <label htmlFor="user">User Name</label>
                        <input id="user" value={this.state.username} onChange={this.handleChange} name="username" type="text"/>

                        <label htmlFor="pass">Password</label>
                        <input id="pass" value={this.state.password} onChange={this.handleChange} name="password" type="password"/>

                        <label htmlFor="email">Email</label>
                        <input id="email" value={this.state.email} onChange={this.handleChange} name="email" type="email"/>

                        <button type="submit" className="tert-btn" value="submit">Sign Up</button>
                    </form>
                </div>
                <div className="signin-form">
                    <h1>Log In</h1>
                    <form action="#" onSubmit={this.submitLogin}>
                        <label htmlFor="loginUser">User Name</label>
                        <input id="loginUser" name="loginUser" onChange={this.handleChange} type="text"/>

                        <label htmlFor="loginPass">Password</label>
                        <input id="loginPass" name="loginPass" onChange={this.handleChange} type="password"/>

                        <button type="submit" className="tert-btn">Log In</button>
                    </form>
                </div>
                </div>
                <div className={loadingClass}>
                    <h2>Loading...</h2>
                </div>
            </div>
        )
    }
}
