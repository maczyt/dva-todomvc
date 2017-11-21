export function completedItemNum(state) {
  return state.todos.todos.filter(todo => todo.completed).length;
}

export function notCompletedItemNum(state) {
  return state.todos.todos.length - completedItemNum(state);
}

