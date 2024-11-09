import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
   name: 'image',
})
export class ImagePipe implements PipeTransform {
  transform(name: string): string { 
    return `assets/images/${name.split(".")[1]}/${name}`;
  }
}