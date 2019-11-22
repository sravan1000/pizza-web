import React, { Component } from 'react'
import axios from 'axios';

export class Item extends Component {

    constructor(){
        super();
        this.state = {
            name: "",
            discription: "",
            cost: "",
            // company : "",
            companydata: []
        }
    }
    ChangeHandler = (event) =>{
        this.setState({ [event.target.name] : event.target.value })
    }

    componentDidMount(){
        // axios.get(url, { crossdomain: true })

        // axios.get('http://localhost:5000/fetch/company',{crossdomain: true}).then((response) => {
        //         console.log("response is", response["data"]);
        //         console.log("state.data in ajax call",response.data.data)
        //         let arr = response.data.data;
        //         this.setState({
        //             companydata: arr
        //         })
        // })

        if(this.props.id){
                axios.get('http://localhost:5000/fetch/item',{params:{id: this.props.id}}).then((response) => {
                console.log("response is when edit", response["data"]);
                console.log("state.data in ajax call",response.data.data)
           
                if(response.data.data){
                    let item = response.data.data[0];
                    console.log("item value is",item);
                    this.setState({
                        name : item.name,
                        _id: item._id,
                        discription: item.discription,
                        cost: item.item_cost,
                        // company : item.company
                    })
                }
            })
        }
    }

    submitHandler =(event) =>{
        // event.preventDefault();
        console.log(this.state);

        console.log(this.state); 
        // let headers = {Accept: 'application/json','Content-Type': 'application/json'};
        axios.post("http://localhost:5000/save/item",JSON.stringify({
            data:{
                    name: this.state.name,
                    // company: this.state.company,
                    cost: this.state.cost,
                    discription: this.state.discription,
                    _id: this.state._id
                }
        })).then((response,err)=>{
            if(err){
                console.log(err);
            }else{
                alert("successfully added");
                console.log(response);
            }
        })
    }
    render() {

        return (
            <div>
                <form onSubmit={this.submitHandler}>
                <div className = 'form-container'>
                <div className = "form-element">
                            <div className = 'form-label'>
                            <label> Name</label>
                            </div>
                            <div className = 'form-tag'>
                            <input type='text' name="name" value = {this.state.name} onChange={this.ChangeHandler}/> 
                            </div>

                </div>

                <div className = "form-element">
                            <div className = 'form-label'>
                            <label> Discription</label>
                            </div>
                            <div className = 'form-tag'>
                            <input type='text' name="discription" value = {this.state.discription} onChange = {this.ChangeHandler}/> 

                            </div>

                </div>

                <div className = "form-element">
                            <div className = 'form-label'>
                            <label> Cost </label>
                            </div>
                            <div className = 'form-tag'>
                            <input type='text' name="cost" value = {this.state.cost} onChange = {this.ChangeHandler}/> 
                            </div>

                </div>

                <button type= "submit"> Add Items </button>
                </div>
                    
                    

                    

                    

                    {/* <label> Company </label>

                    <select value = {this.state.company} name= "company" onChange = {this.ChangeHandler}>
                        <option value= ""> Please select company</option>
                        {dropdown}
                    </select> */}

                    
                </form>
            </div>
        )
    }
}

export default Item
