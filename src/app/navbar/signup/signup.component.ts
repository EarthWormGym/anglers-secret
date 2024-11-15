import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent {}
