import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../models/lista.model';

@Pipe({
  name: 'filtroCompletados',
  pure: false
})
export class FiltroCompletadosPipe implements PipeTransform {

  transform(listas: Lista[], completada: boolean = true): any {
    return listas.filter( lista => lista.terminada === completada)
  }

}
