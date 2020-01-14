import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @Input()
  terminada = true;

  @ViewChild( IonList, { static: true} )
  lista: IonList;

  constructor(public deseosService: DeseosService,
              private router: Router,
              private alertEdit: AlertController) { }

  ngOnInit() {}

  listaSeleccionada(lista: Lista) {

    if (this.terminada) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }

  }

  async editarLista(lista: Lista) {
    /* this.router.navigateByUrl('/tabs/tab1/agregar'); */
    const alert = await this.alertEdit.create({
      header: 'Editar lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Actualizar',
          handler: ( data ) => {
            if ( data.titulo.length === 0 ) {
              return;
            } else {
              this.deseosService.editarLista(lista, data.titulo);
            }
          }
        }
      ]
    });

    alert.present();

    this.lista.closeSlidingItems();
  }

  borrarLista(lista: Lista) {
    this.deseosService.borrarLista(lista);
  }

}
