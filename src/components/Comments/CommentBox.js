import React, { Component } from 'react'
import ShowComment from "../Comments/ShowComment"

export class Showcmt extends Component {

    constructor(props){
        super(props)
        this.state = {
            comment : '',
            isClicked : false,

        }
    }

    handleComment = (e) => {
        this.setState({
            comment : e.target.value
        })
    }
  
    submitComment = (e) => {
        e.preventDefault();
        
    }

    componentDidMount(){

    }

   
    render() {
        return (
            <div>
                    <ShowComment />
                    <form onSubmit={this.submitComment}>
                        <textarea name="comment" id="cmt" onChange={this.handleComment} placeholder="What do you think..."></textarea>
                        <button className="tert-btn" type="submit" >Submit</button>
                    </form>
            </div>
        )
    }
}

export default Showcmt
