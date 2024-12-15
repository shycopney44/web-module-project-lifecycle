import React from 'react';

export default class Form extends React.Component {
  render() {
    const { todoNameInput, onTodoNameInputChange, onTodoFormSubmit } = this.props;

    return (
      <form onSubmit={onTodoFormSubmit}>
        <input
          type="text"
          value={todoNameInput}
          onChange={onTodoNameInputChange}
          placeholder="Type todo"
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}




