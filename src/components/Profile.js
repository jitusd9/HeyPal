import React, { Component } from 'react'
import {Link} from "react-router-dom"
import firebase from "../Firebase"
import { getProfilePicUrl, getUserName, getUserEmail } from "../components/utils/FirebaseAuth"
import Post from './utils/Post'

export class Profile extends Component {
  

    constructor(props){
        super(props)
        
        this.state = {
            user : null,
            emailBtn : 1,
            nameBtn : 1
        }

        this.handleEdit = this.handleEdit.bind(this)
        this.handleSave = this.handleSave.bind(this)
    }

    componentDidMount(){

       
      firebase.auth().onAuthStateChanged(user=>{
            if(user){
                this.setState({user})
                // email = user.email;
            }else{
                this.setState({
                    user :null
                })
            }
        })
        
        // let email = getUserEmail();
        // const docRef = firebase.firestore().collection('posts').where("userEmail", "==", {email})
        
        // docRef.get().then((doc)=> {
            
        // }).catch(err => console.log(err))
            
          
        
    }

    componentWillUnmount(){
        // Warnign says something to do in this method  : Unscribe 
    }

    

    handleEdit = (e) =>{
        let state = e.target.name;    
        console.log(state);
          
        this.setState({
            [state] : 1 - this.state.emailBtn 
        })
        this.setState(prevState => ({
            [state]: !prevState.state
        }));
       
    }

    handleSave = (e) => {
        let state = e.target.name;      
        this.setState({
            [state] : 1 - [state]
        })
    }
    
    render() {
        const { btnState } = this.state;
        var saveEmailBtn, saveNameBtn
        let userEmail = getUserEmail();
        let userName = getUserName();
        // temp to work 
        let uid = '1543@4f12433' 

        if(btnState === 0){
            saveEmailBtn = <button name="emailBtn" className="edit-btn tert-btn" onClick={this.handleSave}>Save</button>
            saveNameBtn = <button name="nameBtn" className="edit-btn tert-btn" onClick={this.handleSave}>Save</button>
        }else{
            saveNameBtn = <button name="nameBtn" className="edit-btn tert-btn" onClick={this.handleEdit}>Edit</button>
            saveEmailBtn = <button name="emailBtn" className="edit-btn tert-btn" onClick={this.handleEdit}>Edit</button>
        }

            return (
                <div className="profile">
                    <div className="bio-panel">
                        <div className="dp-img">
                            <img src={getProfilePicUrl()} alt="DP"/>
                        </div>
                        <div className="name-panel">
                            <div className="edit" id="nameEdit">
                            <form onSubmit={this.handleSave}>
                            <h1>{userName}</h1>
                            </form>
                                {saveNameBtn}
                            </div>
                            <div className="edit" id="emailEdit">
                            <form onSubmit={this.handleSave}>
                            <h4>{userEmail}</h4>
                            </form>
                                {saveEmailBtn}
                            </div>
                        </div>
                    </div> 
                    <div className="tab-panel">
                        <Link to={`${uid}/posts`}>Posts</Link>
                        <Link to={`${uid}/followers`}>Followers</Link>
                        <Link to={`${uid}/following`}>Following</Link>
                    </div>
                    <div className="yourPosts">
                        <Post display="profile"/>
                    </div>                 
                </div>
            )
    }
}

export default Profile

