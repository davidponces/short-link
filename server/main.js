import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import { Links } from '../imports/api/links';
// import moment from 'moment';

import '../imports/api/users';
import '../imports/api/links';
import '../imports/startup/simple-schema-configuration';

Meteor.startup(() => {
	// let momentNow = moment(0);
	// console.log(momentNow.fromNow());

	// creating and registering new middleware function
	// Set the HTTP status code to a 302
	// Set location header to "http://www.google.com"
	// End the request

	WebApp.connectHandlers.use((req, res, next) => {
		const _id = req.url.slice(1);
		const link = Links.findOne({ _id });

		if (link) {
			res.statusCode = 302;
			res.setHeader('Location', link.url);
			res.end();
			Meteor.call('links.trackVisit', _id);
		} else {
			next();
		}
	});
});

// WebApp.connectHandlers.use((req, res, next) => {
// 	// console.log('This is from my custom middleware');
// 	// console.log(req.url, req.method, req.headers);
// 	// // Set an HTTP status code for a given request
// 	// res.statusCode = 404;
// 	// // http headers - to redirect
// 	// res.setHeader('my-custom-header', 'David was here');
// 	// // Set http body
// 	// // res.write('<h1>This is my middleware at work!</h1>');
// 	// // End Http request
// 	// res.end();

// 	next();
// });

// request comes in
// run our middleware
// send them that page
