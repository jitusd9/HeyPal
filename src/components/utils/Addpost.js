import React, { Component } from 'react'
import firebase from "../../Firebase"
import { getUserName, getProfilePicUrl } from './FirebaseAuth';

export class Addpost extends Component {
    constructor(){
        super()
        this.ref = firebase.firestore().collection("post")
        this.state = {
            content: "",
            
        }
    }

    onChange = (e) => {
        const state = this.state        
        state[e.target.name] = e.target.value;
        this.setState({
            state : state,
        })
    }

    onSubmit = (e) => {
        e.preventDefault(); 
       
        
        const { content } = this.state;
        
        this.ref.add({
            name : getUserName(),
            content,
            profilePicUrl : getProfilePicUrl() ,
            timestamp : firebase.firestore.FieldValue.serverTimestamp()
        })
        .then((docRef)=>{
            this.setState({
                name : "",
                content: "",
                profilePicUrl : "",
                timestamp : ""
            });
        })
        .catch(err => console.log("Error Adding Document: ", err) );
    }
   
    render() {
        const {content} = this.state
        return (
            <div className="post-card">
                <form onSubmit={this.onSubmit}>
                    <label htmlFor="post" className="add-content">
                        <textarea onChange={this.onChange}  id="post" name="content" value={content} placeholder="type here something..."/>
                    </label>
                    <div className="bottom-bar">
                        <label className="pri-btn" htmlFor="img-input"> <span title="Upload Image" role="img" aria-label="icon">📷</span>
                        <input  onChange={this.onChange} id="img-input" name="pic" type="file"/>
                        </label>
                        <button className="pri-btn" type="submit" value="submit">Post</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Addpost