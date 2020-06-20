import React, { Component } from 'react'
// import { isUserSignedIn } from './FirebaseAuth';
import firebase from "../../Firebase"
import CommentBox from '../Comments/CommentBox';

export default class Postcard extends Component {
    constructor(props){
        super(props)
        this.ref = firebase.firestore().collection('posts');
        this.unsubscribe = null;
        this.state = {
            isClicked : false,
            cmtClass : "comment-box hide",
            comment : "",
            comments : [],
            likeCount : null,
            imageUrl : null
        }
        // this.onCommentClick = this.onCommentClick.bind(this)
    }

    handleLike = () => {
        // write funciton which push value to database adding currentValue to stored value 
        this.setState({
            likeCount : 1
        })
    }

    onCommentClick = () => {
        let isClicked = this.state.isClicked ? false : true
        this.setState({
            isClicked : isClicked,
            cmtClass : isClicked ? "comment-box" : "comment-box hide"
        })
    }

    imageFail = () => {
        this.setState({
            imageUrl : null
        })
    }

    deletePost = (e) => {
        
        let postId = e.target.id

        this.ref.doc(postId).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
                
    } 

    onCollectionUpdate = (querySnapshot) =>{
        const comments = [];
         querySnapshot.forEach((doc) => {
             let {comment } = doc.data();
             
          comments.push({
                key: doc.id,
                comment
            })
        });
         this.setState({
            comments
        })

        // this.unsubscribe();
    }

    componentDidMount(){
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
        this.setState({
            imageUrl : this.props.profilePicUrl
        })
    }


    render() {

        const {likeCount} = this.state

        let ifPhotos = this.props.photos ?  <img src={this.props.photos || 'https://via.placeholder.com/150'} alt="content-img" /> : null

        let deleteBtn = this.props.renderFrom === 'profile' ?  <button onClick={this.deletePost} id={this.props.postKey} className="tert-btn danger-btn">Delete</button> : null
        
        return (
            <div className="post-card">
                <div className="top-bar">
                    <div className="dp">
                        { this.state.imageUrl ? <img src={this.state.imageUrl} alt="DP"/> : null }
                    </div>
                    <div className="post-user">
                        <h4 className="name">{this.props.name}</h4>
                        <p> <small>{this.props.timestamp}</small> </p>
                    </div>
                </div>
                <div className="post-content">
                    <p>{this.props.content}</p>
                    { ifPhotos }
                </div>
                <div className="bottom-bar">
                    <div className="like-btn tert-btn" onClick={this.handleLike}><span className="like-btn" role="img" aria-label="icon">❤</span> <span>{likeCount}</span></div>
                    <div className="comment-btn tert-btn" onClick={this.onCommentClick}>Comment</div>
                   { deleteBtn }
                </div>
                <div className={this.state.cmtClass}>
                    <CommentBox />
                </div>
            </div>
        )
    }
}
