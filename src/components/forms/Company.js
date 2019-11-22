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

                    <div className="form-container">

                        <div className = "form-element">
                            <div className = 'form-label'>
                                <label> Name</label>
                            </div>
                            <div className = 'form-tag'>
                                <input type='text' name='name' value = {this.state.name} onChange={this.ChangeHandler}/> 
                            </div>
                        </div>

                        <div className = "form-element">
                            <div className = 'form-label'>
                                <label> Address</label>
                            </div>
                            <div className = 'form-tag'>
                                <input type='text' name='address' value = { this.state.address} onChange = {this.ChangeHandler}/> 
                            </div>

                        </div>

                        <div className = "form-element">
                            <div className = 'form-label'>
                                <label> Contact</label>
                            </div>
                            <div className = 'form-tag'>
                            <input type='text' name='contact' value = { this.state.contact} onChange = {this.ChangeHandler}/> 
                            </div>

                        </div>

                        <div className = "form-element">
                            <div className = 'form-label'>
                                <label> Discription</label>
                            </div>
                            <div className = 'form-tag'>
                                <input type='text' name='discription' value = { this.state.discription} onChange = {this.ChangeHandler}/> 
                            </div>

                        </div>
                        <div className = "submit-div">
                        <button className = "submit-btn" type= "submit"> Add Company </button>
                        </div>
                    </div>

                    
                </form>
            
            </div>
        )
    }
}

export default Company
