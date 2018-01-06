import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import NavDrawerContainer from '../components/NavDrawer/NavDrawerContainer';
import CatalogContainer from '../components/Catalog/CatalogContainer';
import PostDetailsContainer from '../components/Post/PostDetails/PostDetailsContainer';
import PublishPostContainer from '../components/Post/PublishPost/PublishPostContainer';
import UpdatePostContainer from '../components/Post/UpdatePost/UpdatePostContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='app mdc-typography'>
        <div className='grid-layout'>
          <NavDrawerContainer />
          <Route exact path='/' component={CatalogContainer}/>
          <Route exact path='/posts/:category?' component={CatalogContainer}/>
          <Route exact path='/posts/:category/:postId' component={PostDetailsContainer}/>
          <Route exact path='/publish-post' component={PublishPostContainer}/>
          <Route exact path='/edit-post/:postId' component={UpdatePostContainer}/>
        </div>
      </div>
    );
  }
}


export default App;
