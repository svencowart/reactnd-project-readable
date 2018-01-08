import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MDCTextField } from '@material/textfield';
import { MDCDialog } from '@material/dialog';
import '@material/textfield/dist/mdc.textfield.min.css';
import '@material/dialog/dist/mdc.dialog.min.css';
import './PostDetails.css';
import {
  upvotePost,
  downvotePost,
  deletePost,
  upvoteComment,
  downvoteComment,
  createComment,
  updateComment,
  deleteComment,
} from '../../../actions/index';

class PostDetails extends Component {
  state = {
    openComment: {
      id: '',
      author: '',
      body: '',
    },
    newComment: {
      author: '',
      body: '',
    },
    dialog: null,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    new MDCTextField(document.querySelector('.mdc-text-field.author-field'));
    new MDCTextField(document.querySelector('.mdc-text-field--textarea'));
    const dialog = new MDCDialog(document.querySelector('#update-comment-dialog'));
    this.setState({ dialog });
    dialog.listen('MDCDialog:accept', () => {
      const { openComment } = this.state;
      dispatch(updateComment(openComment.id, { author: openComment.author, body: openComment.body }));
      this.setState({ openComment: { id: '', author: '', body: '' } });
    });

    dialog.listen('MDCDialog:cancel', () => {
      this.setState({ openComment: { id: '', author: '', body: '' } });
    });
  }

  handleUpvote = (post) => {
    const { dispatch } = this.props;
    dispatch(upvotePost(post.id, post.voteScore));
  };

  handleDownvote = (post) => {
    const { dispatch } = this.props;
    dispatch(downvotePost(post.id, post.voteScore));
  };

  handlePostDelete = post => {
    const { dispatch, historyPush } = this.props;
    dispatch(deletePost(post));
    historyPush('/');
  };

  handleCommentUpvote = (comment) => {
    const { dispatch } = this.props;
    dispatch(upvoteComment(comment.id, comment.voteScore));
  };

  handleCommentDownvote = (comment) => {
    const { dispatch } = this.props;
    dispatch(downvoteComment(comment.id, comment.voteScore));
  };

  handleCommentEdit = (ev, comment) => {
    const { dialog } = this.state;
    const { id, author, body } = comment;

    this.setState({ openComment: { id, author, body } });

    dialog.lastFocusedTarget = ev.target;
    dialog.show();
    setTimeout(() => {
      new MDCTextField(document.querySelector('#edit-author-field'));
      new MDCTextField(document.querySelector('#edit-body-field'));
    }, 0);
  };

  handleCommentDelete = comment => {
    const { dispatch } = this.props;
    dispatch(deleteComment(comment));
  };

  handleAuthorChange = (ev) => {
    this.setState({ newComment: {
      ...this.state.newComment,
      author: ev.target.value
    }});
  };

  handleDescriptionChange = (ev) => {
    this.setState({ newComment: {
      ...this.state.newComment,
      body: ev.target.value
    }});
  };

  handleEditAuthorChange = (ev) => {
    this.setState({ openComment: {
      ...this.state.openComment,
      author: ev.target.value
    }});
  };

  handleEditDescriptionChange = (ev) => {
    this.setState({ openComment: {
      ...this.state.openComment,
      body: ev.target.value
    }});
  };

  handleCommentSubmit = () => {
    const { dispatch, post } = this.props;
    const { newComment } = this.state;

    const postComment = {
      parentId: post.id,
      author: newComment.author,
      body: newComment.body,
    };

    dispatch(createComment(postComment));
    this.setState({ newComment: { author: '', body: '' } });
  };

