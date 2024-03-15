import { Component } from '@angular/core';
import { AccesoService } from '../services/acceso.service';
import { ResponseApi } from '../interfaces/response.interface';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage {

  username: string = ""

  constructor(
    private _accesoService: AccesoService,
    private _navController: NavController

  ) {
    this._accesoService.getSession("cod_persona").then((value) => {
      this.getUser(value!)
      console.log(value)

    })

  }

  getUser(value: string) {

    const body = {
      accion: "getUserById",
      cod_persona: value

    }

    this._accesoService.postData(body).subscribe((response: ResponseApi) => {
      if (response.status) {
        this.username = `${response.data[0].nom_persona} ${response.data[0].ape_persona} `
      }
    })
  }



  irPerfil() {
    console.log("irPerfil");
  }
  irContactos() {
    this._navController.navigateRoot('/contactos')
  }

}
