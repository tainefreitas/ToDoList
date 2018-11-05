import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      newTodo: '',
      editing: false,
      editingIndex: null,
      todos: [{
        id: 1, name: 'Programar'
      }]
    };
    this.updateTodo = this.updateTodo.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.generateTodoId= this.generateTodoId.bind(this);
  }

  handleChange(event) {
    this.setState({
      newTodo: event.target.value
    });
  }
  generateTodoId(){
    const lastTodo = this.state.todos[this.state.todos.length -1];
    if(lastTodo){
      return lastTodo.id + 1;
    }
      return 1;
  }


  addTodo() {
    const newTodo = {
      name: this.state.newTodo,
      id: this.generateTodoId()
    };

    const todos = this.state.todos;
    todos.push(newTodo);

    this.setState({
      todos: todos,
      newTodo: ''
    });
  }
  
  deleteTodo(index){
    const todos = this.state.todos;
    delete todos[index];

    this.setState({todos});

  }
  editTodo(index){

    const todo = this.state.todos[index];
    this.setState({
      editing: true,
      newTodo: todo.name,
      editingIndex: index
    })
  }
  updateTodo(){
    const todo = this.state.todos[this.state.editingIndex];

    todo.name = this.state.newTodo;

    const todos = this.state.todos;

    todos[this.state.editingIndex] = todo;
    this.setState({todos, editing:false, editingIndex:null, newTodo: ''});

  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Lista de Tarefas</h1>
        </header>
        <div className="container">
          <input type="text" 
          name="todo" 
          className="my-4 form-control"
            placeholder="Add a new todo" 
            onChange={this.handleChange}
            value={this.state.newTodo}
          />
        <button onClick={this.state.editing ? this.updateTodo : this.addTodo} 
        className="btn-info mb-3 form-control">
        {this.state.editing ? 'Editar Tarefa' : 'Adicionar Tarefa'}
        </button>
        {
          !this.state.editing &&
            <ul className="list-group">
              {this.state.todos.map((item, index) => {
                return <li key={item.id} className="list-group-item">
                <button onClick = {() => {this.editTodo(index);}}
                className="btn-sm mr-4 btn btn-success">
                Editar
                </button>
                {item.name}
                <button onClick = {() => {this.deleteTodo(index);}}
                className="btn-sm ml-4 btn btn-danger">
                Excluir
                </button>
                </li>
              })}     
            </ul>
        }
        </div>
      </div>
    );
  }
}

export default App;