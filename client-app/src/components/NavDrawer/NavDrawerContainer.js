import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions';
import PropTypes from 'prop-types';
import NavDrawer from './NavDrawer';

class NavDrawerContainer extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchPosts('all'));
  }

  render() {
    return (
      <NavDrawer categoryCounts={this.props.categoryCounts} />
    );
  }
}

NavDrawerContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const { categoryCounts } = state;

  return { categoryCounts };
};

export default connect(mapStateToProps)(NavDrawerContainer);