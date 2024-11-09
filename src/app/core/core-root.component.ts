import { Component, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LayoutModule } from '@glados/shared/layout';

@Component({
  selector: 'core-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
  ],
  template: `
    <root-layout>
      <router-outlet />
    </root-layout>
  `,
})
export class CoreRootComponent {
  constructor(
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.document.body.classList.add("aurora");
  }
}
