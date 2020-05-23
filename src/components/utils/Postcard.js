import React, { Component } from 'react'
// import { isUserSignedIn } from './FirebaseAuth';

export default class Postcard extends Component {
    // constructor(props){
    //     super(props)

    // }
    render() {

        return (
            <div className="post-card">
            <div className="top-bar">
                <div className="dp">
                    <img src={this.props.profilePicUrl} alt="DP"/>
                </div>
                <div className="post-user">
                    <h4 className="name">{this.props.name}</h4>
                    <p> <small>time stamp need to fix</small> </p>
                </div>
            </div>
            <div className="post-content">
                 <p>{this.props.content}</p>
            </div>
            <div className="bottom-bar">
                <div className="like-btn tert-btn"><span className="like-btn" role="img" aria-label="icon">❤</span> </div>

                <div className="comment-btn tert-btn">Comment</div>
                
            </div>
        </div>
        )
    }
}
