import React, { Component } from 'react';
import { MDCSimpleMenu, MDCSimpleMenuFoundation } from '@material/menu';
import '@material/typography/dist/mdc.typography.css';
import '@material/drawer/dist/mdc.drawer.css';
import '@material/list/dist/mdc.list.css';
import '@material/toolbar/dist/mdc.toolbar.css';
import '@material/card/dist/mdc.card.css';
import '@material/button/dist/mdc.button.css';
import '@material/menu/dist/mdc.menu.css';
import '@material/menu/dist/mdc.menu.js';
import './Catalog.css';

class CatalogContainer extends Component {
  render() {
    return (
      <div className='grid-layout'>
        <nav className='mdc-permanent-drawer mdc-typography'>
          <div className='drawer-toolbar mdc-permanent-drawer__toolbar-spacer'>
            <i className='material-icons md-36'>library_books</i>
            <h1 className='mdc-typography--title'>Readable</h1>
          </div>
          <div className='mdc-permanent-drawer__content'>
            <nav className='mdc-list'>
              <a className='mdc-list-item mdc-permanent-drawer--selected' href='#'>
                <i className='material-icons mdc-list-item__start-detail md-dark md-inactive' aria-hidden='true'>menu</i>All
              </a>
              <a className='mdc-list-item mdc-permanent-drawer--selected' href='/category/react'>
                <span className='icon-spacer' />React
              </a>
              <a className='mdc-list-item mdc-permanent-drawer--selected' href='/category/redux'>
                <span className='icon-spacer' />Redux
              </a>
              <a className='mdc-list-item mdc-permanent-drawer--selected' href='/category/udacity'>
                <span className='icon-spacer' />Udacity
              </a>
            </nav>
          </div>
        </nav>
        <header>
          <div className='mdc-toolbar'>
            <div className='mdc-toolbar__row'>
              <section className='mdc-toolbar__section mdc-toolbar__section--align-start'>
                <h2 className='mdc-toolbar__title'>All</h2>
                <button className='mdc-button sort-button'>Sort</button>

                <div className='mdc-simple-menu' tabindex='-1'>
                  <ul className='mdc-simple-menu__items mdc-list' role='menu' aria-hidden='true'>
                    <li className='mdc-list-item' role='menuitem' tabindex='0'>
                      New
                    </li>
                    <li className='mdc-list-item' role='menuitem' tabindex='0'>
                      Top
                    </li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
        </header>
        <main>
          <div className='mdc-card'>
            <section className='mdc-card__primary'>
              <h1 className='mdc-card__title mdc-card__title--large'>Title goes here</h1>
              <h2 className='mdc-card__subtitle'>Subtitle here</h2>
            </section>
            <section className='mdc-card__supporting-text'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat.
            </section>
            <section className='mdc-card__actions'>
              <button className='mdc-button mdc-button--compact mdc-card__action'>Action 1</button>
              <button className='mdc-button mdc-button--compact mdc-card__action'>Action 2</button>
            </section>
          </div>

          <div className='mdc-card'>
            <section className='mdc-card__primary'>
              <h1 className='mdc-card__title mdc-card__title--large'>Title goes here</h1>
              <h2 className='mdc-card__subtitle'>Subtitle here</h2>
            </section>
            <section className='mdc-card__supporting-text'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat.
            </section>
            <section className='mdc-card__actions'>
              <button className='mdc-button mdc-button--compact mdc-card__action'>Action 1</button>
              <button className='mdc-button mdc-button--compact mdc-card__action'>Action 2</button>
            </section>
          </div>
        </main>
      </div>
    );
  }

  componentDidMount() {
    let menu = new MDCSimpleMenu(document.querySelector('.mdc-simple-menu'));
    document.querySelector('.sort-button').addEventListener('click', () => menu.open = !menu.open);
  }
}

export default CatalogContainer;