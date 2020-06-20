import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import "./App.css"
import Home from "./components/Home"
import Layout from "./components/Layout"
import Signup from './components/Signup';
import Profile from "./components/Profile"

import firebase from "./Firebase"

export class App extends React.Component {

 

  constructor(props){
    super(props)
    this.state = {
      user : "loading"
    }
  }

  componentDidMount(){

    firebase.auth().onAuthStateChanged(user=>{
      if(user){
          this.setState({user})
      }else{
        this.setState({user})
      }
    })
  }

  componentWillUnmount() {
    // the warning of unmounted component 
  }

  render() { 
    const {user} = this.state;


    // condition render 
    let toBeRender;
    if(user === 'loading'){
      toBeRender = <Layout>
                    <div className="homeLoading">
                      <h2>Checking User...</h2>
                      {
                        user === null ? "No previous Login! please login." : null
                      }
                    </div> 
                   </Layout>
    }else if(user){
      toBeRender = <Layout>
                    <Route exact path="/" render={(props)=><Home {...props} user={user}/>} />
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/signup" render={()=><Signup />} />  
                  </Layout>    
    }else{
      toBeRender = <Layout>
                    <div className="homeLoading">
                      <Route exact path="/" render={(props)=><Home {...props} user={user}/>} />
                      <Route exact path="/signup" render={(props)=><Signup {...props} alert="No previous Login! please login." />} />
                      
                    </div>
                   </Layout> 
    }
    
      return (
        <Router>
          
                {toBeRender}
          
        </Router>
      )   
  }
}

export default App;

