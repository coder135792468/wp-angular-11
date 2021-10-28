import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import http from 'http';
import connectDB from './config/db.js';
import chatRoute from './routes/chatRoute.js';
import userRoute from './routes/userRoute.js';
import cors from 'cors';
import { Server } from 'socket.io';
import socketManager from './routes/scoketManager.js';
import { notFound, errorHandler } from './middlewares/errors.js';
dotenv.config();

connectDB();

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

io.on('connection', socketManager);

app.use('/api/chat', chatRoute);
app.use('/api/user', userRoute);

app.use(notFound);
app.use(errorHandler);

server.listen(
	process.env.PORT || 5000,
	console.log('server is running'.brightMagenta.bold.italic.underline)
);
