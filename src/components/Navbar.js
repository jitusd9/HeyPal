import React, { Component } from 'react'
import { Link } from "react-router-dom";
import firebase from "./../Firebase"
import googleIcon from '../images/google.png';
import { getProfilePicUrl } from './utils/FirebaseAuth';
// import {theme} from "../components/utils/functions"

export class Navbar extends Component {
    constructor(props){
        super(props)
        this.ref = firebase.firestore().collection("users");
        this.state= {
            isLoggedOut : true,
            user : null,
            mobileMenu : true,
            menuClicked : false
        }
        // this.logOut = this.logOut.bind(this)
        // this.logIn = this.logIn.bind(this)
        
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged(user=>{
            if(user){
                // let isAnonymous = user.isAnonymous;
                // let uid = user.uid;                
                this.setState({user})
            }
        })
    }

    createUser = () => {
        // This method will create user invoked from login methods
    }

    anonymousLogin = () => {
        this.setState({
            menuClicked : true,
            mobileMenu : 1 - this.state.mobileMenu
        })
        firebase.auth().signInAnonymously().then((result)=>{
            
            let user = result.user;
            
            this.ref.doc(user.uid).set({
                userid : user.uid,
                username : `user_${user.uid.slice(0,6)}`,
                useremail : null,
                profileUrl : getProfilePicUrl()
            }).catch(err=> console.log("Error adding User :", err))

            this.setState({
                user : result.user,
                menuClicked : false
            })
                    
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(`Error Code : ${errorCode}Error Message : ${errorMessage}`);
            
          });
    }

    logIn = () =>{
        this.setState({
            menuClicked : true,
            mobileMenu : 1 - this.state.mobileMenu
        })
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then((result) => {

            let user = result.user;
            this.ref.doc(user.uid).set({
                userid : user.uid,
                username : user.displayName,
                useremail : user.email,
                profileUrl : user.photoURL
            }).catch(err=> console.log("Error adding User :", err))

            this.setState({
                user: result.user,
                menuClicked : false
            })
        })
    }

    logOut = () =>{
        this.setState({
            mobileMenu : 1 - this.state.mobileMenu
        })
        firebase.auth().signOut().then(result => {
            this.setState({
                user: null
            })
        })
    }

    handleMenu = () => {
        this.setState({
            mobileMenu : 1 - this.state.mobileMenu
        })
    }

    render() {
        const {mobileMenu, user , menuClicked} = this.state

        let menuClass =  mobileMenu ? 'nav-collapse show-menu' : 'nav-collapse'

        const loadingClass = menuClicked ? "loading-screen" : "loading-screen hide-loading"
        
        const authBtn = user ? 
       
            <li className="nav-btn tert-btn logout-btn" onClick={this.logOut}>
                <Link to="/">Log Out</Link>
            </li> : null
            

        const profileBtn = user ? 
            <li className="nav-btn tert-btn" onClick={this.handleMenu}>
                <Link to="/profile">Profile</Link> 
            </li> :
            null
        
        return (  

            <div className="navbar">
                <div className="logo">
                    <Link to="/">HeyPal</Link>
                </div> 
                <div className="page-title">{this.props.title}</div>
                <div className="menu-icon" onClick={this.handleMenu} > <span role="img" aria-label="menu-icon">⚙</span> </div>
                {/* <div className={menuClass}> */}
                    <ul className={menuClass}>
                        {
                            profileBtn
                        }
                        <li className="nav-btn tert-btn google-btn" onClick={this.logIn}>
                            <Link to="/"> <span><img src={googleIcon} alt="google-icon" className="google-icon"
                            /> </span>  SignIn with Google</Link>
                        </li> 
                        <li className="nav-btn tert-btn" onClick={this.anonymousLogin}>
                            <Link to="/">SignIn Anonymously</Link>
                        </li>
                        <li className="nav-btn tert-btn">
                            <Link to="/signup">SignUp</Link>
                        </li>
                        {
                            authBtn
                        }
                    </ul>
                {/* </div> */}
                <div className={loadingClass}>
                    <h2>Loading...</h2>
                </div>
            </div>               
        )
    }
}

export default Navbar
