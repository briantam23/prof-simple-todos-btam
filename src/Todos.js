import React from 'react';
import { Link } from 'react-router-dom';

const Todos = ({ todos, destroyTodo }) => {
    return (
        <ul>
            {
                todos.map(todo => <li key={ todo.id }>
                    <Link to={`/todos/${todo.id}`}>{ todo.name }</Link>
                    <br />
                    <a onClick={() => destroyTodo(todo)}>X</a>
                </li>)
            }
        </ul>
    )
}

export default Todos;