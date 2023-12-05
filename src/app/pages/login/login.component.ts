import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  api: ApiService;

  constructor(api: ApiService) { 
    this.api = api;
  }

  login() {
    this.api.loginCall();
  }

}
