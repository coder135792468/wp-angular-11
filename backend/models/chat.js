import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	lastMsg: {
		type: String,
		default: 'No chats found',
	},
	admin: {
		type: mongoose.Schema.Types.ObjectId,
	},
	messages: [
		{
			msg: {
				type: String,
			},
			userId: {
				type: mongoose.Schema.Types.ObjectId,
			},
			name: {
				type: String,
			},
			time: {
				type: Date,
				default: Date.now(),
			},
		},
	],
});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
