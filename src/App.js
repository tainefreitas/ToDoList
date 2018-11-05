import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ListItem from './ListItem';

class App extends Component {
  constructor() {
    super();
    this.state = {
      newTodo: '',
      editing: false,
      editingIndex: null,
      notification: null,
      todos: [{
        id: 1, name: 'Programar'
      }]
    };


    this.alert = this.alert.bind(this);
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
    this.alert('Tarefa adicionada com sucesso!');

  }

  alert(notification){
    this.setState({
      notification
    });

    setTimeout(()=>{
      this.setState({
        notification: null
      });
    }, 2000);

  }

  deleteTodo(index){
    const todos = this.state.todos;
    delete todos[index];

    this.setState({todos});
    this.alert('Tarefa excluída com sucesso!');

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
    this.alert('Tarefa editada com sucesso!');


  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Lista de Tarefas</h1>
        </header>
        <div className="container"> 
        {
          this.state.notification && 
          <div className="alert alert-success">
            <p className="text-center">
            {this.state.notification}
              </p>
          </div>
        }
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
                return <ListItem
                key = {item.id}
                item = {item}
                editTodo = {() => {this.editTodo(index);}}
                deleteTodo = {() => {this.deleteTodo(index);}}
                />;
              })}     
            </ul>
        }
        </div>
      </div>
    );
  }
}

export default App;