  render() {
    const { post } = this.props;
    const { openComment, newComment } = this.state;

    return (
      <main>
        <div className='post-details-container'>
          <div className='post-meta-container'>
            <div className='post-meta'>
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
              <span className='author-by'>Posted by:</span><span className='author-name'>{post.author}</span>
              <span className='post-preview-date'>on {new Date(post.timestamp).toDateString()}</span>
            </div>
            <div className='button-group'>
              <a className='mdc-button mdc-button--circle' href={`/edit-post/${post.id}`}>
                <i className='material-icons mdc-button__icon'>edit</i>
              </a>
              <button className='mdc-button mdc-button--circle' onClick={() => this.handlePostDelete(post)}>
                <i className='material-icons mdc-button__icon'>delete</i>
              </button>
            </div>
          </div>
          <p className='post-details-body multiline-output'>{post.body}</p>

          <hr/>

          <h3>Comments</h3>
          <h5>Total Count: {post.comments.length}</h5>

          {post.comments
            .sort((a, b) => {
              return a.timestamp - b.timestamp;
            })
            .map((comment) => (
              <div className='mdc-card' key={comment.id}>
                <section className='mdc-card__primary'>
                  <h1 className='mdc-card__title mdc-card__title--large'>
                    <div className='comment-meta'>
                      <button className='mdc-button mdc-button--circle'
                              onClick={() => { this.handleCommentUpvote(comment) }}>
                        <i className='material-icons mdc-button__icon'>thumb_up</i>
                      </button>
                      <span className={'post-vote-score ' + (comment.voteScore > 0 ? 'positive-score' : comment.voteScore < 0 ? 'negative-score' : '')}>
                        {comment.voteScore}
                      </span>
                      <button className='mdc-button mdc-button--circle'
                              onClick={() => { this.handleCommentDownvote(comment) }}>
                        <i className='material-icons mdc-button__icon'>thumb_down</i>
                      </button>
                      <span className='author-by'>Posted by:</span><span className='author-name'>{comment.author}</span>
                      <span className='post-preview-date'>on {new Date(comment.timestamp).toDateString()}</span>
                    </div>
                    <div className='button-group'>
                      <button className='mdc-button mdc-button--circle edit-comment-button'>
                        <i className='material-icons mdc-button__icon' onClick={(ev) => this.handleCommentEdit(ev, comment)}>edit</i>
                      </button>
                      <button className='mdc-button mdc-button--circle' onClick={() => this.handleCommentDelete(comment)}>
                        <i className='material-icons mdc-button__icon'>delete</i>
                      </button>
                    </div>
                  </h1>
                </section>
                <section className='mdc-card__supporting-text multiline-output'>
                  {comment.body}
                </section>
              </div>
            ))
          }

          <h4>
            Add New Comment
          </h4>
          <div>
            <div className='mdc-text-field author-field'>
              <input type='text'
                     id='author-field'
                     className='mdc-text-field__input'
                     value={newComment.author}
                     onChange={(ev) => this.handleAuthorChange(ev)}
                     required/>
              <label className='mdc-text-field__label' htmlFor='author-field'>Author</label>
              <div className='mdc-text-field__bottom-line'/>
            </div>
          </div>
          <div>
            <div className='mdc-text-field mdc-text-field--textarea'>
              <textarea id='body-field'
                        className='mdc-text-field__input'
                        rows='8'
                        cols='40'
                        value={newComment.body}
                        onChange={(ev) => this.handleDescriptionChange(ev)}
                        required/>
              <label htmlFor='textarea' className='mdc-text-field__label'>Description</label>
            </div>
          </div>
          <div>
            <div className='submit-row'>
              <a className='mdc-button mdc-button--raised' onClick={() => this.handleCommentSubmit()}>
                Publish
              </a>
            </div>
          </div>
        </div>
        <aside id='update-comment-dialog'
               className='mdc-dialog'
               role='alertdialog'
               aria-labelledby='my-mdc-dialog-label'
               aria-describedby='my-mdc-dialog-description'>
          <div className='mdc-dialog__surface'>
            <header className='mdc-dialog__header'>
              <h2 id='my-mdc-dialog-label' className='mdc-dialog__header__title'>
                Edit Comment
              </h2>
            </header>
            <section id='my-mdc-dialog-description' className='mdc-dialog__body'>
              <div>
                <div className='mdc-text-field' id='edit-author-field'>
                  <input type='text'
                         id='edit-author-field__input'
                         className='mdc-text-field__input'
                         value={openComment.author}
                         onChange={(ev) => this.handleEditAuthorChange(ev)}
                         required/>
                  <label className='mdc-text-field__label' htmlFor='edit-author-field__input'>Author</label>
                  <div className='mdc-text-field__bottom-line'/>
                </div>
              </div>
              <div>
                <div className='mdc-text-field mdc-text-field--textarea' id='edit-body-field'>
              <textarea id='edit-body-field__input'
                        className='mdc-text-field__input'
                        rows='8'
                        cols='40'
                        value={openComment.body}
                        onChange={(ev) => this.handleEditDescriptionChange(ev)}
                        required/>
                  <label htmlFor='textarea' className='mdc-text-field__label'>Description</label>
                </div>
              </div>
            </section>
            <footer className='mdc-dialog__footer'>
              <button type='button' className='mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--cancel'>Decline</button>
              <button type='button' className='mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--accept'>Accept</button>
            </footer>
          </div>
          <div className='mdc-dialog__backdrop'></div>
        </aside>
      </main>
    );
  }
}

PostDetails.propTypes = {
  dispatch: PropTypes.func.isRequired,
  historyPush: PropTypes.func.isRequired,
  post: PropTypes.object,
};

export default connect()(PostDetails);