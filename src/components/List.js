import React, { Component } from 'react'
import axios from 'axios';

import '../App.css';
import {
    // BrowserRouter as Router,
    // Switch,
    // Route,
    Link,
  } from "react-router-dom";
export class List extends Component {

    constructor(){
        super();
        this.state = {
            data : [],
            companydata:[],
            cartValue: 0
        }
    }


    componentDidMount(){
        // axios.get(url, { crossdomain: true })
            console.log("props before api is..",this.props);
        if(this.props.match.params.type  === 'company'){
            axios.get('http://localhost:5000/fetch/company',{crossdomain: true}).then((response) => {
                console.log("response is", response["data"]);
                console.log("state.data in ajax call",response.data.data)
                let arr = response.data.data;
                this.setState({
                    data: arr
                })
            })
        }else if(this.props.match.params.type  === 'items'){
            axios.get('http://localhost:5000/fetch/item',{crossdomain: true}).then((response) => {
                console.log("response is", response["data"]);
                console.log("state.data in ajax call",response.data.data)
                let arr = response.data.data;
                this.setState({
                    data: arr
                })
            })
        }else if(this.props.match.params.type === "privilege"){
            axios.get('http://localhost:5000/fetch/privilege',{crossdomain: true}).then((response) => {
                console.log("response is for privilege", response["data"]);
                console.log("state.data in ajax call privilege",response.data.data)
                let arr = response.data.data;
                this.setState({
                    data: arr
                })
            })
        }else if(this.props.match.params.type === "cart"){
            axios.get('http://localhost:5000/fetch/cart',{crossdomain: true}).then((response) => {
                console.log("response is for cart", response["data"]);
                console.log("state.data in ajax call cart",response.data.data)
                let arr = response.data.data;
                this.setState({
                    data: arr
                })
            })

            
            axios.get('http://localhost:5000/fetch/company',{crossdomain: true}).then((response) => {
                    console.log("response is", response["data"]);
                    console.log("state.data in ajax call",response.data.data)
                    let arr = response.data.data;
                    this.setState({
                        companydata: arr
                })
            })
        }
         
    }

    companyChangeHandler = (event) => {
        let company = event.target.value;
        this.setState({
            company : company
        })

        axios.post("http://localhost:5000/calculate/cart",JSON.stringify({
            data:{
                   company
                }
        })).then((response,err)=>{
            if(err){
                console.log(err);
            }else{
                alert("successfully calculated cart value");
                let arr = response.data.data;
                console.log("calculated cart..",arr);
                this.setState({
                    cartValue: arr
                })
                console.log(response);
            }
        })


    }

    addCartHandler = (event) => {

        let id = event.target.value;

        console.log("event... ", event);

        axios.post("http://localhost:5000/save/cart",JSON.stringify({
            data:{item:id}
        })).then((response,err)=>{
            if(err){
                console.log(err);
            }else{
                alert("successfully added to cart");
                console.log(response);
            }
        })
    }

      deleteCartItemHandler = (event) =>{

        let id = event.target.value;
        console.log(id);
        axios.post("http://localhost:5000/delete/cart",JSON.stringify({
            data:{id}
        })).then((response,err)=>{
            if(err){
                console.log(err);
            }else{
                alert("successfully added to cart");
                console.log(response);
            }
        })

    }

    deleteHandler = (event) =>{
        let id = event.target.value;
        let type = this.props.match.params.type;

        console.log("id is...",id);
        console.log("type is...",type);

        if(type === "privilege"){

            axios.post("http://localhost:5000/delete/privilege",JSON.stringify({
                    data:{id}
            })).then((response,err)=>{
                if(err){
                    console.log(err);
                }else{
                    alert("successfully deleted");
                    console.log(response);
                }
            })

        }
        
    }

    render() {
        let dropdown = this.state.companydata.map((companyItem) => 
        <option value = {companyItem._id} key= {companyItem._id}> {companyItem.name}</option>
        )
        let data = this.state.data;
      
        let htmlData = data.map((items)=>
               
            <div className = "flash" key={items._id}>
                <div className = "flash-title">
                    {items.name} 
                </div>
                <div  className = 'falsh-options'>


                        {this.props.match.params.type === 'cart' ? <div>

                            <div id = {items.id} className = 'options'>
                                Count: {items.count}
                            </div>

                            <div id = {items.id} className = 'options'>
                                    Cost: {items.value}
                            </div>

                            <button value = {items._id} className = 'options' onClick={this.deleteCartItemHandler}>
                                    Delete
                            </button>


                            </div>: 

                            <div>
                            <div id = {items.id} className = 'options'>
                            {this.props.match.params.type === 'items' ? <button value={items._id} onClick={this.addCartHandler}> Add to cart </button> : <button value={items._id} className="" onClick = {this.deleteHandler}> Delete </button>}
                            {/* <Link to="" >delete</Link> */}
                            </div>

                            <div id = {items.id} className = 'options'>
                                <Link to={ "/edit/"+this.props.match.params.type+"/"+items._id}>edit</Link>
                            </div>

                            </div>
                        }
                        
                </div>
            </div>
        )
        return (
            <div className = "page">
                <div className="page-title">
                    <h4> All {this.props.match.params.type ? this.props.match.params.type +'\'s' : ""} </h4>
                </div> 
                    
                <div className="flash-container"> 
                {htmlData}
                {this.props.match.params.type === 'cart' ? <div className="flash"> 
                        <div className='flash-title'>
                        <label> Company :</label>
                        <br />
                        <select value = {this.state.company} name= "company" onChange = {this.companyChangeHandler}>
                            <option value= ""> Please select company</option>
                            {dropdown}
                        </select>
                        </div>

                        <div className="flash-options">
                            <div className="options">
                                Cart value is:  {this.state.cartValue}
                            </div>
                        </div>
                    
                        </div>: ""
                }

                </div>
                
            </div>
        )
    }
}

export default List
