import React, { Component } from 'react';

export default class TodoCreate extends Component {
    constructor (props) {
        super (props);
        this.state = {
            name: ''
        }
        this.onCreate = this.onCreate.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    onCreate (event) {
        const { createTodo, history } = this.props;
        const { name } = this.state;
        event.preventDefault();
        createTodo({ name })
            .then(() => history.push('/todos'))
    }
    handleChange (event) {
        this.setState({ name: event.target.value })
    }
    render () {
        const { name } = this.state;
        const { todos } = this.props;
        const { onCreate, handleChange } = this;
        return (
            <form onSubmit={ onCreate }>
                <input value={ name } onChange={ handleChange }></input>
                <button disabled={ !name }>Create</button>
            </form>
        ) 
    }
}