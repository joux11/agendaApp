import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { IPersona } from 'src/app/interfaces/personas.interface';
import { ResponseApi } from 'src/app/interfaces/response.interface';
import { AccesoService } from 'src/app/services/acceso.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login-fail-modal',
  templateUrl: './login-fail-modal.component.html',
  styleUrls: ['./login-fail-modal.component.scss'],
})
export class LoginFailModalComponent {
  txtFechaNacimiento: string = ""
  txtcedula: string = ""

  constructor(private _modalCotroller: ModalController, private _navParams: NavParams, private _accesoService: AccesoService, private _toastService: ToastService) {
    this.txtcedula = this._navParams.get("cedula")
  }


  cancelar() {
    this._modalCotroller.dismiss()
  }

  verificar() {

    //console.log(formatDate(this.txtFechaNacimiento, 'yyyy-MM-dd', 'en'))

    const body = {
      accion: "verificarUserbyFechaNacimiento",
      cedula: this.txtcedula,
      fechaNacimiento: formatDate(this.txtFechaNacimiento, 'yyyy-MM-dd', 'en')
    }
    console.log(body)
    this._accesoService.postData(body).subscribe((response: ResponseApi<IPersona>) => {

      if (response.status) {
        this._modalCotroller.dismiss(response.msg, 'verificado');
      } else {
        this._toastService.showToast(response.msg)
      }

    })
  }


}
