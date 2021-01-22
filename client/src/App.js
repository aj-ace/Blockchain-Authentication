import React, { Component} from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';

import Login from './pages/login';
import Auth from './pages/auth';
import Home from './pages/home';

class App extends Component {
  render(){
    
      return (
        <BrowserRouter>
            <Switch>
               <Route exact path="/" component={Login} />
              <Route exact path="/auth" component={Auth}/>
              <Route exact path="/home" component={Home}/>
              <Redirect  from="*" to="/" /> 
            </Switch>
          </BrowserRouter>
      );
  }  
}

export default App;