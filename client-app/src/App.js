import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CatalogContainer from './components/Catalog/CatalogContainer';
import PostDetailsContainer from './components/PostDetails/PostDetailsContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Route exact path='/' component={CatalogContainer} />
        <Route exact path='/post-details' component={PostDetailsContainer} />
      </div>
    );
  }
}

export default App;
