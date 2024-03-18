import { Component } from '@angular/core';
import { AccesoService } from '../services/acceso.service';
import { ResponseApi } from '../interfaces/response.interface';
import { NavController } from '@ionic/angular';
import { IPersona } from '../interfaces/personas.interface';

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
      if (!value) {
        this._navController.navigateRoot('/login')
      }
      this.getUser(value!)


    })

  }

  getUser(value: string) {

    const body = {
      accion: "getUserById",
      cod_persona: value

    }

    this._accesoService.postData(body).subscribe((response: ResponseApi<IPersona>) => {
      if (response.status) {
        this.username = `${response.data[0].nom_persona} ${response.data[0].ape_persona} `
      }
    })
  }



  irPerfil() {
    this._navController.navigateRoot('/perfil')
  }
  irContactos() {
    this._navController.navigateRoot('/contactos')
  }

  salir() {
    this._navController.navigateRoot('/login')
    this._accesoService.clearSession()
  }

}
