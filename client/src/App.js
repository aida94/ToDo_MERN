import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import NavbarApp from './components/NavbarApp';
import ContainerApp from './components/ContainerApp';
import Items from './components/items/Items';
import NotFound from './components/NotFound';
import FooterApp from './components/FooterApp';
import { store } from './store';
import { loadUser } from './actions/authActions';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  
  render() {
    return (
    <ConnectedRouter history={this.props.history} context={this.props.context}>
      <NavbarApp/>
      <Switch>
        <Route exact path='/' component={ContainerApp}/>
        <Route path='/note' component={Items}/>
        <Route component={NotFound}/>
      </Switch>
      <FooterApp/>
    </ConnectedRouter>
    );
  }
}

export default App;
