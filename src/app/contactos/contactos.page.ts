import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AccesoService } from '../services/acceso.service';

import { IContacto } from '../interfaces/contactos.interface';
import { ResponseApi } from '../interfaces/response.interface';


@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.page.html',
  styleUrls: ['./contactos.page.scss'],
})
export class ContactosPage {

  contactos: IContacto[] = []
  cod_persona: string = ""
  constructor(
    private _navController: NavController,
    private _accesoService: AccesoService,
    private _alertController: AlertController
  ) {
    this._accesoService.closeSession("cod_contacto")
    this._accesoService.getSession("cod_persona").then((value) => {

      this.getListado(value!)
    })
  }

  iragregar() {

    this._navController.navigateRoot('/contacto')

  }

  getListado(cod_persona: string) {
    const body = {
      accion: "getListContactos",
      cod_persona: cod_persona

    }
    this._accesoService.postData(body).subscribe((response: ResponseApi<IContacto>) => {
      //console.log(response)
      if (response.status) {
        this.contactos = response.data
      }
    })
  }



  irEditar(codigo: string) {
    this._navController.navigateRoot('/contacto')
    this._accesoService.createSession("cod_contacto", codigo)
  }
  irEliminar(codigo: string) {
    this._alertController.create({
      header: 'Eliminar',
      subHeader: 'Esto no es reversible!',
      message: 'Estas seguro de eliminar? ',
      buttons: [

        {
          text: 'No!',
          handler: () => {
            console.log('Let me think');
          }
        },
        {
          text: 'Yes!',
          handler: () => {
            this.eliminarContacto(codigo)
          }
        }
      ]
    }).then((alert) => {
      alert.present();
    });
  }
  eliminarContacto(cod: string) {
    const body = {
      accion: "deleteContacto",
      cod_contacto: cod
    }

    this._accesoService.postData(body).subscribe((response: ResponseApi<IContacto>) => {
      //console.log(response)
      if (response.status) {
        this._alertController.create({
          header: 'Eliminado!',
          message: 'Se elimino!',
          buttons: ['OK']
        }).then((alert) => {
          alert.present()
          this._accesoService.getSession("cod_persona").then((value) => {

            this.getListado(value!)
          })
        })

      }
    })
  }


}
