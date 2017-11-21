import uniqueString from 'unique-string';

export default {
  namespace: 'todos',

  state: {
    todos: JSON.parse(localStorage.getItem('todos-dva')) || [],
    isAllCompleted: false,
    filter: 'all',
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line  
      return history.listen(({ pathname }) => {
        switch (pathname) {
          case '/active':
            dispatch({ type: 'setFilter', payload: 'active' });
            break;
          case '/completed':
            dispatch({ type: 'setFilter', payload: 'completed' });
            break;
          default:
            dispatch({ type: 'setFilter', payload: 'all' });
            break;
        }
      });
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
    },
  },

  reducers: {
    setFilter(state, { payload: filter }) {
      return {
        ...state,
        filter,
      };
    },
    add(state, { payload: title }) {
      return {
        ...state,
        todos: [{
          id: uniqueString(),
          title,
          completed: false,
        }, ...state.todos],
      };
    },
    delete(state, { payload: id }) {
      const todos = state.todos.filter(todo => todo.id !== id);
      return {
        ...state,
        todos,
      };
    },
    edit(state, { payload: { id, title } }) {
      const todos = state.todos.slice();
      todos.forEach(todo => {
        if (todo.id === id) {
          todo.title = title;
        }
      });
      return {
        ...state,
        todos,
      };
    },
    toggle(state, { payload: id }) {
      const todos = state.todos.slice();
      todos.forEach(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
      });
      return {
        ...state,
        todos,
        isAllCompleted: !todos.some(todo => !todo.completed),
      };
    },
    toggleAllCompleted(state) {
      const isAllCompleted = !state.isAllCompleted;
      const todos = state.todos.map(todo => { todo.completed = isAllCompleted; return todo; });
      return {
        ...state,
        todos,
        isAllCompleted: !state.isAllCompleted,
      };
    },
    clearCompleted(state) {
      const todos = state.todos.filter(todo => !todo.completed);
      return {
        ...state,
        todos,
      };
    },
  },

};
