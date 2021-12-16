import React, { Component } from 'react';

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="/" rel="noopener noreferrer">Trees</a>
        <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="/tree_create" rel="noopener noreferrer">TreeCreate</a>
        <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="/auction" rel="noopener noreferrer">Auctions</a>
        <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="/withdraw" rel="noopener noreferrer">Withdraw</a>
        <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="/settings" rel="noopener noreferrer">Settings</a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-white"><span id="account">{this.props.account}</span></small>.
          </li>
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-white"><span id="treeCost">{this.props.treeCost}</span></small>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
