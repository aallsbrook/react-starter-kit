import './_TodoList.scss';

import React from 'react';

import Todo from '../../components/Todo/Todo';

class TodoList extends React.Component {

  render () {
    return (
      <div className="TodoList">
        {this.props.todoItems.map(this._renderTodo, this)}
      </div>
    )
  }

  _renderTodo (todoObj) {
    return (
      <Todo key={todoObj.id} todoObj={todoObj} />
    );
  }
}

TodoList.propTypes = {
  todoItems: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    description: React.PropTypes.string.isRequired
  })).isRequired
};

export default TodoList;
