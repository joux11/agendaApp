import { Component } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { AccesoService } from '../services/acceso.service';
import { ResponseApi } from '../interfaces/response.interface';
import { ModalController, NavController } from '@ionic/angular';
import { ModalComponent } from './components/modal/modal.component';

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
  ) { }


  txtUser: string = ""
  txtPassword: string = ""

  login() {
    const body = {
      accion: "login",
      cedula: this.txtUser,
      password: this.txtPassword
    }
    this._accesoService.postData(body).subscribe((response: ResponseApi) => {
      if (response.status) {
        this._accesoService.createSession("cod_persona", response.data[0].cod_persona)
        this._toastService.showToast(response.msg)
        this._navController.navigateRoot('/menu')
      } else {
        this._toastService.showToast(response.msg)
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

}
