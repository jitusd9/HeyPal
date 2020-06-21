import React, {Component} from 'react'
import firebase from "../../Firebase";

export class ShowComment extends Component {

    constructor(props){
        super(props)
        this.state = {
            users : [],
            comments : [],
            profileUrl: "",
            isLoading : true
        }
    }

    onCollectionUpdate = (querySnapshot) =>{
        const comments = [];
        querySnapshot.forEach((doc) => {
            let {content, userId} = doc.data();
            
            let profileUrl;
            this.state.users.forEach(user => {
                if(user.key === userId){
                    profileUrl = user.profileUrl;
                }
            })
            // console.log(user, profileUrl);

            comments.push({
                key: doc.id,
                content,
                profileUrl
            })
        });
        this.setState({
            comments,
            isLoading : false
        });

        // console.log('user state', this.state.users);

    }

    componentDidMount(){
        // getting all users 
         // get users first 
         const ref = firebase.firestore().collection('users');
         const users = [];
         ref.get().then((doc) => {
                 doc.forEach(user=> {
 
                     const { username, profileUrl } = user.data();
                     users.push({
                         key : user.id,
                         username : username,
                         profileUrl : profileUrl,
                     });
                     
                 })
                 
                 this.setState({  users })
             
         }).catch(err=> console.log('error getting users :', err));

        this.ref = firebase.firestore().collection('comments').doc(this.props.postId).collection('postComments').orderBy("timestamp","asc");
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }

    render() {
        return (
            <div>
            {
                this.state.comments.map(comment =>
                    <div key={comment.key}>
                        
                        <div className="show-comments">
                            <div className="comment-tab">
                                <div className="user">
                                    <div className="dp">
                                      {
                                          comment.profileUrl ? <img src={comment.profileUrl} alt="user_dp"/> : null
                                      }  
                                    </div>
                                    <div className="comment">
                                        <p>{comment.content}</p>
                                    </div>
                                   <div className="delete-btn"> <span role="img" aria-label="delete">🗑</span> </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    )
            }                    
            </div>
        )
    }
}

export default ShowComment

