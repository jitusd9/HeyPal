// sign up with google
import React, { Component } from 'react'
import { signIn } from "../components/utils/FirebaseAuth"
import { Link } from "react-router-dom"

export class Signup extends Component {

    constructor(props){
        super(props)
        this.state = {
            isLoggedin : false
        }
      
        this.handleLoginBtn = this.handleLoginBtn.bind(this)
    }

    async handleLoginBtn(){
        let signed = 0;
        console.log("signed: ", signed);
        
        signed = await signIn();
        console.log("after singin",signed);
    
        if(signed){
          this.setState({
            isLoggedin : true
          })
        }    
      }


    render() {
        let {isLoggedin} = this.state;
        let text = "placeholder"
        if(!isLoggedin){
            text = "User not looged in"
        }else{
            text = "Whoa! you've signed in"
        }
        return (
            <div>
                <h1>Signup page</h1>
                <button onClick={this.handleLoginBtn}>Sign in with Google</button>
                <Link to="/">Take me home</Link>
                <hr/>
                <h3>{text}</h3>
            {/* <Router>
                <Route path="/" render={Home}/>
            </Router> */}
            </div>
        )
        
    }
}

export default Signup
