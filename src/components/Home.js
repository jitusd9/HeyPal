import React, { Component } from 'react'
import firebase from "../Firebase"
// import profileThumb from "../images/profileThumb.png"
// import { getProfilePicUrl, getUserName } from "../components/utils/FirebaseAuth"
import Addpost from "../components/utils/Addpost"
import Post from "../components/utils/Post"

export class Home extends Component {

    constructor(props){
        super(props)
        this.state = {
            user : null
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

    render() {
        let user = this.state.user
        
        if(user){
            return (
                <div className="home-layout">
                    <Addpost/>
                    <Post />
                </div>
            )
        }else{
            return (
                <div>
                    <h3>Login First</h3>                    
                </div>
            )
        }
        
        
    }
}

export default Home
