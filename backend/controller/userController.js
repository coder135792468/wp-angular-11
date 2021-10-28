import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import generateToken from '../config/generateToken.js';

//@desc Register a user with
//@route POST /api/user/
//@acess public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		return res.status(401).json({
			message: 'Invalid data',
		});
	}
	if (
		name.trim().length === 0 ||
		email.trim().length === 0 ||
		password.trim().length === 0
	) {
		return res.status(401).json({
			message: 'All fields are required',
		});
	} else {
		const existUser = await User.findOne({ email });
		if (existUser) {
			return res.status(401).json({
				message: 'User already registered',
			});
		}
		try {
			const user = await User.create({ name, email, password });
			if (user) {
				return res.status(201).json({
					_id: user._id,
					name: user.name,
					email: user.email,
					avatar: user.avatar,
					bio: user.bio,
					token: generateToken(user._id),
				});
			} else {
				return res.status(400).json({
					message: 'Invalid user data',
				});
			}
		} catch (error) {
			console.log(error);
			res.status(500);
			throw new Error('Server Error');
		}
	}
});

//@desc Login a User
//@route POST /api/user/login
//@acess public
const loginUser = asyncHandler(async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (user && (await user.matchPassword(password))) {
			return res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				bio: user.bio,
				avatar: user.avatar,

				token: generateToken(user._id),
			});
		} else {
			return res.status(401).json({
				message: 'Invalid email or password',
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500);
		throw new Error('Server Error');
	}
});

//@desc GET all users;
//@route POST /api/user/all
//@acess private
const allUsers = asyncHandler(async (req, res) => {
	try {
		const users = await User.find({ email: { $nin: [req.user.email] } });
		res.json(users);
	} catch (error) {
		console.log(error);
		res.status(500);
		throw new Error('Server Error');
	}
});

export { registerUser, loginUser, allUsers };
