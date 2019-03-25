import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Links } from '../api/links';
import { Tracker } from 'meteor/tracker';
import LinkListItem from './LinkListItem';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

export default class LinksList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			links: []
			// showHidden: true,
			// showHiddenCheck: false
		};
	}
	componentDidMount() {
		this.linksTracker = Tracker.autorun(() => {
			Meteor.subscribe('links');
			const links = Links.find({
				visible: !Session.get('showHidden')
			}).fetch();
			this.setState({ links });
		});
		console.log('componentDidMount');
	}
	componentWillUnmount() {
		console.log('componentWillUnMount');
		this.linksTracker.stop();
	}
	renderLinksListItems() {
		if (!this.state.links.length) {
			return (
				<div className='item'>
					<p className='item__status-message'>No Links Found</p>
				</div>
			);
		} else {
			return this.state.links.map(link => {
				const shortUrl = Meteor.absoluteUrl(link._id);
				return <LinkListItem key={link._id} shortUrl={shortUrl} {...link} />;
			});
		}
		// if (this.state.showHiddenCheck) {
		// 	return <LinkListItem key={link._id} shortUrl={shortUrl} {...link} />;
		// } else {
		// 	return link.visible ? (
		// 		<LinkListItem key={link._id} shortUrl={shortUrl} {...link} />
		// 	) : (
		// 		''
		// 	);
		// }
	}
	render() {
		return (
			<div>
				<FlipMove maintainContainerHeight={true}>
					{this.renderLinksListItems()}
				</FlipMove>
			</div>
		);
	}
}

/* <label htmlFor='visibility'>Show Hidden Links</label>
				<input
					type='checkbox'
					name='visibilityCheckBox'
					onClick={() => {
						this.setState({
							showHiddenCheck: !this.state.showHiddenCheck
						});
					}}
				/> */
