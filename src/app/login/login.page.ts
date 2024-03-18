import { Component } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { AccesoService } from '../services/acceso.service';
import { ResponseApi } from '../interfaces/response.interface';
import { ModalController, NavController } from '@ionic/angular';
import { ModalComponent } from './components/modal/modal.component';
import { IPersona } from '../interfaces/personas.interface';
import { LoginFailModalComponent } from './components/login-fail-modal/login-fail-modal.component';
import { IonModal } from '@ionic/angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(
    private _toastService: ToastService,
    private _accesoService: AccesoService,
    private _modalControl: ModalController,
    private _navController: NavController
  ) {

  }


  txtUser: string = ""
  txtPassword: string = ""

  intentos: number = 0;



  login() {
    const body = {
      accion: "login",
      cedula: this.txtUser,
      password: this.txtPassword
    }


    this._accesoService.postData(body).subscribe((response: ResponseApi<IPersona>) => {
      if (response.status) {


        const { cod_persona } = response.data[0]

        this._accesoService.createSession("cod_persona", cod_persona)
        this._toastService.showToast(response.msg)
        this._navController.navigateRoot('/menu')
        this.intentos = 0
      } else {

        if (response.errors) {
          this._toastService.showToast(`${response.msg}`)
          this.verificarFechaNacimiento(this.txtUser)

        } else {

          if (response.validation) {
            this._toastService.showToast(`${response.msg}`)

          } else {
            if (this.intentos == 3) {
              this.verificarFechaNacimiento(this.txtUser)
              this.updateEstado("0")
              this.intentos = 0

            } else {
              this.intentos++
              this._toastService.showToast(`${response.msg} Intentos: ${this.intentos}`)

            }
          }

        }


      }
    })

  }

  async abrirModal() {
    const modal = await this._modalControl.create({
      component: ModalComponent,
    })
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'verificar') {
      this._toastService.showToast(data)
    }
    if (role === "cancel") {
      this._toastService.showToast(data)
    }

  }

  async verificarFechaNacimiento(cedula: string) {
    const modal = await this._modalControl.create({
      component: LoginFailModalComponent,
      componentProps: {
        cedula: cedula
      }
    })
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'verificado') {
      this._toastService.showToast(data)
      this.updateEstado("1")
    }
  }

  updateEstado(estado: string) {
    const body = {
      accion: "updateEstado",
      cedula: this.txtUser,
      estado: estado

    }

    this._accesoService.postData(body).subscribe((response: ResponseApi<IPersona>) => {

      if (response.status) {

        //this._toastService.showToast(`${response.msg}`)

      }
    })
  }

  registrarse() {
    this._navController.navigateRoot('/perfil')
  }

}
