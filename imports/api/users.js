import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import SimpleSchema from 'simpl-schema';

Accounts.validateNewUser(user => {
	const email = user.emails[0].address;
	console.log('This is the user', user);

	new SimpleSchema({
		email: {
			type: String,
			regEx: SimpleSchema.RegEx.Email
		}
	}).validate({ email });

	return true;
});
