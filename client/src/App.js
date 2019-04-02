import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavbarApp from './components/NavbarApp';
import ContainerApp from './components/ContainerApp';
import FooterApp from './components/FooterApp';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  };
  
  render() {
    return (
      <Provider store={store}>
        <NavbarApp/>
        <ContainerApp/>
        <FooterApp/>
      </Provider>
    );
  }
}

export default App;
