import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { Button, Menu, Icon } from 'semantic-ui-react';

class Header extends Component {
  render() {
    return (
      <Fragment>
        <Menu size="huge" inverted borderless fixed="top">
          <Menu.Item header as={Link} to="/">
            Service Desk Account Manager
          </Menu.Item>
        </Menu>
      </Fragment>
    );
  }
}

export default Header;
