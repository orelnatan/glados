import { Component } from '@angular/core';
import { ApolloError } from 'apollo-server-errors';

import { WindowMessage, WindowMessageType, Origin } from '@glados/core/models';
import { LayoutModule } from '@glados/shared/layout';
import { UtilsModule } from '@glados/shared/utils';
import { GoogleAuthService } from '@glados/auth/services';
import { AuthCredentials } from '@glados/auth/models';

@Component({
  selector: 'login-page',
  standalone: true,
  imports: [
    LayoutModule,
    UtilsModule,
  ],
  templateUrl: './login-with-google-page.component.html',
  styleUrl: './login-with-google-page.component.scss'
})
export class LoginWithGooglePageComponent {
  constructor(
    private readonly googleAuthService: GoogleAuthService,
  ) {} 

  ngOnInit(): void {
    this.logout();
  }

  logout(): void {
    this.googleAuthService.logout().then(() => {
      console.log("You have logged out!!")
    })
  }

  login(): void {
    this.googleAuthService.login().subscribe({
      next: (credentials: AuthCredentials): void => {
        window.postMessage({ source: Origin.GLaDOS, type: WindowMessageType.LoginSuccess, payload: { credentials }} as WindowMessage, '*');
      },
      error: (error: ApolloError): void => {
        window.postMessage({ source: Origin.GLaDOS, type: WindowMessageType.LoginFailed, payload: { error }} as WindowMessage, '*');
      },
    })
  }  
}