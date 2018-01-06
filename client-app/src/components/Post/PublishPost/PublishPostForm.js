import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createPost } from '../../../actions/index';
import { MDCTextField } from '@material/textfield';
import { MDCSelect } from '@material/select';
import '@material/textfield/dist/mdc.textfield.min.css';
import '@material/select/dist/mdc.select.min.css';
import '../PostForm.css';

class PublishPostForm extends Component {
  state = {
    title: '',
    author: '',
    body: '',
    category: ''
  };

  componentDidMount() {
    const searchParams = new URLSearchParams(window.location.search);
    this.setState({ category: searchParams.get('defaultCategory') || 'react' });
    new MDCTextField(document.querySelector('.mdc-text-field.title-field'));
    new MDCTextField(document.querySelector('.mdc-text-field.author-field'));
    new MDCTextField(document.querySelector('.mdc-text-field--textarea'));
    const select = new MDCSelect(document.getElementById('category-select'));
    select.listen('MDCSelect:change', () => {
      this.setState({ category: select.value.toLowerCase() });
    });
  }

  handleTitleChange = (ev) => {
    this.setState({ title: ev.target.value });
  };

  handleAuthorChange = (ev) => {
    this.setState({ author: ev.target.value });
  };

  handleDescriptionChange = (ev) => {
    this.setState({ body: ev.target.value });
  };

  handleFormSubmit = () => {
    const { dispatch, historyPush } = this.props;
    const { title, author, body, category } = this.state;

    dispatch(createPost({
      title,
      author,
      body,
      category,
    }));
    historyPush('/');
  };

  render() {
    const { title, author, body, category } = this.state;

    return (
      <main>
        <div className='form-container'>
          <div className='title-row'>
            <div className='mdc-text-field title-field'>
              <input type='text' id='my-text-field'
                     className='mdc-text-field__input'
                     value={title}
                     onChange={(ev) => this.handleTitleChange(ev)}
                     required/>
              <label className='mdc-text-field__label' htmlFor='my-text-field'>Title</label>
              <div className='mdc-text-field__bottom-line'/>
            </div>
            <div id='category-select' className='mdc-select' role='listbox' tabIndex='0'>
              <div className='mdc-select__surface'>
                <div className='mdc-select__label'>Pick a Category</div>
                <div className='mdc-select__selected-text'></div>
                <div className='mdc-select__bottom-line'></div>
              </div>
              <div className='mdc-simple-menu mdc-select__menu'>
                <ul className='mdc-list mdc-simple-menu__items'>
                  <li className='mdc-list-item' role='option' tabIndex='0' aria-disabled='true'>
                    Pick a Category
                  </li>
                  <li className='mdc-list-item' role='option' tabIndex='0'>
                    React
                  </li>
                  <li className='mdc-list-item' role='option' tabIndex='0'>
                    Redux
                  </li>
                  <li className='mdc-list-item' role='option' tabIndex='0'>
                    Udacity
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <div className='mdc-text-field author-field'>
              <input type='text' id='my-text-field'
                     className='mdc-text-field__input'
                     value={author}
                     onChange={(ev) => this.handleAuthorChange(ev)}
                     required/>
              <label className='mdc-text-field__label' htmlFor='my-text-field'>Author</label>
              <div className='mdc-text-field__bottom-line'/>
            </div>
          </div>
          <div>
            <div className='mdc-text-field mdc-text-field--textarea'>
              <textarea id='textarea'
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

PublishPostForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  historyPush: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    history: ownProps.history,
  };
};

export default connect(mapStateToProps)(PublishPostForm);