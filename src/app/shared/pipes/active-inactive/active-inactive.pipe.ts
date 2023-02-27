import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activeInactive'
})
export class ActiveInactivePipe implements PipeTransform {

  transform(value: any, ...args: any[]): string {
    return value ? 'Activo' : 'Inactivo';
  }

}
