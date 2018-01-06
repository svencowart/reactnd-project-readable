import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchPosts } from '../../actions';
import CatalogHeader from './CatalogHeader';
import Catalog from './Catalog';

import '@material/list/dist/mdc.list.css';
import '@material/toolbar/dist/mdc.toolbar.css';
import '@material/card/dist/mdc.card.css';
import '@material/button/dist/mdc.button.css';
import '@material/menu/dist/mdc.menu.css';
import '@material/menu/dist/mdc.menu.js';
import './Catalog.css';

class CatalogContainer extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(fetchPosts(match.params.category || 'all'));
  }

  render() {
    const { match, posts } = this.props;

    return (
      <div>
        <CatalogHeader category={match.params.category}/>
        <Catalog posts={posts}/>
      </div>
    );
  }
}

CatalogContainer.propTypes = {
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const { posts } = state;

  return {
    posts: posts.items || [],
    isFetching: posts.isFetching || false,
  };
};

export default connect(mapStateToProps)(CatalogContainer);