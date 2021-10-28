import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-sidebar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Output() conversationClicked: EventEmitter<any> = new EventEmitter();
  searchText!: string;

  rooms: any = [];

  // conversations = [
  //   {
  //     name: 'Rock',
  //     time: '8:21',
  //     latestMessage: 'Good Morning!',
  //     latestMessageRead: true,
  //     messages: [
  //       { id: 1, body: 'Hello world', time: '8:21', me: true },
  //       { id: 2, body: 'How are you?', time: '8:21', me: false },
  //       { id: 3, body: 'I am fine thanks', time: '8:21', me: true },
  //       { id: 4, body: 'Glad to hear that', time: '8:21', me: false },
  //     ],
  //   },
  // ];

  // get filteredConversations() {
  //   return this.conversations.filter((conversation) => {
  //     return (
  //       conversation.name
  //         .toLowerCase()
  //         .includes(this.searchText.toLowerCase()) ||
  //       conversation.latestMessage
  //         .toLowerCase()
  //         .includes(this.searchText.toLowerCase())
  //     );
  //   });
  // }

  async getAllChats() {
    const { data } = await axios.get('http://localhost:5000/api/chat/');
    this.rooms = data;
  }
  constructor() {
    this.getAllChats();
  }

  ngOnInit(): void {}

  async createRoom() {
    const name = prompt('Enter room name: ');
    const user: any = localStorage.getItem('user');
    const token = JSON.parse(user).token;
    const { data }: any = await axios.post(
      'http://localhost:5000/api/chat/',
      { name },
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data);
    this.rooms = this.rooms.concat(data);
  }
}
