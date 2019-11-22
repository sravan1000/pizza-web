import React, { Component } from 'react'
import axios from 'axios';

export class Company extends Component {

    constructor(){
        super();
        this.state = {
            _id:"",
            name: "",
            address: "",
            discription: "",
            contact: ""
        }
    }

    ChangeHandler = (event) =>{
        this.setState({ [event.target.name] : event.target.value })
    }

    submitHandler =(event) =>{
        console.log(this.state); 
        // let headers = {Accept: 'application/json','Content-Type': 'application/json'};
        axios.post("http://localhost:5000/save/company",JSON.stringify({data:this.state})).then((response,err)=>{
            if(err){
                console.log(err);
            }else{
                alert("successfully added");
                console.log(response);
            }
        })
    }

    componentDidMount(){
        // axios.get(url, { crossdomain: true })
        if(this.props.id){
            axios.get('http://localhost:5000/fetch/company',{params:{id: this.props.id}}).then((response) => {
            console.log("response is when edit", response["data"]);
            console.log("state.data in ajax call",response.data.data)
           
            if(response.data.data){
                let item = response.data.data[0];
                this.setState({
                    name : item.name,
                    _id: item._id,
                    address: "No add",
                    discription: item.discription,
                    contact: item.contact

                })
            }
        })
        }
        
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <label> Name</label>
                    <input type='text' name='name' value = {this.state.name} onChange={this.ChangeHandler}/> 

                    <label> Address</label>
                    <input type='text' name='address' value = { this.state.address} onChange = {this.ChangeHandler}/> 

                    <label> Contact</label>
                    <input type='text' name='contact' value = { this.state.contact} onChange = {this.ChangeHandler}/> 

                    <label> Discription</label>
                    <input type='text' name='discription' value = { this.state.discription} onChange = {this.ChangeHandler}/> 

                    <button type= "submit"> Add Company </button>
                </form>
            
            </div>
        )
    }
}

export default Company
