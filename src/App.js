import React, { Component } from 'react';
import logo from './logo.svg';
import loading from './loading.gif';
import './App.css';
import ListItem from './ListItem';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      newTodo: '',
      editing: false,
      editingIndex: null,
      notification: null,
      todos: [],
      loading: true
    };

    this.apiUrl = 'https://5be0c717f2ef840013994c29.mockapi.io';
    this.alert = this.alert.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      newTodo: event.target.value
    });
  }

  async componentDidMount(){

    const response = await axios.get(`${this.apiUrl}/todos`);
    setTimeout(()=>{
        this.setState({
          todos: response.data,
          loading: false
        });
      }, 1000);
  
  }



  async addTodo() {

    const response = await axios.post(`${this.apiUrl}/todos`, 
    {name: this.state.newTodo});

    console.log(response);

    const todos = this.state.todos;
    todos.push(response.data);

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

  async deleteTodo(index){
    const todos = this.state.todos;
    const todo = todos[index];

    await axios.delete(`${this.apiUrl}/todos/${todo.id}`);
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
  async updateTodo(){
    const todo = this.state.todos[this.state.editingIndex];

    const response = await axios.put(`${this.apiUrl}/todos/${todo.id}`, {
      name: this.state.newTodo
    });

    const todos = this.state.todos;
    todos[this.state.editingIndex] = response.data;

    this.setState({todos, 
                  editing:false, 
                  editingIndex:null, 
                  newTodo: ''});
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
            placeholder="Digite uma nova tarefa" 
            onChange={this.handleChange}
            value={this.state.newTodo}
          />
        <button onClick={this.state.editing ? this.updateTodo : this.addTodo} 
        className="btn-info mb-3 form-control"
        disabled = {this.state.newTodo.length < 5}>
        {this.state.editing ? 'Editar Tarefa' : 'Adicionar Tarefa'}
        </button>
        {
          this.state.loading &&
          <img src={loading} className="loading" alt="loading" />
        }

        {
          (!this.state.editing || this.state.loading) &&
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