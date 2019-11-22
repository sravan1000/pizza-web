import React ,{Component}from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './components/Home';
import Tabs from './components/Tabs';
import List from './components/List';
import Add from './components/Add';
import Edit from './components/Edit';


class App extends Component{
  render(){
    return(
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route path="/tabs/:type" component = {Tabs}  /> 
        <Route path="/list/:type" component = {List}  /> 
        <Route path="/add/:type" component = {Add}  /> 
        <Route path="/edit/:type/:id" component = {Edit}  />
      </BrowserRouter>
    )
  }
}

export default App;
