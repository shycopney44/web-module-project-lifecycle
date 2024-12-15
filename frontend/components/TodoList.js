import React from 'react';
import Todo from './Todo';

export default class TodoList extends React.Component {
  render() {
    const { todos, toggleCompleted } = this.props;

    return (
      <div id="todos">
        <h2>Todos:</h2>
        {
          todos.map(td => (
            <Todo
              key={td.id}
              todo={td}
              toggleCompleted={() => toggleCompleted(td.id)}
            />
          ))
        }
      </div>
    );
  }
}



