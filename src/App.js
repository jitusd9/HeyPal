import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import "./App.css"
import firebase from "./Firebase"
import Home from "./components/Home"
import Layout from "./components/Layout"
import Signup from './components/Signup';
import Profile from "./components/Profile"

import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import { GlobalStyles } from './global';


export class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      theme : "light",
      user : null
    }
  }

  toggleTheme = () => {
    if(this.state.theme === 'light'){
      this.setState({
        theme : 'dark'
      })
    }else{
      this.setState({
        theme : 'light'
      })
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user=>{
      if(user){
          this.setState({user})
      }
    })
  }

  render() { 
    const {user} = this.state;

    let themeBtn = this.state.theme === 'light' ? <span role="img" aria-label="icon">🌝</span> : <span role="img" aria-label="icon">🌒</span>
    
    if(user){
      return (
        <ThemeProvider theme={this.state.theme === 'light' ? lightTheme : darkTheme}>
        <Router>
        <GlobalStyles/>
          <div className={`App ${this.state.theme}`}>
              <Layout>
                <button className="themeBtn" onClick={this.toggleTheme}>{themeBtn}</button>
                <Route exact path="/" render={(props)=><Home {...props} user={user}/>} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/signup" render={()=><Signup />} />
              </Layout>
          </div>
        </Router>
        </ThemeProvider>
      )
    }else{
      return (
        <ThemeProvider theme={this.state.theme === 'light' ? lightTheme : darkTheme}>
        <Router>
        <GlobalStyles/>
          <div className={`App ${this.state.theme}`}>
              <Layout>
                <h2>Login first </h2>
              </Layout>
          </div>
        </Router>
        </ThemeProvider>
      )
    }    
  }
}

export default App;

// import React, {useState} from 'react';


// function App() {

//   const [theme, setTheme] = useState('light');

//   const toggleTheme = () => {
//     if(theme === 'light'){
//       setTheme('dark')
//     }else{
//       setTheme('light')
//     }
//   }

//   return (
//     <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
//       <>
//         <GlobalStyles />
//         <button onClick={toggleTheme}>Toggle theme</button>
//         <h1>It's a light theme!</h1>
//         <footer>
//         </footer>
//       </>
//     </ThemeProvider>
//   );
// }

// export default App;
