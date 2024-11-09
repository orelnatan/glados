import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LayoutModule } from '@glados/shared/layout';
import { FirebaseModule } from '@glados/shared/firebase';

import { GoogleAuthService } from './services';

@Component({
  selector: 'auth-root',
  standalone: true,
  imports: [
    RouterModule,
    LayoutModule,
    FirebaseModule
  ],
  providers: [
    GoogleAuthService
  ],
  template: `
    <root-layout>
      <router-outlet />
    </root-layout>
  `,
})
export class AuthRootComponent {}
