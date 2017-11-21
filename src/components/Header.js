import React from 'react';
import { connect } from 'dva';

const Header = ({ dispatch }) => {
  function handleKeyUp(e) {
    if (e.keyCode === 13) {
      const value = e.target.value.trim();
      dispatch({ type: 'todos/add', payload: value });
      e.target.value = ''; 
    }
  }
  return (
    <header className="header">
      <h1>todos</h1>
      <input className="new-todo" placeholder="What needs to be done?" autoFocus onKeyUp={handleKeyUp} />
    </header>
  );
};

export default connect()(Header);
