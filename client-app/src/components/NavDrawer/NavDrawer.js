import React from 'react';
import PropTypes from 'prop-types';
import '@material/drawer/dist/mdc.drawer.css';
import '@material/list/dist/mdc.list.css';
import './NavDrawer.css';

const NavDrawer = (props) => (
  <nav className='mdc-permanent-drawer' id='nav-drawer'>
    <div className='drawer-toolbar mdc-permanent-drawer__toolbar-spacer'>
      <i className='material-icons md-36'>library_books</i>
      <h1 className='mdc-typography--title'>Readable</h1>
    </div>
    <div className='mdc-permanent-drawer__content'>
      <nav className='mdc-list'>
        <a className='mdc-list-item mdc-permanent-drawer--selected' href='/'>
          <i className='material-icons mdc-list-item__start-detail md-dark md-inactive' aria-hidden='true'>menu</i>All
        </a>
        <a className='mdc-list-item mdc-permanent-drawer--selected' href='/posts/react'>
          <span className='icon-spacer' />
          <div className='list-item-inner'>
            <span>React</span>
            <span className='category-count'>{ props.categoryCounts.react }</span>
          </div>
        </a>
        <a className='mdc-list-item mdc-permanent-drawer--selected' href='/posts/redux'>
          <span className='icon-spacer' />
          <div className='list-item-inner'>
            <span>Redux</span>
            <span className='category-count'>{ props.categoryCounts.redux }</span>
          </div>
        </a>
        <a className='mdc-list-item mdc-permanent-drawer--selected' href='/posts/udacity'>
          <span className='icon-spacer' />
          <div className='list-item-inner'>
            <span>Udacity</span>
            <span className='category-count'>{ props.categoryCounts.udacity }</span>
          </div>
        </a>
      </nav>
    </div>
  </nav>
);

NavDrawer.propTypes = {
  categoryCounts: PropTypes.object.isRequired
};

export default NavDrawer;