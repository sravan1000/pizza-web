import React, { Component } from 'react'
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker';

export class Privilege extends Component {

    constructor(){
        super();
        this.state = {
            name: null,
            company: "",
            item: null,
            privilege_type: "",
            // x_for_y:{
            //     x: null,
            //     y: null,
            // },
            x_for_y: null,
            discount: null,
            flat_cost: null,
            discription: null,
            min_items_order: null,
            min_purchase_limit: null,
            max_redemptions : null,
            start_time : null,
            end_time: null,
            _id: null,
            companydata: [],
            itemdata: [],
        }
    }
    ChangeHandler = (event) =>{
        this.setState({ [event.target.name] : event.target.value })
    }

    componentDidMount(){
        axios.get('http://localhost:5000/fetch/company',{crossdomain: true}).then((response) => {
                console.log("response is", response["data"]);
                console.log("state.data in ajax call",response.data.data)
                let arr = response.data.data;
                this.setState({
                    companydata: arr
                })
        })
        axios.get('http://localhost:5000/fetch/item',{crossdomain: true}).then((response) => {
                console.log("response is", response["data"]);
                console.log("state.data in ajax call",response.data.data)
                let itemarr = response.data.data;
                this.setState({
                    itemdata: itemarr
                })
        })

        if(this.props.id){
                axios.get('http://localhost:5000/fetch/privilege',{params:{id: this.props.id}}).then((response) => {
                console.log("response is when edit", response["data"]);
                console.log("state.data in ajax call",response.data.data)
           
                if(response.data.data){
                    let item = response.data.data[0];
                    console.log("item value is",item);
                    this.setState({
                        name: item.name,
                        company: item.company,
                        item: item.item,
                        privilege_type: item.privilege_type,
                        x_for_y: item.x_for_y,
                        discount: item.discount,
                        flat_cost: item.flat_cost,
                        discription: item.discription,
                        min_items_order: item.min_items_order,
                        min_purchase_limit: item.min_purchase_limit,
                        max_redemptions : item.max_redemptions,
                        start_time : item.start_time,
                        end_time: item.end_time,
                        _id: item._id,
                    })
                }
            })
        }
    }

    submitHandler =(event) =>{
        axios.post("http://localhost:5000/save/privilege",JSON.stringify({
            data:{
                name: this.state.name,
                company: this.state.company,
                item: this.state.item,
                privilege_type: this.state.privilege_type,
                x_for_y: this.state.x_for_y,
                discount: this.state.discount,
                flat_cost: this.state.flat_cost,
                discription: this.state.discription,
                min_items_order: this.state.min_items_order,
                min_purchase_limit: this.state.min_purchase_limit,
                max_redemptions : this.state.max_redemptions,
                start_time : this.state.start_time,
                end_time: this.state.end_time,
                _id: this.state._id,
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

    ChangeStartDateHandler = (event) => {

        console.log("event when start date is",event);
        this.setState({
            start_time : event
        })
    }
    ChangeEndDateHandler = (event) => {
        this.setState({
            end_time : event
        })
    }
    ChangeTypeHandler = (event) => {
        this.setState({
            privilege_type: event.target.value
        })
    }
    render() {

        let privilege_type = [
            {name:"Buy x items for y items cost", value: "x_for_Y"},
            {name:"Discount Percentage", value: "discount"},
            {name:"Flat cost", value: "flat_cost"}
            ]
        let typeDropdown = privilege_type.map((item) => 
        <option value = {item.value} key= {item.value}> {item.name}</option>
        )
        let dropdown = this.state.companydata.map((companyItem) => 
        <option value = {companyItem._id} key= {companyItem._id}> {companyItem.name}</option>
        )

        let itemsDropdown = this.state.itemdata.map((eachItem) => 
        <option value = {eachItem._id} key= {eachItem._id}> {eachItem.name}</option>
        )

        let optional_type_field;
        if(this.state.privilege_type === "x_for_Y"){
            optional_type_field = <div> 
                <label> x for y</label>
                <input type='text' name="x_for_y" value = {this.state.x_for_y} onChange = {this.ChangeHandler}/>
                </div>

        }else if(this.state.privilege_type === "discount"){

            optional_type_field = <div>
                <label> discount </label>
                <input type='text' name="discount" value = {this.state.discount} onChange = {this.ChangeHandler}/>
                </div> 

        }else if(this.state.privilege_type === "flat_cost"){
            optional_type_field = <div> 
                <label> flat cost </label>
                <input type='text' name="flat_cost" value = {this.state.flat_cost} onChange = {this.ChangeHandler}/> 
                </div>
        }
        
        return (
            <div>
                <form onSubmit={this.submitHandler}>

                    <label> Name </label>
                    <input type='text' name="name" value = {this.state.name} onChange={this.ChangeHandler}/> 

                    <label> Company </label>
                    <select value = {this.state.company} name= "company" onChange = {this.ChangeHandler}>
                        <option value= ""> Please select company</option>
                        {dropdown}
                    </select>


                    <label> item </label>
                    {/* <input type='text' name="item" value = {this.state.item} onChange={this.ChangeHandler}/>  */}
                    <select value = {this.state.item} name= "item" onChange = {this.ChangeHandler}>
                        <option value= ""> Please select item</option>
                        {itemsDropdown}
                    </select>

                    <label> Privilege Type </label>
                    {/* <input type='text' name="privilege_type" value = {this.state.privilege_type} onChange={this.ChangeHandler}/>  */}

                    <select value = {this.state.privilege_type} name= "privilege_type" onChange = {this.ChangeTypeHandler}>
                        <option value= ""> Please select Privilege type</option>
                        {typeDropdown}
                    </select>

                    {optional_type_field}

                    <label> discription </label>
                    <input type='text' name="discription" value = {this.state.discription} onChange = {this.ChangeHandler}/> 

                    <label> min items order </label>
                    <input type='text' name="min_items_order" value = {this.state.min_items_order} onChange = {this.ChangeHandler}/> 

                    <label> min purchase limit </label>
                    <input type='text' name="min_purchase_limit" value = {this.state.min_purchase_limit} onChange = {this.ChangeHandler}/> 

                    <label> max redemptions </label>
                    <input type='text' name="max_redemptions" value = {this.state.max_redemptions} onChange = {this.ChangeHandler}/> 

                    <label> start time </label>
                    <DateTimePicker name= 'start_time' value = {this.state.start_time} onChange = {this.ChangeStartDateHandler} />
           
                    <label> end time </label>
                    <DateTimePicker name= 'end_time' value = {this.state.end_time} onChange = {this.ChangeEndDateHandler} />
           
                    <button type= "submit"> Add Items </button>
                </form>
            </div>
        )
    }
}

export default Privilege

