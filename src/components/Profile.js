import React, { Component } from 'react'
import firebase from "../Firebase"
import { getProfilePicUrl, getUserName, getUserEmail } from "../components/utils/FirebaseAuth"

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
            }else{
                this.setState({
                    user :null
                })
            }
        })
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

        if(btnState === 0){
            saveEmailBtn = <button name="emailBtn" className="edit-btn tert-btn" onClick={this.handleSave}>Save</button>
            saveNameBtn = <button name="nameBtn" className="edit-btn tert-btn" onClick={this.handleSave}>Save</button>
        }else{
            saveNameBtn = <button name="nameBtn" className="edit-btn tert-btn" onClick={this.handleEdit}>Edit</button>
            saveEmailBtn = <button name="emailBtn" className="edit-btn tert-btn" onClick={this.handleEdit}>Edit</button>
        }

        

        // if(this.state.user){
            return (
                <div className="profile">
                    <div className="bio-panel">
                    <div className="dp-img">
                            <img src={getProfilePicUrl()} alt="DP"/>
                        </div>
                    <div className="name-panel">
                        <div className="edit" id="nameEdit">
                        <form onSubmit={this.handleSave}>
                        <h3>{getUserName()}</h3>
                        </form>
                            {saveNameBtn}
                        </div>
                        <div className="edit" id="emailEdit">
                        <form onSubmit={this.handleSave}>
                        <h4>{getUserEmail()}</h4>
                        </form>
                            {saveEmailBtn}
                        </div>
                    </div>
                </div>                  
                </div>
            )
    }
}

export default Profile

