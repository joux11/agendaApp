import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AccesoService } from '../services/acceso.service';
import { ResponseApi } from '../interfaces/response.interface';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.page.html',
  styleUrls: ['./contactos.page.scss'],
})
export class ContactosPage {

  contactos: any[] = []
  cod_persona: string = ""
  constructor(
    private _navController: NavController,
    private _accesoService: AccesoService
  ) {
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
    this._accesoService.postData(body).subscribe((response: ResponseApi) => {
      console.log(response)
      if (response.status) {
        this.contactos = response.data
      }
    })
  }


}
