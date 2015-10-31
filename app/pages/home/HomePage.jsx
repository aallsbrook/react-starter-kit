import './_HomePage.scss';

import React from 'react';
import { render } from 'react-dom';

import TodoList from '../../components/TodoList/TodoList';

import AppActions from '../../actions/AppActions';
import TodoStore from '../../stores/TodoStore';
import Utils from '../../util/Utils';
import { APP_TITLE, APP_DESCRIPTION } from '../../constants/AppConstants';

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

          <h2>{APP_DESCRIPTION}
          </h2>

          <p>This is an example home page, powered by React, ES6 &amp; webpack.</p>

          <p>Check out the Getting Started Wiki&nbsp;
            <a href="https://github.com/lmigpiit/react-starter-kit/wiki/Getting-Started-Guide" target="_blank">here</a>!
          </p>

          <p>To see an example of the API run the mock server; <span className="code">sudo npm run mock</span>.</p>

          <TodoList todoItems={this.state.todoItems}/>

          <p>
            <button className="HomePage-button" onClick={this._navigateToAboutPage}>Go to About Page
            </button>
            <br />
          </p>

        </div>
      );
    }

    _handleTodoStoreChange () {
      this.setState({
        todoItems: TodoStore.getItems()
      });
    }

    _navigateToAboutPage () {
      Utils.navigateToPage('/about');
    }

}

HomePage.propTypes = {};

export default HomePage;
