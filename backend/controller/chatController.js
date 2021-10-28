import Chat from '../models/Chat.js';
import asyncHandler from 'express-async-handler';

const getAllChats = asyncHandler(async (req, res) => {
	try {
		const chats = await Chat.find({});
		res.json(chats);
	} catch (error) {
		console.log(error);
		res.status(500);
		throw new Error('Server Error');
	}
});

const addChat = asyncHandler(async (req, res) => {
	try {
		const chat = new Chat();
		chat.name = req.body.name || Date.now().toString();
		chat.admin = req.user.id;
		const createdChat = await chat.save();
		res.status(201).json(createdChat);
	} catch (error) {
		console.log(error);
		res.status(500);
		throw new Error('Server Error');
	}
});

//@desc Add messgae to the existing room
//@route /api/chat/msg:id
//@acess Private
const addMessage = asyncHandler(async (req, res) => {
	try {
		const room = await Chat.findById(req.params.id);
		const message = {
			msg: req.body.msg,
			name: req.user.name,
			time: Date.now().toString(),
			userId: req.user._id,
		};
		room.lastMsg = req.body.msg;
		room.messages = room.messages.concat(message);

		await room.save();
		res.json(room);
	} catch (error) {
		console.log(error);
		res.status(500);
		throw new Error('Server Error');
	}
});

export { getAllChats, addChat, addMessage };
