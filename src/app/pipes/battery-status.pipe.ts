import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'exponentialStrength'})
export class BatteryStatusPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
  }
}
