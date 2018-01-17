import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import s from "./Menu.css";

class HeaderMenu extends Component {
  render() {
    return (
      <div>
        <Menu inverted className={s.menu}>
          <Menu.Item name="Crowd Chair" />
        </Menu>
      </div>
    );
  }
}

export default HeaderMenu;
