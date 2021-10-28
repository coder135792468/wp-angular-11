import jwt from 'jsonwebtoken';

const generateToken = (id) => {
	try {
		return jwt.sign({ id }, process.env.JWT_SECRET);
	} catch (err) {
		console.log(err);
	}
};

export default generateToken;
