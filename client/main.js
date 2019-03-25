import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { routes, onAuthChange } from '../imports/routes/routes';
import { Session } from 'meteor/session';

import './main.html';
import '../imports/startup/simple-schema-configuration';

Tracker.autorun(() => {
	const isAuthenticated = !!Meteor.userId();
	onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
	Session.set('showHidden', false);
	ReactDOM.render(routes, document.getElementById('app'));
});
