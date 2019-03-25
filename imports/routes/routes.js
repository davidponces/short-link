import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import Login from '../ui/Login';
import Signup from '../ui/Signup';
import Link from '../ui/Link';
import NotFound from '../ui/NotFound';

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

const history = createBrowserHistory();

const onEnterPublicPage = Component => {
	if (Meteor.userId()) {
		return <Redirect to='/links' />;
	} else {
		return <Component />;
	}
};

const onEnterPrivatePage = Component => {
	if (!Meteor.userId()) {
		return <Redirect to='/' />;
	} else {
		return <Component />;
	}
};

export const onAuthChange = isAuthenticated => {
	const pathname = window.location.pathname;
	const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
	const isAuthenticatedPage = authenticatedPages.includes(pathname);
	if (isUnauthenticatedPage && isAuthenticated) {
		history.push('links');
	} else if (isAuthenticatedPage && !isAuthenticated) {
		history.push('/');
	}
};

//on enterprivatepage
export const routes = (
	<Router history={history}>
		<Switch>
			<Route path='/' exact={true} render={() => onEnterPublicPage(Login)} />
			<Route path='/signup' render={() => onEnterPublicPage(Signup)} />
			<Route path='/links' render={() => onEnterPrivatePage(Link)} />
			<Route path='/*' component={NotFound} />
		</Switch>
	</Router>
);
