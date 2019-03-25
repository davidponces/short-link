import React from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

// visitedCount 0 1 2 3
// lastVisitedAt null

export default class LinksListFilters extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showHidden: false
		};
	}
	componentDidMount() {
		this.tracker = Tracker.autorun(() => {
			this.setState({ showHidden: Session.get('showHidden') });
		});
	}
	componentWillUnmount() {
		this.tracker.stop();
	}
	render() {
		return (
			<div>
				<label className='checkbox'>
					<input
						className='checkbox__box'
						type='checkbox'
						ref='checkbox'
						checked={this.state.showHidden}
						onChange={e => {
							Session.set('showHidden', e.target.checked);
						}}
					/>
					Show hidden links!
				</label>
			</div>
		);
	}
}
