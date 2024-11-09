import { NgModule } from '@angular/core';

import { 
  ImagePipe
} from './pipes';

@NgModule({
  declarations: [
    ImagePipe
  ],
  exports: [
    ImagePipe
  ]
})
export class UtilsModule {}