import './_HomePage.scss';

import React from 'react';

import TodoList from '../../components/TodoList/TodoList';

import AppActions from '../../actions/AppActions';
import TodoStore from '../../stores/TodoStore';
import Utils from '../../util/Utils';

class HomePage extends React.Component {

  constructor (...args) {
    super(...args);

    this.state = {
      todoItems: TodoStore.getItems()
    };

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

        <button className="HomePage-button" onClick={this._navigateToAboutPage}>Go to About Page</button>
        <br />
        <button className="HomePage-button" onClick={this._ToggleButtonPostion}>Toggle Main Nav aka Hamburger
          Icon/Menu
        </button>



      </div>
    );
  }

  _handleTodoStoreChange () {
    this.setState({
      todoItems: TodoStore.getItems()
    });
  }


  _ToggleButtonPostion () {
    if (document.getElementById("header").className == "Header left")
      document.getElementById("header").className = "Header right";
    else
      document.getElementById("header").className = "Header left";
  }

  _navigateToAboutPage () {
    Utils.navigateToPage('/about');
  }

}

HomePage.propTypes = {};

export default HomePage;
