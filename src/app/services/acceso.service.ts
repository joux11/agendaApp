import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Observable } from 'rxjs';
import { ResponseApi } from '../interfaces/response.interface';


@Injectable({
  providedIn: 'root'
})
export class AccesoService {

  url_Server: string = "http://localhost/WsAgenda24I/api/wsAgenda.php";

  constructor(
    public http: HttpClient
  ) { }

  postData(body: any): Observable<ResponseApi<any>> {
    let head = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    let options = {
      headers: head
    }
    return this.http.post<ResponseApi<any>>(this.url_Server, JSON.stringify(body), options);
  }


  async createSession(id: string, valor: string) {
    await Preferences.set({
      key: id,
      value: valor
    })
  }


  async closeSession(id: string) {
    await Preferences.remove({ key: id })
  }
  async clearSession() {
    await Preferences.clear()
  }

  async getSession(id: string) {
    const item = await Preferences.get({ key: id });
    return item.value
  }




}
