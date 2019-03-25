import React from 'react';
import propTypes from 'prop-types';
import Clipboard from 'clipboard';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';

export default class LinkListItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			justCopied: false
		};
	}
	componentDidMount() {
		this.clipboard = new Clipboard(this.refs.copy);
		this.clipboard
			.on('success', e => {
				this.setState({ justCopied: true });
				setTimeout(() => this.setState({ justCopied: false }), 1000);
			})
			.on('error', () => {
				alert('Unable to copy. Please manually copy the link.');
			});
	}
	componentWillUnmount() {
		this.clipboard.destroy();
	}
	renderStats() {
		const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
		let visitMomentFromNow = moment(this.props.lastVisitedAt).fromNow();
		const visitTimeFromNow =
			typeof this.props.lastVisitedAt === 'number'
				? `(visited ${visitMomentFromNow})`
				: '';
		return (
			<p className='item__messages'>
				{this.props.visitedCount} {visitMessage} {visitTimeFromNow}
			</p>
		);
	}
	render() {
		return (
			<div className='item'>
				<h2> {this.props.url} </h2>
				<p className='item__messages'> {this.props.shortUrl} </p>
				{this.renderStats()}
				<a
					className='button button--pill button--link'
					href={this.props.shortUrl}
					target='_blank'
				>
					Visit
				</a>
				<button
					className='button button--pill'
					ref='copy'
					data-clipboard-text={this.props.shortUrl}
				>
					{!this.state.justCopied ? `Copy` : `Copied`}
				</button>
				<button
					className='button button--pill'
					onClick={() => {
						Meteor.call(
							'links.setVisibility',
							this.props._id,
							!this.props.visible
						);
					}}
				>
					{this.props.visible ? 'Hide' : 'Unhide'}
				</button>
			</div>
		);
	}
}

LinkListItem.propTypes = {
	url: propTypes.string.isRequired,
	userId: propTypes.string.isRequired,
	_id: propTypes.string.isRequired,
	shortUrl: propTypes.string.isRequired,
	visible: propTypes.bool.isRequired,
	visitedCount: propTypes.number.isRequired,
	lastVisitedAt: propTypes.number
};
