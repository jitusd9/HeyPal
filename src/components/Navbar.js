import React, { Component } from 'react'
import { Link } from "react-router-dom";
import firebase from "./../Firebase"
// import {theme} from "../components/utils/functions"

export class Navbar extends Component {
    constructor(props){
        super(props)
        this.state= {
            isLoggedOut : true,
            user : null
        }
        this.logOut = this.logOut.bind(this)
        this.logIn = this.logIn.bind(this)
        
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged(user=>{
            if(user){
                this.setState({user})
            }
        })
    }

    logIn(){
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
            this.setState({
                user: result.user
            })
        })
    }

    logOut(){
        firebase.auth().signOut().then(result => {
            this.setState({
                user: null
            })
        })
    }

    render() {
        
        // const theme = this.state
        const authBtn = this.state.user ? 
       
            <li className="nav-btn tert-btn" onClick={this.logOut}>
                <Link to="/">Log Out</Link>
            </li> :
            <li className="nav-btn tert-btn" onClick={this.logIn}>
                <Link to="/">Log In</Link>
            </li> 
        
        return (  

            <div className="navbar">
                <div className="logo">
                    <Link to="/">HeyPal</Link>
                </div> 
                <div className="page-title">{this.props.title}</div>
                <ul>
                    <li className="nav-btn tert-btn">
                        <Link to="/profile">Profile</Link> 
                    </li>
                    {
                        authBtn
                    }
                    {/* not needed when using Google Auth 
                    <li className="nav-btn">
                        <Link to="/signup">Sign Up</Link>
                    </li> */}
                </ul>
            </div>               
        )
    }
}

export default Navbar
