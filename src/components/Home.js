import React, { Component } from 'react'
import '../App.css'

import {
    // BrowserRouter as Router,
    // Switch,
    // Route,
    Link,
  } from "react-router-dom";

class Home extends Component {
    render() {
        return (
            <div className="flex-container">
                <div className ="small-box">
                    {/* <a href="/tabs?type='company'">Company </a> */}
                    <Link to="/tabs/company">company</Link>
                </div>

                <div className ="small-box">
                    {/* <a href="/tabs?type='items'">items</a> */}
                    <Link to="/tabs/items">items</Link>
                </div>

                <div className ="small-box">
                    {/* <a href="/tabs?type='Previlege'">Previlege</a> */}
                    <Link to="/tabs/privilege">privilege</Link>
                </div>

                <div className ="small-box">
                    {/* <a href="/tabs?type='cart'">cart</a> */}
                    <Link to="/tabs/cart">cart</Link>
                </div>

            </div>
        )
    }
}

export default Home
