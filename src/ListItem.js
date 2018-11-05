import React from 'react';

const ListItem = (props) => {

return <li className="list-group-item">
    <button onClick = {props.editTodo}
    className="btn-sm mr-4 btn btn-success">
    Editar
    </button>
    {props.item.name}
    <button onClick = {props.deleteTodo}
    className="btn-sm ml-4 btn btn-danger">
    Excluir
    </button>
    </li>
};

export default ListItem; 