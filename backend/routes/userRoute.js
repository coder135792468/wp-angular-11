import express from 'express';
import {
	registerUser,
	loginUser,
	allUsers,
} from '../controller/userController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();
router.route('/all').get(protect, allUsers);
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

export default router;
