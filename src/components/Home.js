import React, { Component } from 'react'
import firebase from "../Firebase"
// import profileThumb from "../images/profileThumb.png"
// import { getProfilePicUrl, getUserName } from "../components/utils/FirebaseAuth"
import Addpost from "../components/utils/Addpost"
import Post from "../components/utils/Post"
import ChatBoard from './utils/ChatBoard'
// import UpLoadimg from "../components/utils/upLoadimg";

export class Home extends Component {

    constructor(props){
        super(props)
        this.state = {
            user : null,
            sideMenuClass : 0
        }
    }
    
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user=>{
            if(user){
                this.setState({user})
            }else{
                this.setState({
                    user :null
                })
            }
        })
    }

    toggelSideMenu = (e) => {
        e.preventDefault();
        this.setState({
            sideMenuClass : 1 - this.state.sideMenuClass
        })
    }

    render() {
        let {user, sideMenuClass} = this.state
        
        let btnClass = sideMenuClass ? 'chat-btn' : 'chat-btn menu-hide';
        
        if(user){
            return (
                <div className="home-layout">
                    <div className="feed">
                        <Addpost/>
                        <Post display="home"/>
                    </div>
                    
                    <div className="for-desktop">
                        <ChatBoard />
                    </div>
                    {/* will display on mobile via css media query  */}
                    <div className={btnClass}>
                        <button onClick={this.toggelSideMenu} className="tert-btn"><span role="img" aria-label="chat">👋</span></button>
                        <div className="side-menu">
                            <div className="for-mobile">
                                <ChatBoard />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }else{
            return (
                <div className="homeLoading">
                    <h2>No previous Login!</h2>
                      <p>To Signup/Signin click menu buttons</p>                  
                </div>
            )
        }
        
        
    }
}

export default Home
