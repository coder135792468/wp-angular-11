import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  async login(enterData: any) {
    const { data }: any = await axios.post(
      'http://localhost:5000/api/user/login',
      enterData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    localStorage.setItem('user', JSON.stringify(data));

    console.log(data);
    this.router.navigate(['/']);
  }
}
