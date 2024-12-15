import React from 'react';

export default class Todo extends React.Component {
  render() {
    const { todo, toggleCompleted } = this.props;
    return (
      <div onClick={toggleCompleted} style={{ cursor: 'pointer' }}>
        {todo.name} {todo.completed ? '✔️' : ''}
      </div>
    );
  }
}

