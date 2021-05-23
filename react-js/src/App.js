import * as React from 'react';
import './App.css';
import Add from './components/Add';
import TodoList from './components/TodoList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      text: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleUpdateItem = this.handleUpdateItem.bind(this);
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleClick(e) {
    e.preventDefault();

    const trimmedValue = this.state.text?.trim(); // выделить эту логику в отдельную функцию

    if (!trimmedValue) {
      return;
    }

    const newItem = {
      text: trimmedValue,
      id: Date.now()
    };
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: ''
    }));
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      const trimmedValue = this.state.text?.trim();

      if (!trimmedValue) {
        return;
      }

      const newItem = {
        text: trimmedValue,
        id: Date.now()
      };
      this.setState(state => ({
        items: state.items.concat(newItem),
        text: ''
      }));
    }
  }

  handleDeleteItem(id) {
    this.setState(prevState => ({
      items: prevState.items.filter(item  => item.id !== id )
    }));
  }

  handleUpdateItem(id, e) {
    const newItems = [ ...this.state.items ];
    const itemToUpdateIndex = newItems.findIndex(item => item.id === id);
    newItems[itemToUpdateIndex].text = e.target.value;

    this.setState({
      items: newItems
    });
  }

  render() {
    return (
      <div className="App">
          <Add 
            handleChange={this.handleChange} 
            handleClick={this.handleClick}
            handleKeyDown={this.handleKeyDown}
            text={this.state.text}
          />
          <TodoList
            items={this.state.items}
            handleDeleteItem={this.handleDeleteItem}
            handleUpdateItem={this.handleUpdateItem}
          />
      </div>
    );
  }
}

export default App;
