import React from 'react';
import axios from 'axios';
import Form from './Form';

const URL = 'http://localhost:9000/api/todos';

export default class App extends React.Component {
  state = {
    todos: [],
    error: '',
    todoNameInput: '',
    displayCompleteds: true,
  };

  onTodoNameInputChange = (evt) => {
    const { value } = evt.target;
    this.setState({ todoNameInput: value });
  };

  resetForm = () => this.setState({ todoNameInput: '' });

  setAxiosResponseError = (err) => this.setState({ error: err.response.data.message });

  postNewTodo = () => {
    axios.post(URL, { name: this.state.todoNameInput })
      .then((res) => {
        this.setState({ todos: this.state.todos.concat(res.data.data) });
        this.resetForm();
      })
      .catch(this.setAxiosResponseError);
  };

  onTodoFormSubmit = (evt) => {
    evt.preventDefault();
    this.postNewTodo();
  };

  fetchAllTodos = () => {
    axios.get(URL)
      .then((res) => {
        this.setState({ todos: res.data.data });
      })
      .catch(this.setAxiosResponseError);
  };

  toggleCompleted = (id) => () => {
    axios.patch(`${URL}/${id}`)
      .then((res) => {
        this.setState({
          todos: this.state.todos.map(td => (td.id !== id ? td : res.data.data)),
        });
      })
      .catch(this.setAxiosResponseError);
  };

  clearCompletedTasks = () => {
    this.setState({ todos: this.state.todos.filter(td => !td.completed) });
  };

  toggleDisplayCompleteds = () => {
    this.setState({ displayCompleteds: !this.state.displayCompleteds });
  }

  componentDidMount() {
    this.fetchAllTodos();
  }

  render() {
    const filteredTodos = this.state.todos.filter(td => this.state.displayCompleteds || !td.completed);
    return (
      <div>
        <div id="error">Error: {this.state.error}</div>
        <div id="todos">
          <h2>Todos:</h2>
          {
            filteredTodos.map(td => (
              <div onClick={this.toggleCompleted(td.id)} key={td.id}>
                {td.name} {td.completed ? '✔️' : ''}
              </div>
            ))
          }
        </div>
        <Form
          onTodoFormSubmit={this.onTodoFormSubmit}
          onTodoNameInputChange={this.onTodoNameInputChange}
          todoNameInput={this.state.todoNameInput}
          clearCompletedTasks={this.clearCompletedTasks}
          toggleDisplayCompleteds={this.toggleDisplayCompleteds}
        />
        <button type="button" onClick={this.toggleDisplayCompleteds}>
          {this.state.displayCompleteds ? 'Hide' : 'Show'} Completed
        </button>
      </div>
    );
  }
}
