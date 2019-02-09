import React, { Component } from 'react';
import { HashRouter as Router, Link, Route, Switch } from 'react-router-dom'
import axios from 'axios';
import Todos from './Todos';
import TodoCreate from './TodoCreate';
import TodoEdit from './TodoEdit';

class App extends Component {
  constructor () {
    super ();
    this.state = {
      todos: []
    }
    this.createTodo = this.createTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.destroyTodo = this.destroyTodo.bind(this);
  }
  componentDidMount () {
      axios.get('/todos')
        .then(res => res.data)
        .then(todos => this.setState({ todos }))
  }
  fetchTodo (id) {
    return axios.get(`/todos/${id}`)
        .then(res => res.data)
  }
  createTodo (todo) {
      const { todos } = this.state;
      return axios.post('/todos', todo)
        .then(res => res.data)
        .then(todo => this.setState({ todos: [...todos, todo] }))
  }
  updateTodo (todo) {
      return axios.put(`/todos/${todo.id}`, todo)
        .then(res => res.data)
        .then(todo => {
            const todos = this.state.todos.map(_todo => _todo.id !== todo.id ? _todo : todo); 
            this.setState({ todos })
        })
  }
  destroyTodo (todo) {
    const { todos } = this.state;
    axios.delete(`/todos/${todo.id}`)
        .then(() => {
            this.setState({ todos: todos.filter(_todo => _todo !== todo) })
        })
  }
  render() {
    const { todos } = this.state;
    const { fetchTodo, createTodo, updateTodo, destroyTodo } = this;
    return (
      <Router>
        <div>
            <ul>
                <li>
                    <Link to='/todos'>My Todos</Link>
                </li>
                <li>
                    <Link to='/todos/create'>Create a Todo</Link>
                </li>
            </ul>
            <Switch>
                <Route path='/todos/create' render={({ history }) => <TodoCreate todos={ todos } history={ history } createTodo={ createTodo } /> } />
                <Route path='/todos/:id' render={({ history, match }) => <TodoEdit todos={ todos } history={ history } updateTodo={ updateTodo } id={ match.params.id } fetchTodo={ fetchTodo } /> } />
            </Switch>
            <Route path='/todos' render={() => <Todos todos={todos} destroyTodo={ destroyTodo } /> } />
        </div>
      </Router>      
    );
  }
}

export default App;
