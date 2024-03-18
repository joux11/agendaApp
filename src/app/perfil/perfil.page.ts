import { Component } from '@angular/core';
import { AccesoService } from '../services/acceso.service';
import { IPersona } from '../interfaces/personas.interface';
import { ResponseApi } from '../interfaces/response.interface';
import { ToastService } from '../services/toast.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {

  txt_cedula: string = ""
  txt_nombre: string = ""
  txt_apellido: string = ""
  txt_correo: string = ""
  txt_clave: string = ""
  txt_fechaNacimiento: string = ""

  isEdit: boolean = false
  disableButton: boolean = false

  txt_cod_persona: string = ""


  constructor(
    private _accesoService: AccesoService,
    private _toastService: ToastService,
    private _navController: NavController
  ) {

    this._accesoService.getSession("cod_persona").then((value) => {

      if (value) {
        this.txt_cod_persona = value!;
        this.buscarPersona(value!)
        this.isEdit = true
      }

    })

  }

  agregar(): void {

    const body = {
      accion: "insertPersona",
      ci_persona: this.txt_cedula,
      nom_persona: this.txt_nombre,
      ape_persona: this.txt_apellido,
      correo_persona: this.txt_correo,
      clave_persona: this.txt_clave,
      fecha_nacimiento: this.txt_fechaNacimiento
    }

    console.log(body)
    this._accesoService.postData(body).subscribe((response: ResponseApi<IPersona>) => {
      if (response.status) {
        this._toastService.showToast(response.msg)
        this._navController.navigateRoot('/login')
      } else {
        this._toastService.showToast(response.msg)
      }
    })
  }
  editar() {
    const body = {
      accion: "updatePersona",
      cod_persona: this.txt_cod_persona,
      ci_persona: this.txt_cedula,
      nom_persona: this.txt_nombre,
      ape_persona: this.txt_apellido,
      correo_persona: this.txt_correo,
      clave_persona: this.txt_clave,
      fecha_nacimiento: this.txt_fechaNacimiento
    }
    console.log(body)
    this._accesoService.postData(body).subscribe((response: ResponseApi<IPersona>) => {
      if (response.status) {
        this._toastService.showToast(response.msg)
        this._navController.navigateRoot('/menu')
      } else {
        this._toastService.showToast(response.msg)
      }
    })
  }

  buscarPersona(cod_persona: string) {

    const body = {
      accion: "getPersonaById",
      cod_persona: cod_persona
    }
    this._accesoService.postData(body).subscribe((response: ResponseApi<IPersona>) => {
      if (response.status) {
        this.txt_cedula = response.data[0].ci_persona
        this.txt_apellido = response.data[0].ape_persona
        this.txt_correo = response.data[0].correo_persona
        this.txt_clave = response.data[0].clave_persona
        this.txt_nombre = response.data[0].nom_persona
        this.txt_fechaNacimiento = response.data[0].fecha_nacimiento
      }
      else {
        this._toastService.showToast(response.msg)
      }
    })
  }

}
