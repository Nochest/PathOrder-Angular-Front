import { Injectable } from '@angular/core';
import { HOST } from '../_shared/var.constant';
import {OrdenDespacho} from '../_model/orden-despacho';
import { HttpClient } from '@angular/common/http';
import { Subject, from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrdenDespachoService {
  // RUTA _ STS 
  url: string=`${HOST}/api/ordenes`;
  //Subject: Clase proviene de RXJS
	OrdenDespachoCambio = new Subject<OrdenDespacho[]>();
	mensajeCambio = new Subject<string>();
  constructor(private http: HttpClient) { }

    listar(){
      return this.http.get<OrdenDespacho[]>(this.url);
    }

    listarOrdenDeDespachoPorId(id: number){
      return this.http.get<OrdenDespacho>(`${this.url}/${id}`);
    }
  
    registrar(ordenDespacho: OrdenDespacho){
      return this.http.post(this.url,ordenDespacho);
    }
  
    modificar(id:number, ordenDespacho: OrdenDespacho){
      return this.http.put(`${this.url}/${id}`,ordenDespacho);
    }
  
    eliminar(id:number){
      return this.http.delete(`${this.url}/${id}`);
    }

}
