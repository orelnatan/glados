import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LayoutModule } from './shared/layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LayoutModule
  ],
  templateUrl: './app-root.component.html',
})
export class AppRootComponent {}
