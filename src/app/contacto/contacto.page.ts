import { Component } from '@angular/core';
import { AccesoService } from '../services/acceso.service';
import { ResponseApi } from '../interfaces/response.interface';
import { ToastService } from '../services/toast.service';
import { NavController } from '@ionic/angular';
import { IContacto } from '../interfaces/contactos.interface';

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

  txt_codcontacto: string = ""

  disableButton: boolean = false

  isEdit: boolean = false

  constructor(
    private _accesoService: AccesoService,
    private _toastService: ToastService,
    private _navController: NavController

  ) {
    this._accesoService.getSession("cod_persona").then((value) => {
      this.txt_cod_persona = value!;
    })

    this._accesoService.getSession("cod_contacto").then((value) => {
      this.txt_codcontacto = value!;
      if (this.txt_codcontacto) {
        this.buscarContacto(this.txt_codcontacto)
        this.isEdit = true
      }
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


    this._accesoService.postData(body).subscribe((response: ResponseApi<IContacto>) => {
      if (response.status) {
        this._toastService.showToast(response.msg)
        this._navController.navigateRoot('/contactos')
      } else {
        this._toastService.showToast(response.msg)
      }
    })
  }
  editar() {

    const body = {
      accion: "updateContacto",
      cod_contacto: this.txt_codcontacto,
      nombre: this.txt_nombre,
      apellido: this.txt_apellido,
      correo: this.txt_correo,
      telefono: this.txt_telefono
    }



    this._accesoService.postData(body).subscribe((response: ResponseApi<IContacto>) => {
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


    this._accesoService.postData(body).subscribe((response: ResponseApi<IContacto>) => {

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
  buscarContacto(txt_codcontacto: string) {
    const body = {
      accion: "getContactoById",
      cod_contacto: txt_codcontacto
    }


    this._accesoService.postData(body).subscribe((response: ResponseApi<IContacto>) => {
      const data = response.data[0]
      this.txt_nombre = data.nom_contacto
      this.txt_apellido = data.ape_contacto
      this.txt_correo = data.email_contacto
      this.txt_telefono = data.telefono_contacto

    })
  }

}


