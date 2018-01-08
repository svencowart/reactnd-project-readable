import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchPost, fetchComments } from '../../../actions/index';
import PostHeader from '../PostHeader';
import PostDetails from './PostDetails';
import NotFound from '../../NotFound/NotFound';

class PostDetailsContainer extends Component {
  componentDidMount() {
    const { match, dispatch } = this.props;
    dispatch(fetchPost(match.params.postId));
    dispatch(fetchComments(match.params.postId));
  }

  render() {
    const { post } = this.props;
    console.log(post);

    return (
      <div>
        {post.id &&
          <div>
            <PostHeader goBack={this.props.history.goBack} pageTitle={this.props.post.title}/>
            <PostDetails post={this.props.post} historyPush={this.props.history.push}/>
          </div>
        }
        {!post.id &&
          <div>
            <PostHeader goBack={this.props.history.goBack} pageTitle='Page Not Found'/>
            <NotFound/>
          </div>
        }
      </div>
    );
  }
}

PostDetailsContainer.propTypes = {
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const { post } = state;

  return {
    history: ownProps.history,
    post,
  };
};

export default connect(mapStateToProps)(PostDetailsContainer);