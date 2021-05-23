import * as React from 'react';

export default class Add extends React.Component {
    render() {
      const {
          handleClick,
          handleChange,
          handleKeyDown,
          text
      } = this.props;

      return (
        <div>
            <input 
                id="todo-input" 
                type="text" 
                placeholder="Введите название дела" 
                onChange={handleChange}
                onKeyPress={handleKeyDown}
                value={text}
            />
            <input 
                id="add-todo-button" 
                value="Добавить дело" 
                type="button" 
                onClick={handleClick}
            />
        </div>
      );
    }
  }