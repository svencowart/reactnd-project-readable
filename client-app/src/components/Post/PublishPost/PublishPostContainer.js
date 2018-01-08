import React, { Component } from 'react';
import PostHeader from '../PostHeader.js';
import PublishPostForm from './PublishPostForm.js';

class PublishPostContainer extends Component {
  render() {
    return (
      <div>
        <PostHeader goBack={this.props.history.goBack} pageTitle='Publish New Post'/>
        <PublishPostForm historyPush={this.props.history.push}/>
      </div>
    );
  }
}

export default PublishPostContainer;