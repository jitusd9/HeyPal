import React, { Component } from 'react'
import firebase from "../../Firebase";
import { getUserId } from "../utils/FirebaseAuth";
import ShowComment from "../Comments/ShowComment"

export class Showcmt extends Component {

    constructor(props){
        super(props)
		this.ref = firebase.firestore().collection("comments");
        this.state = {
            content : '',
            isClicked : false,

        }
    }

    handleComment = (e) => {
        this.setState({
            content : e.target.value
        })
    }
  
    submitComment = (e) => {
        e.preventDefault();

        if(this.state.content === ""){
            return null;
        }

        const { content } = this.state;

        this.ref.doc(this.props.postId).collection('postComments').add({
            // postId : this.props.postId,
            userId: getUserId(),
			content,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        }).then(docRef => {
            console.log('comment added');

            this.setState({
                // postId : "",
                userId: "",
                content : "",
                timestamp: ""
            })

        }).catch(err => console.log('Error adding comment :', err));
    }

    // componentDidMount(){

    // }

   
    render() {
        return (
            <div className="comment-area">
                    <ShowComment postId={this.props.postId}/>
                    <form onSubmit={this.submitComment}>
                        <textarea name="comment" id="cmt" onChange={this.handleComment} placeholder="What do you think..." value={this.state.content}></textarea>
                        <button className="tert-btn" type="submit" >Submit</button>
                    </form>
            </div>
        )
    }
}

export default Showcmt
