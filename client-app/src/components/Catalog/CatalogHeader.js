import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeSortStrategy } from '../../actions';
import './CatalogHeader.css';
import { MDCSimpleMenu } from '@material/menu';

class CatalogHeader extends Component {
  componentDidMount() {
    const menu = new MDCSimpleMenu(document.querySelector('.mdc-simple-menu'));
    document.querySelector('.sort-button').addEventListener('click', () => menu.open = !menu.open);
  }

  selectSortStrategy = (strategy) => {
    const { dispatch } = this.props;
    dispatch(changeSortStrategy(strategy));
  };

  render() {
    const { category, sortStrategy } = this.props;

    return (
      <header>
        <div className='mdc-toolbar'>
          <div className='mdc-toolbar__row'>
            <section className='mdc-toolbar__section mdc-toolbar__section--align-flexible'>
              <h2 className='mdc-toolbar__title'>
                {category
                  ? <span className='breadcrumb-category'>{category}</span>
                  : <span className='breadcrumb-category'>All</span>
                }
              </h2>

              <div className='mdc-toolbar__button-group'>
                <a className='mdc-button mdc-button--circle' href={'/publish-post' + (category ? `?defaultCategory=${category}` : '')}>
                  <i className='material-icons mdc-button__icon'>add</i>
                </a>
                <div className='mdc-simple-menu mdc-simple-menu--open-from-top-right' tabIndex='-1' style={{ top: 0, right: 0 }}>
                  <ul className='mdc-simple-menu__items mdc-list' role='menu' aria-hidden='true'>
                    <li className={'mdc-list-item ' + (sortStrategy === 'top' ? 'active' : '')} role='menuitem' tabIndex='0' onClick={() => this.selectSortStrategy('top')}>
                      Top
                      <i className='material-icons'>whatshot</i>
                    </li>
                    <li className={'mdc-list-item ' + (sortStrategy === 'new' ? 'active' : '')} role='menuitem' tabIndex='0' onClick={() => this.selectSortStrategy('new')}>
                      New
                      <i className='material-icons'>new_releases</i>
                    </li>
                  </ul>
                </div>
                <button className='sort-button mdc-button mdc-button--circle'>
                  <i className='material-icons mdc-button__icon'>sort</i>
                </button>
              </div>
            </section>
          </div>
        </div>
      </header>
    );
  }
}

CatalogHeader.propTypes = {
  category: PropTypes.string,
  sortStrategy: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const { sortStrategy } = state;

  return { sortStrategy };
};

export default connect(mapStateToProps)(CatalogHeader);