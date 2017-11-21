import React from 'react';
import classnames from 'classnames';
import { connect } from 'dva';
import { notCompletedItemNum } from '../models/item/selectors';

const Footer = ({ leftNum, dispatch, filter }) => {
  function clear() {
    dispatch({ type: 'todos/clearCompleted' });
  }
  return (
    <footer className="footer">
      <span className="todo-count"><strong>{leftNum}</strong> { leftNum === 1 ? 'item' : 'items' } left</span>
      <ul className="filters">
        <li>
          <a className={classnames({ selected: filter === 'all' })} href="#/">All</a>
        </li>
        <li>
          <a className={classnames({ selected: filter === 'active' })} href="#/active">Active</a>
        </li>
        <li>
          <a className={classnames({ selected: filter === 'completed' })} href="#/completed">Completed</a>
        </li>
      </ul>
      <button className="clear-completed" onClick={clear}>Clear completed</button>
    </footer>
  );
};

const mapStateToProps = (state) => {
  const { filter } = state.todos;
  return {
    leftNum: notCompletedItemNum(state),
    filter,
  };
};

export default connect(mapStateToProps)(Footer);
