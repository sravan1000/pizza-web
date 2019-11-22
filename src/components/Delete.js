import React, { Component } from 'react'
import Company from './forms/Company';
import Item from './forms/Item';
import Privilege from './forms/Privilege';
export class Edit extends Component {
    render() {
        console.log("in edit js");
        let Html;
        console.log(this.props);
        if(this.props.match.params.type === "company"){
            console.log("type matched..");
            let id = this.props.match.params.id;
            Html = <Company id = {id}/>
        }else if(this.props.match.params.type === "items"){
            console.log("edit item matched..");
            let id = this.props.match.params.id;
            Html = <Item id = {id}/>
        }else if(this.props.match.params.type === "privilege"){
            console.log("edit item matched..");
            let id = this.props.match.params.id;
            Html = <Privilege id = {id}/>
        }
        return (
            <div>
                {Html}
            </div>
        )
    }
}

export default Edit
