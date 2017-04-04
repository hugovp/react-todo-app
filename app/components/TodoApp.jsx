const React      = require('react');
const uuid       = require('uuid');
const moment     = require('moment');
const TodoList   = require('TodoList');
const TodoSearch = require('TodoSearch');
const AddTodo    = require('AddTodo');
const TodoAPI    = require('TodoAPI');
const TodoApp    = React.createClass({
  getInitialState: function () {
    return {
      todos         : TodoAPI.getTodos(),
      showCompleted : false,
      searchText    : '',
    };
  },
  componentDidUpdate: function () {
    TodoAPI.setTodos(this.state.todos);
  },
  handleSearch: function (showCompleted, searchText) {
    this.setState({
      showCompleted : showCompleted,
      searchText    : searchText.toLowerCase(),
    });
  },
  handleToggle: function (todoID) {
    const updatedTodos = this.state.todos.map((todo) => {
      if (todo.id === todoID) {
        todo.completed   = !todo.completed;
        todo.completedAt = todo.completed ? moment().unix() : null;
      }
      return todo;
    });
    this.setState({ todos: updatedTodos });
  },
  handleAddTodo: function (text) {
    this.setState({
      todos: [
        ...this.state.todos,
        {
          id          : uuid(),
          text        : text,
          completed   : false,
          createdAt   : moment().unix(),
          completedAt : null,
        },
      ],
    });
  },
  render: function () {
    const { todos, showCompleted, searchText} = this.state;
    const filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);
    return (
      <div>
        <TodoSearch onSearch={ this.handleSearch }/>
        <TodoList todos={ filteredTodos } onToggle={ this.handleToggle }/>
        <AddTodo onAddTodo={ this.handleAddTodo }/>
      </div>
    );
  }, 
});
module.exports = TodoApp;