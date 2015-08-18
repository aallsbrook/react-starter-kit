import './_HomePage.scss';

import React from 'react';

import TodoList from '../../components/TodoList/TodoList';

import AppActions from '../../actions/AppActions';
import TodoStore from '../../stores/TodoStore';

class HomePage extends React.Component {

  constructor (...args) {
    super(...args);

    this.state = {
      todoItems: TodoStore.getItems() || []
    }

    this._handleTodoStoreChange = this._handleTodoStoreChange.bind(this);
  }

  componentDidMount () {
    TodoStore.addChangeListener(this._handleTodoStoreChange);
    AppActions.getTodoItems();
  }

  componentWillUnmount () {
    TodoStore.removeChangeListener(this._handleTodoStoreChange);
  }

  render () {
    return (
      <div className="page HomePage">
        <br></br>

        <h1>Home Page</h1>

        <p>This is an example home page, powered by React, ES6 &amp; webpack.</p>

        <TodoList todoItems={this.state.todoItems} />
      </div>
    );
  }

  _handleTodoStoreChange () {
    this.setState({
      todoItems: TodoStore.getItems() || []
    });
  }

}

HomePage.propTypes = {};

export default HomePage;
