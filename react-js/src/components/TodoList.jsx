import * as React from 'react';
import TodoItem from './TodoItem';

export default class TodoList extends React.Component {
    render() {
        return (
          <div className="todo-list">
            {this.props.items.map(item => (
                <TodoItem
                    key={item.id}
                    id={item.id}
                    text={item.text}
                    handleDeleteItem={this.props.handleDeleteItem}
                    handleUpdateItem={this.props.handleUpdateItem}
                >
                </TodoItem>
            ))}
          </div>
        );
      }
  }