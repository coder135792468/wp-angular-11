import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit {
  conversation: any;

  onConversationSelected(conversation: any) {
    this.conversation = conversation;
  }

  constructor(private router: Router) {
    const data = localStorage.getItem('user');
    if (!data) {
      this.router.navigate(['login']);
    }
  }

  ngOnInit(): void {}
}
