import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import axios from 'axios';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @Input() conversation: any;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  emojiPickerVisible: any;
  message = '';
  socket: any;

  constructor() {
    const user: any = localStorage.getItem('user');
    const userInfo = JSON.parse(user);

    this.socket = io('http://localhost:5000');
    this.socket.emit('connected');
    this.socket.on('message', (data: any) => {
      data.me = data.id == userInfo._id;
      this.conversation.messages.unshift(data);
    });

    setTimeout(() => {
      this.conversation.messages = this.conversation.messages.map(
        (data: any) => {
          return {
            id: data.userId,
            name: data.name,
            msg: data.msg,
            time: data.time,
            me: data.userId == userInfo._id,
          };
        }
      );
      console.log(this.conversation);
    }, 10);
  }

  ngOnInit(): void {}

  async submitMessage(event: any) {
    const user: any = localStorage.getItem('user');
    const userInfo = JSON.parse(user);

    let value = event.target.value.trim();
    this.message = '';
    //if (value.length < 1) return false;
    event.target.value = '';

    const { data } = await axios.post(
      `http://localhost:5000/api/chat/msg/${this.conversation._id}`,
      { msg: value },
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    this.socket.emit('getMessage', {
      id: userInfo._id,
      name: userInfo.name,
      msg: value,
    });

    this.conversation.lastMsg = value;
    this.conversation.messages.unshift({
      id: userInfo._id,
      name: userInfo.name,
      msg: value,
      time: Date.now().toString(),
      me: true,
    });
  }

  emojiClicked(event: any) {
    this.message += event.emoji.native;
  }
}
