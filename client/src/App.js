import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavbarApp from './components/NavbarApp';
import ContainerApp from './components/ContainerApp';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavbarApp/>
        <ContainerApp/>
        <Footer/>
      </div>
    );
  }
}

export default App;
