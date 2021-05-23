import * as React from 'react';

export default class TodoItem extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isEditing: false,
        value: this.props.text,
        oldValue: ''
      };

      this.handleEdit = this.handleEdit.bind(this);
      this.handleLeaveEditing = this.handleLeaveEditing.bind(this);
      this.handleChangeTodoValue = this.handleChangeTodoValue.bind(this);
    }

    handleEdit() {
      this.setState(state => ({
        isEditing: true,
        oldValue: state.value
      }));
    }

    handleDelete(id) {
      this.props.handleDeleteItem(id);
    }

    handleSaveEditing(e, id) {
      this.props.handleUpdateItem(e, id);

      this.setState({
        isEditing: false
      }); // не синхронно
    }

    handleLeaveEditing() {
      this.setState(state => ({
        isEditing: false,
        value: state.oldValue
      }));
    }

    handleChangeTodoValue(e) {
      this.setState({
        value: e.target.value
      });
    }

    render() {
        const {
          isEditing,
          value
        } = this.state;

        const {
          id
        } = this.props;

        return (
          <div className="todo-list-elem">
            <input 
                className={`todo-text-area ${isEditing ? 'editing' : ''}`}
                value={value}
                type="text"
                disabled={!isEditing}
                onChange={this.handleChangeTodoValue}
            />
            <i
                onClick={isEditing ? this.handleSaveEditing.bind(this, id) : this.handleEdit.bind(this, id)}
                className={isEditing ? "fa fa-check" : "fa fa-edit"}
                aria-hidden="true"
                height="30"
                width="30"
            ></i>
            <i
                onClick={isEditing ? this.handleLeaveEditing : this.handleDelete.bind(this, id)}
                className={isEditing ? "fa fa-times" : "fa fa-trash-alt"}
                aria-hidden="true"
                height="30"
                width="30"
            ></i>
          </div>
        );
      }
  }