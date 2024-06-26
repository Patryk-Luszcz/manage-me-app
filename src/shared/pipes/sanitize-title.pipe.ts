import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sanitizeTitle',
  standalone: true,
})
export class SanitizeTitlePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    return value.replace('_', ' ');
  }
}
