import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Component/layout/Navbar';
import Users from './Component/user/Users';
import Search from './Component/user/Search';
import Alert from './Component/layout/Alert';
import About from './Component/pages/About';
import './App.css';
import axios from 'axios';
import { async } from 'q';
class App extends Component {
	state = {
		users   : [],
		loading : false,
		alert   : null
	};

	// async componentDidMount() {
	// 	this.setState({ loading: true });

	// 	const res = await axios.get(
	// 		`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secert=${process
	// 			.env.REACT_APP_GITHUB_CLIENT_SECRET}`
	// 	);

	// 	this.setState({ users: res.data, loading: false });
	// }

	searchUsers = async (text) => {
		this.setState({ loading: true });
		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${process.env
				.REACT_APP_GITHUB_CLIENT_ID}&client_secert=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		this.setState({ users: res.data.items, loading: false });
	};

	clearUsers = () => this.setState({ users: [], loading: false });

	setAlert = (msg, type) => {
		this.setState({ alert: { msg, type } });

		setTimeout(
			() =>
				this.setState({
					alert : null
				}),
			5000
		);
	};

	render() {
		return (
			<Router>
				<div className="App">
					<Navbar />
					<div className="container">
						<Alert alert={this.state.alert} />

						<Switch>
							<Route
								exact
								path="/"
								render={(props) => (
									<Fragment>
										<Search
											searchUsers={this.searchUsers}
											clearUsers={this.clearUsers}
											showClear={this.state.users.length > 0 ? true : false}
											setAlert={this.setAlert}
										/>
										<Users loading={this.state.loading} users={this.state.users} />
									</Fragment>
								)}
							/>
							<Route exact path="/about" component={About} />
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
