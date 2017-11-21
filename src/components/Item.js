import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'dva';

class Item extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: props.completed,
      editing: false,
      title: props.title,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      checked: props.completed,
    });
  }

  toggle = () => {
    const { id, dispatch } = this.props;
    dispatch({ type: 'todos/toggle', payload: id });
  }

  editing = (e) => {
    if (e.keyCode === 27) {
      this.cancelEdit();
      return;
    }
    if (e.keyCode === 13) {
      const value = e.target.value.trim();
      this.doneEdit(value);
    }
  }

  openEditing = () => {
    this.setState({
      editing: true,
    });
  }

  cancelEdit = () => {
    this.setState({
      editing: false,
    });
  }

  doneEdit = () => {
    const { id, dispatch } = this.props;
    dispatch({ type: 'todos/edit', payload: { id, title: this.state.title } });
    this.setState({
      editing: false,
    });
  }

  changeTitle = (e) => {
    this.setState({
      title: e.target.value,
    });
  }

  delete = () => {
    const { id, dispatch } = this.props;
    dispatch({ type: 'todos/delete', payload: id });
  }

  render() {
    const { title } = this.props;
    return (
      <li className={classnames({ completed: this.state.checked, editing: this.state.editing })}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={this.state.checked} onChange={this.toggle} />
          <label htmlFor onDoubleClick={this.openEditing}>{title}</label>
          <button className="destroy" onClick={this.delete} />
        </div>
        <input className="edit" value={this.state.title} onKeyUp={this.editing} onChange={this.changeTitle} onBlur={this.doneEdit} />
      </li>
    );
  }
}

export default connect()(Item);
