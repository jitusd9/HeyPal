import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../theme';
import { GlobalStyles } from '../global';
import Navbar from "./Navbar"


export default class Layout extends Component {

    constructor(props){
        super(props)
        this.state = {
          theme : "light",
          user : "loading"
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

    render() {

        // theme button 
        let themeBtn = this.state.theme === 'light' ? <span role="img" aria-label="icon">🌚</span> : <span role="img" aria-label="icon">💡</span>

        let theme = this.state.theme;
        
        // const childrenWithExtraProp = React.Children.map(this.props.children, child => {
        //     let themeClass = `App ${theme}`;
        //     return(
        //        <div className={themeClass}>{child}</div> 
        //     )                        
        // })
        let themeClass = `App ${theme}`;
        return (
            <div>
                
                <ThemeProvider theme={this.state.theme === 'light' ? lightTheme : darkTheme}>
                <GlobalStyles/>
                    <div className={themeClass}>
                      <Navbar />
                      {this.props.children}
                    </div> 
                    <button className="themeBtn" onClick={this.toggleTheme}>{themeBtn}</button>
                </ThemeProvider>

            </div>
        )
    }
}

