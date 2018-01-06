import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchPost } from '../../../actions/index';
import PostHeader from '../PostHeader.js';
import UpdatePostForm from './UpdatePostForm.js';

class UpdatePostContainer extends Component {
  componentDidMount() {
    const { match, dispatch } = this.props;
    dispatch(fetchPost(match.params.postId));
  }

  render() {
    return (
      <div>
        <PostHeader goBack={this.props.history.goBack} pageTitle='Edit Post'/>
        <UpdatePostForm title={this.props.title} body={this.props.body} historyPush={this.props.history.push}/>
      </div>
    );
  }
}

UpdatePostContainer.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const { post } = state;

  return {
    history: ownProps.history,
    title: post.title,
    body: post.body,
  };
};

export default connect(mapStateToProps)(UpdatePostContainer);