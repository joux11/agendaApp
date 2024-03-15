import { Component } from '@angular/core';
import { AccesoService } from '../services/acceso.service';
import { ResponseApi } from '../interfaces/response.interface';
import { ToastService } from '../services/toast.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})
export class ContactoPage {

  txt_nombre: string = ""
  txt_apellido: string = ""
  txt_correo: string = ""
  txt_telefono: string = ""
  txt_cod_persona: string = ""
  telefonoExiste: boolean = false;
  mensajeError: string = ""

  disableButton: boolean = false

  constructor(
    private _accesoService: AccesoService,
    private _toastService: ToastService,
    private _navController: NavController

  ) {
    this._accesoService.getSession("cod_persona").then((value) => {
      this.txt_cod_persona = value!;
    })
  }

  guardar() {

    const body = {
      accion: "guardarContacto",
      cod_persona: this.txt_cod_persona,
      nombre: this.txt_nombre,
      apellido: this.txt_apellido,
      correo: this.txt_correo,
      telefono: this.txt_telefono
    }


    this._accesoService.postData(body).subscribe((response: ResponseApi) => {
      if (response.status) {
        this._toastService.showToast(response.msg)
        this._navController.navigateRoot('/contactos')
      } else {
        this._toastService.showToast(response.msg)
      }
    })
  }
  verificarTelefono(value: string) {
    const body = {
      accion: "verificarTelefono",
      cod_persona: this.txt_cod_persona,
      telefono: value
    }


    this._accesoService.postData(body).subscribe((response: ResponseApi) => {

      if (response.status) {
        this.disableButton = true
        this.telefonoExiste = true
        this.mensajeError = response.msg

      } else {
        this.telefonoExiste = false
        this.disableButton = false

      }
    })
  }

}
