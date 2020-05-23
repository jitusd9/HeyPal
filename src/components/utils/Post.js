import React, { Component } from 'react'
// import loginPic from "../../images/profileThumb.png"
import firebase from "../../Firebase"
import Postcard from "../utils/Postcard"

export class Post extends Component {
    constructor(props){
        super(props)
        this.ref = firebase.firestore().collection('post').orderBy("timestamp","desc");
        this.unsubscribe = null;
        this.state = {
            likeCount : 0,
            comment : "",
            addCmt : 0,
            showCmt : "",
            posts : [],
            isLoading : true
        }
        this.handleLike = this.handleLike.bind(this)
        this.handleComment = this.handleComment.bind(this)
        this.addComment = this.addComment.bind(this)
        this.saveComment = this.saveComment.bind(this)
    }

    handleLike(){
        this.setState({
            likeCount : this.state.likeCount + 1
        })
    }

    addComment(){
        this.setState({
            addCmt : 1 - this.state.addCmt
        })
        console.log(this.state.addCmt);
        
    }

    handleComment(e){
        this.setState({
            comment : e.target.value,
        })
    }
    
    saveComment(e){
        e.preventDefault()        
        this.setState({
            showCmt: this.state.comment,
            addCmt : 1 - this.state.addCmt
        })
    }

    onCollectionUpdate = (querySnapshot) =>{
        const posts = [];
        querySnapshot.forEach((doc) => {
            const {content, name, profilePicUrl, timestamp} = doc.data();
            posts.push({
                key: doc.id,
                content,
                name,
                profilePicUrl,
                timestamp
            })
        });
        this.setState({
            posts
        })
    }

    componentDidMount(){
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
        setTimeout(() => {
            this.setState({
                isLoading : false
            }) 
        }, 2000);
    }

    render() {
        if(this.state.isLoading){
            return(
                <div>
                    <h2>Loading...</h2>
                </div>
            )
        }else{
            return (
                <div>
                    {this.state.posts.map(post =>
                        <div key={post.key}>
                            <Postcard profilePicUrl={post.profilePicUrl} timestamp={post.timestamp} name={post.name} content={post.content}/>
                        </div>
                    )}
                </div>
            )
        }
        
    }
}

export default Post