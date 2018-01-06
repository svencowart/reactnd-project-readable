import React from 'react';
import PropTypes from 'prop-types';
import './PostHeader.css';

const PostHeader = props => (
    <header className='post-header'>
      <div className='mdc-toolbar'>
        <div className='mdc-toolbar__row'>
          <section className='mdc-toolbar__section mdc-toolbar__section--align-start-middle'>
            <a className='mdc-button back-button' onClick={props.goBack}>
              <i className='material-icons mdc-button__icon'>chevron_left</i>
              Back
            </a>

            <h2 className='mdc-toolbar__title'>
              {props.pageTitle}
            </h2>
          </section>
        </div>
      </div>
    </header>
);

PostHeader.propTypes = {
  goBack: PropTypes.func,
  pageTitle: PropTypes.string,
};

export default PostHeader;