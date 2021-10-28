const socketManager = (socket) => {
	socket.on('connected', () => {
		console.log('A user connected');
	});
	socket.on('getMessage', (data) => {
		data.time = Date.now().toString();
		socket.broadcast.emit('message', data);
	});
};

export default socketManager;
