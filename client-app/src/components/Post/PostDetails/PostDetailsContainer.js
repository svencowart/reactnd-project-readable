import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchPost, fetchComments } from '../../../actions/index';
import PostHeader from '../PostHeader.js';
import PostDetails from './PostDetails';

class UpdatePostContainer extends Component {
  componentDidMount() {
    const { match, dispatch } = this.props;
    dispatch(fetchPost(match.params.postId));
    dispatch(fetchComments(match.params.postId));
  }

  render() {
    return (
      <div>
        <PostHeader goBack={this.props.history.goBack} pageTitle={this.props.post.title}/>
        <PostDetails post={this.props.post} historyPush={this.props.history.push}/>
      </div>
    );
  }
}

UpdatePostContainer.propTypes = {
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const { post } = state;

  return {
    history: ownProps.history,
    post,
  };
};

export default connect(mapStateToProps)(UpdatePostContainer);