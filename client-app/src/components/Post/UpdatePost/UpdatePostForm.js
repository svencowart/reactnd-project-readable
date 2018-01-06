import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updatePost } from '../../../actions/index';
import { MDCTextField } from '@material/textfield';
import '@material/textfield/dist/mdc.textfield.min.css';
import '../PostForm.css';

class UpdatePostForm extends Component {
  state = {
    title: '',
    body: '',
  };

  componentDidMount() {
    const searchParams = new URLSearchParams(window.location.search);
    this.setState({ category: searchParams.get('defaultCategory') || 'react' });
    new MDCTextField(document.querySelector('.mdc-text-field.title-field'));
    new MDCTextField(document.querySelector('.mdc-text-field--textarea'));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.title,
      body: nextProps.body,
    });

    setTimeout(() => {
      document.getElementById('title-field').blur();
      document.getElementById('body-field').blur();
    }, 10);
    setTimeout(() => {
      document.getElementById('title-field').focus();
      document.getElementById('body-field').focus();
    }, 0);
  }

  handleTitleChange = (ev) => {
    this.setState({ title: ev.target.value });
  };

  handleDescriptionChange = (ev) => {
    this.setState({ body: ev.target.value });
  };

  handleFormSubmit = () => {
    const { dispatch, historyPush, post } = this.props;
    const { title, body } = this.state;

    dispatch(updatePost(post.id, { title, body }));
    historyPush('/');
  };

  render() {
    const { title, body } = this.state;

    return (
      <main>
        <div className='form-container'>
          <div className='title-row'>
            <div className='mdc-text-field title-field'>
              <input type='text'
                     id='title-field'
                     className='mdc-text-field__input'
                     value={title}
                     onChange={(ev) => this.handleTitleChange(ev)}
                     required/>
              <label className='mdc-text-field__label' htmlFor='my-text-field'>Title</label>
              <div className='mdc-text-field__bottom-line'/>
            </div>
          </div>
          <div>
            <div className='mdc-text-field mdc-text-field--textarea'>
              <textarea id='body-field'
                        className='mdc-text-field__input'
                        rows='8'
                        cols='40'
                        value={body}
                        onChange={(ev) => this.handleDescriptionChange(ev)}
                        required/>
              <label htmlFor='textarea' className='mdc-text-field__label'>Description</label>
            </div>
          </div>
          <div>
            <div className='submit-row'>
              <a className='mdc-button mdc-button--raised' onClick={() => this.handleFormSubmit()}>
                Publish
              </a>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

UpdatePostForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  historyPush: PropTypes.func.isRequired,
  post: PropTypes.object,
};

const mapStateToProps = state => {
  const { post } = state;

  return {
    post
  };
};

export default connect(mapStateToProps)(UpdatePostForm);