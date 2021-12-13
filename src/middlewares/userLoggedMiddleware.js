const User = require('../models/userModel');
const db = require('../database/models');


async function userLoggedMiddleware(req, res, next) {
	res.locals.isLogged = false;

	let emailInCookie = req.cookies.userEmail;

	if (emailInCookie) {
	let userFromCookie = await db.User.findOne({
		attributes: ['id','first_name', 'last_name', 'email', 'image', 'category']
		,where: {
			email: emailInCookie
		}});

	
		delete userFromCookie.password;
		req.session.userLogged = userFromCookie;
	}
    
	if (req.session.userLogged) {
		res.locals.isLogged = true;
		res.locals.userLogged = req.session.userLogged;
	}
	next();
}

module.exports = userLoggedMiddleware;