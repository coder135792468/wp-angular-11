import express from 'express';
import {
	getAllChats,
	addChat,
	addMessage,
} from '../controller/chatController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.route('/').get(getAllChats).post(protect, addChat);
router.route('/msg/:id').post(protect, addMessage);
export default router;
