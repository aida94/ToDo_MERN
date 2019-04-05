import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import NavbarApp from './components/NavbarApp';
import ContainerApp from './components/ContainerApp';
import Item from './components/items/Items';
import NotFound from './components/NotFound';
import FooterApp from './components/FooterApp';
import store from './store';
import { loadUser } from './actions/authActions';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  
  render() {
    return (
      <Provider store={store}>
        <Router>
          <NavbarApp/>
          <Switch>
            <Route exact path='/' component={ContainerApp}/>
            <Route path='/note' component={Item}/>
            <Route component={NotFound}/>
          </Switch>
          <FooterApp/>
        </Router>
      </Provider>
    );
  }
}

export default App;
