import React, { Component } from 'react';

export default class TodoEdit extends Component {
    constructor (props) {
        super (props);
        this.state = {
            name: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.fetchTodo = this.fetchTodo.bind(this);
        this.fetchTodo(this.props.id)
    }
    handleChange (event) {
        this.setState({ name: event.target.value })
    }
    onUpdate (event) {
        const { updateTodo, id, history } = this.props;
        const { name } = this.state
        event.preventDefault();
        updateTodo({ id, name})
            .then(() => history.push('/todos'))
    }
    componentDidUpdate (prevProps) {    //if page changes (specifically :id)
        if(prevProps.id !== this.props.id) {
            this.fetchTodo(this.props.id)
        }
    }
    fetchTodo (id) {
        this.props.fetchTodo(id)
            .then(todo => this.setState({ name: todo.name }))
    }
    render () {
        const { name } = this.state;
        const { todos } = this.props;
        const { onUpdate, handleChange } = this;
        return (
            <form onSubmit={ onUpdate }>
                <input value={ name } onChange={ handleChange }></input>
                <button disabled={ !name }>Edit</button>
            </form>
        )
    }
}