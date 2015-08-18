import './_Todo.scss';

import React from 'react';

class Todo extends React.Component {

  constructor (...args) {
    super(...args);
  }

  render () {
    return (
      <div className="Todo">
        {this.props.todoObj.description}
      </div>
    )
  }

}

Todo.propTypes = {
  todoObj: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    description: React.PropTypes.string.isRequired
  }).isRequired
};

export default Todo;
