import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  async register(enterData: any) {
    const { data }: any = await axios.post(
      'http://localhost:5000/api/user/register',
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
