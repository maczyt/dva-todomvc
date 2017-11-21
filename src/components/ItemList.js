import React from 'react';
import { connect } from 'dva';
import Item from './Item';

const ItemList = ({ todos }) => {
  return (
    <ul className="todo-list">
      { todos.map((todo, index) => <Item {...todo} key={index} />) }
    </ul>
  );
};

const mapStateToProps = (state) => {
  const { todos, filter } = state.todos;
  let filterTodos;
  localStorage.setItem('todos-dva', JSON.stringify(todos));  

  if (filter === 'active') {
    filterTodos = todos.filter(todo => !todo.completed);
  } else if (filter === 'completed') {
    filterTodos = todos.filter(todo => todo.completed);
  } else {
    filterTodos = todos.slice();
  }
  return {
    todos: filterTodos,
  };
};

export default connect(mapStateToProps)(ItemList);
