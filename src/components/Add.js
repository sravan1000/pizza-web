import React, { Component } from 'react'
import Company from './forms/Company';
import Item from './forms/Item';
import Privilege from './forms/Privilege';


export class Add extends Component {
    render() {
        let type = this.props.match.params.type ? this.props.match.params.type  : "";
        let htmlContent;
        if(type === 'company'){
            htmlContent = <Company />
        }else if(type === 'items'){
            htmlContent = <Item />
        }else if(type === 'privilege'){
            htmlContent = <Privilege />
        }
        return (
            <div>
               { htmlContent }
            </div>
        )
    }
}

export default Add
