import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';

// export default class PrivateHeader extends React.Component {
// 	onLogOut() {
// 		// this.props.history.push('/');
// 		Accounts.logout();
// 	}
// 	render() {
// 		return (
// 			<div>
// 				<h1>{this.props.title}</h1>
// 				<p>Press here to Log Out</p>
// 				<button
// 					onClick={() => {
// 						this.onLogOut();
// 					}}
// 				>
// 					Press here to Logout
// 				</button>
// 			</div>
// 		);
// 	}
// }

const PrivateHeader = props => {
	return (
		<div className='header'>
			<div className='header__box'>
				<h1 className='header__title'>{props.title}</h1>
				<button
					className='button button__link-text'
					onClick={() => Accounts.logout()}
				>
					Logout
				</button>
			</div>
		</div>
	);
};

PrivateHeader.propTypes = {
	title: PropTypes.string.isRequired
};

export default PrivateHeader;
