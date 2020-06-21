import React, { Component } from 'react';
import firebase from "../../Firebase";
import { getUserId } from "../utils/FirebaseAuth"
import Postcard from "../utils/Postcard";
import Loading from './Loading';


const timming = (time) => {
       
    if(time === null){
        return 'Loading...';
    }
        // Unixtimestamp
    var unixtimestamp = time.seconds
    // Months array
    var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    // Convert timestamp to milliseconds
    var date = new Date(unixtimestamp*1000);

    // Year
    var year = date.getFullYear();

    // Month
    var month = months_arr[date.getMonth()];

    // Day
    var day = date.getDate();

    // Hours
    var hours = date.getHours();

    // Minutes
    var minutes = "0" + date.getMinutes();

    // Seconds
    var seconds = "0" + date.getSeconds();

    // AM/PM 
    var ampm = hours > 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;

    // Display date time in MM-dd-yyyy h:m:s format
    var convdataTime = month+'-'+day+'-'+year+' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + ' ' + ampm;

    return convdataTime;
}


export class Post extends Component {
    constructor(props){
        super(props)
        
        this.unsubscribe = null;
        this.state = {
            posts : [],
            isLoading : true,
            users : [],
        }
    }

   onCollectionUpdate = (querySnapshot) =>{
        const posts = [];
        querySnapshot.forEach((doc) => {
            let {content, timestamp, photos, userId} = doc.data();
            
            let username ;
            let profileUrl ;
            this.state.users.forEach(user => {
                if(user.key === userId){
                    username = user.username;
                    profileUrl = user.profileUrl;
                }
            })
            // console.log(username, profileUrl);

            posts.push({
                key: doc.id,
                content,
                userName : username,
                profilePicUrl : profileUrl,
                timestamp : timming(timestamp),
                photos
            })
        });
        this.setState({
            posts,
            isLoading : false
        });

        // console.log('user state', this.state.users);

    }

    // getUserData = (userid) => {
    //     // let username , profileUrl
    //     this.state.users.forEach(user => {
    //         if(user.key === userid){
    //             return [user.username, user.profileUrl]
    //         }else{
    //             return ['username', 'profileUrl']
               
    //         }
    //     })
        
    // }
    

    componentDidMount(){   
        
        // get users first 
        const ref = firebase.firestore().collection('users');
        const users = [];
        ref.get().then((docs) => {
                docs.forEach(user=> {

                    const { username, profileUrl } = user.data();
                    users.push({
                        key : user.id,
                        username : username,
                        profileUrl : profileUrl,
                    });
                    
                })
                
                this.setState({  users })
            
        }).catch(err=> console.log('error getting users :', err));
        
        if(this.props.display === 'profile') {
            let userid = getUserId();
            this.ref = firebase.firestore().collection('posts').where("userId", "==", `${userid}`).orderBy("timestamp", "desc");
        }else{

            this.ref = firebase.firestore().collection('posts').orderBy("timestamp","desc");
        }
        
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }



    render() {
        const { isLoading } = this.state
        if(isLoading){
            return(
                <div>
                    <Loading />
                </div>
            )
        }else{
            return (
                <div>
                    {this.state.posts.map(post =>
                        <div key={post.key}>
                            <Postcard renderFrom={this.props.display} postKey={post.key} profilePicUrl={post.profilePicUrl} timestamp={post.timestamp} name={post.userName} content={post.content} photos={post.photos}/>
                        </div>
                    )}
                </div>
            )
        }
    }
}

export default Post