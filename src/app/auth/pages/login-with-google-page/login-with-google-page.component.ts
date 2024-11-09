import { Component } from '@angular/core';

import { GoogleAuthService } from '@glados/auth/services';
import { LayoutModule } from '@glados/shared/layout';
import { UtilsModule } from '@glados/shared/utils';
import { GUserCredential } from '@glados/shared/firebase';

import { Apollo } from "apollo-angular";

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
    private readonly apollo: Apollo
  ) {} 

  ngOnInit(): void {
    this.googleAuthService.getCurrentUser().subscribe(user => {
      !user ? this.login() : null
    });
  }

  login(): void {
    this.googleAuthService.login().then(
      (user: GUserCredential) => {
      console.log(user)
    })
  }
}