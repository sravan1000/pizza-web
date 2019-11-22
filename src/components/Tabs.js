import React, { Component } from 'react'
import '../App.css'
// import { useHistory } from "react-router-dom";
import {
    // BrowserRouter as Router,
    // Switch,
    // Route,
    Link,
    // useParams
  } from "react-router-dom";

class Tabs extends Component {
   
    render() {
       
        // let params = useParams();
        // alert(this.props.match.params.type);
        // console.log(this.props);
        let type = this.props.match.params.type ?  this.props.match.params.type : '';
        let company = this.props.company ? this.props.company : '';
        let link_list = '/list/'+type;
        let add_link = '/add/'+type;
        return (
            <div className="flex-container">
                <div className ="small-box">
                    <Link to={link_list} >Show all list {type} {company} </Link>
                </div>

                {/* <div className ="small-box"> 
                    edit {type} {company}
                </div> */}

                <div className ="small-box">
                <Link to={add_link} > add {type} {company} </Link>
                </div>

                <div className ="small-box">
                    <Link to="/">Home</Link>
                </div>
            </div>
        )
    }
}

export default Tabs
