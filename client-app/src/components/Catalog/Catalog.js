import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { upvotePost, downvotePost, deletePost } from '../../actions';
import './../../MDCExtensions.css';

class Catalog extends Component {
  handleUpvote = (post) => {
    const { dispatch } = this.props;
    dispatch(upvotePost(post.id, post.voteScore));
  };

  handleDownvote = (post) => {
    const { dispatch } = this.props;
    dispatch(downvotePost(post.id, post.voteScore));
  };

  handlePostDelete = post => {
    const { dispatch } = this.props;
    dispatch(deletePost(post));
  };

  render() {
    const { posts, sortStrategy } = this.props;

    return (
      <main>
      {posts
        .sort((a, b) => {
          if (sortStrategy === 'new') {
            return b.timestamp - a.timestamp;
          } else {
            return b.voteScore - a.voteScore;
          }
        })
        .map((post) => (
          <div className='mdc-card' key={post.id}>
            <section className='mdc-card__primary'>
              <h1 className='mdc-card__title mdc-card__title--large'>
                <a className='inline-link' href={`/posts/${post.category}/${post.id}`}>{post.title}</a>
                <div className='button-group'>
                  <a className='mdc-button mdc-button--circle' href={`/edit-post/${post.id}`}>
                    <i className='material-icons mdc-button__icon'>edit</i>
                  </a>
                  <button className='mdc-button mdc-button--circle' onClick={() => this.handlePostDelete(post)}>
                    <i className='material-icons mdc-button__icon'>delete</i>
                  </button>
                </div>
              </h1>
              <h2 className='mdc-card__subtitle'>
                <span className='author-by'>Posted by:</span><span className='author-name'>{post.author}</span>
                <span className='post-preview-date'>on {new Date(post.timestamp).toDateString()}</span>
              </h2>
            </section>
            <section className='mdc-card__actions'>
              <button className='mdc-button mdc-button--circle'
                      onClick={() => { this.handleUpvote(post) }}>
                <i className='material-icons mdc-button__icon'>thumb_up</i>
              </button>
              <span className={'post-vote-score ' + (post.voteScore > 0 ? 'positive-score' : post.voteScore < 0 ? 'negative-score' : '')}>
                {post.voteScore}
              </span>
              <button className='mdc-button mdc-button--circle'
                      onClick={() => { this.handleDownvote(post) }}>
                <i className='material-icons mdc-button__icon'>thumb_down</i>
              </button>
              <span className='comments-count'>
                <a className='inline-link' href={`/${post.category}/${post.id}#comments`}>
                  {post.commentCount} comments
                </a>
              </span>
            </section>
          </div>
        ))
      }
      </main>
    );
  }
}

Catalog.propTypes = {
  posts: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const { sortStrategy } = state;

  return { sortStrategy };
};

export default connect(mapStateToProps)(Catalog);