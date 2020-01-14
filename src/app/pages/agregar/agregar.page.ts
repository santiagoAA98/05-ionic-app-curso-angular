import { Component } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { ListaItem } from '../../models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage {

  lista: Lista;
  nombreItem = '';

  constructor(private deseosService: DeseosService,
              private route: ActivatedRoute) {

    const listaId = this.route.snapshot.paramMap.get('listaId');

    this.lista = this.deseosService.obtenerLista(listaId);
  }

  agregarItem() {
    if (0 < this.nombreItem.length) {
      const nuevoItem = new ListaItem(this.nombreItem);
      this.lista.items.push(nuevoItem);
      this.deseosService.guardarStorage();

      this.nombreItem = '';
    }
  }

  cambioCheck(lista: ListaItem) {
    const pendientes = this.lista.items
                           .filter( itemData => !itemData.completado)
                           .length;

    if (pendientes === 0) {
      this.lista.termindaEn = new Date();
      this.lista.terminada = true;
    } else  {
      this.lista.termindaEn = null;
      this.lista.terminada = false;
    }

    this.deseosService.guardarStorage();
  }

  borrar(i: number) {
    this.lista.items.splice(i, 1);
    this.deseosService.guardarStorage();
  }

}
