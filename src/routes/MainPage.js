import React, { Component } from 'react';
import { connect } from 'dva';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ItemList from '../components/ItemList';

class MainPage extends Component {	
	constructor(props) {
		super(props);
		this.state = {
			checked: props.allCompleted,
		};
	}

	componentWillReceiveProps(props) {
		this.setState({
			checked: props.allCompleted,
		});
	}

	change = () => {
		const { dispatch } = this.props;
		this.setState({
			checked: !this.state.checked,
		}, () => {
			dispatch({ type: 'todos/toggleAllCompleted' });
		});
	}

	render() {
		return (
			<section className="todoapp">
				<Header />
				<section className="main">
					<input id="toggle-all" className="toggle-all" type="checkbox" checked={this.state.checked} onChange={this.change} />
					<label htmlFor="toggle-all">Mark all as complete</label>
					<ItemList />
				</section>
				<Footer />
			</section>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		allCompleted: state.todos && state.todos.isAllCompleted,
	};
};

export default connect(mapStateToProps)(MainPage);		
