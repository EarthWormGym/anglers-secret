import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  _loginService: LoginService;

  constructor(_loginService: LoginService) {
    this._loginService = _loginService;
  }
}
