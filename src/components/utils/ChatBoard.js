import React, { Component } from 'react'
import firebase from  '../../Firebase'
import Loading from './Loading'

export default class ChatBoard extends Component {

    constructor(props){
        super(props)

        this.state = {
            users : [],
            isLoading : true
        }
    }

    onCollectionUpdate = () => {
        
    }

    componentDidMount(){
        const ref = firebase.firestore().collection('users');

        ref.get().then(result => {
            let users =[]
            result.docs.forEach(doc => {
                let {username, profileUrl, userid} = doc.data()
                
                users.push({
                    username,
                    profileUrl,
                    userid
                })
            }); 
            this.setState({
                users
            }) 
            this.setState({
                isLoading : false
            })          
        })
    }

    render() {
        const imgFail = 'https://firebasestorage.googleapis.com/v0/b/friendly-33b9e.appspot.com/o/profileThumb.png?alt=media&token=51edcc58-6a61-4746-8921-8c820f4de8bf'
        
        return (
                <div className="chat-board">
                <div className="header">
                    <h2>HeyPal Users</h2>
                </div>
                <div className="users">
                    <ul>
                    { 
                        this.state.isLoading ? <Loading /> : 
                        this.state.users.map(user => 
                        <li key={user.userid} className="user-tab tert-btn">
                            <div className="dp ">
                                <img src={user.profileUrl || imgFail} alt="DP"/>
                            </div>
                            <div className="user-name">
                            <h4>{user.username}</h4>
                            </div>
                        </li>)
                    }
                    </ul>
                </div>
            </div>            
        )
    }
}
