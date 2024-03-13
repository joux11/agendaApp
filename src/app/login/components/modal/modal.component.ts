
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { isEmpty } from 'rxjs';
import { ResponseApi } from 'src/app/interfaces/response.interface';
import { AccesoService } from 'src/app/services/acceso.service';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {

  txtCedula: string = "";
  txtPassword: string = "";
  cod_persona: string = ""

  isVerificado: boolean = false;

  constructor(
    private _modalCotroller: ModalController,
    private _accesoService: AccesoService,
    private _toastService: ToastService

  ) { }

  verificar() {
    const body = {
      accion: "verificarUser",
      cedula: this.txtCedula
    }
    this._accesoService.postData(body).subscribe((response: ResponseApi) => {

      if (response.status) {
        this.isVerificado = true;
        const { cod_persona } = response.data[0]
        this.cod_persona = cod_persona
        //this.changePassword()

      } else {
        this._modalCotroller.dismiss(response.msg, 'cancel');

      }
    })

  }

  changePassword() {
    const body = {
      accion: "resetPassword",
      cod_persona: this.cod_persona,
      password: this.txtPassword

    }
    if (this.txtPassword === "" || this.txtPassword == null) {

      this._toastService.showToast("Ingrese la contraseña")
      return;
    }


    this._accesoService.postData(body).subscribe((response: ResponseApi) => {

      if (response.status) {
        this._modalCotroller.dismiss(response.msg, 'verificar');
      } else {
        this._modalCotroller.dismiss(response.msg, 'cancel');
      }
    })
  }

  cancelar() {

  }


}
