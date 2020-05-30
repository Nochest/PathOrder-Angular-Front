import { Injectable } from '@angular/core';
import { HOST } from '../_shared/var.constant';
import { HttpClient } from '@angular/common/http';
import { Tipodespacho} from '../_model/tipodespacho';
import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class TipodespachoService {

  // RUTA _ STS 
  url: string=`${HOST}/api/tiposDespachos`;

  //Subject: Clase proviene de RXJS
	tipodespachoCambio = new Subject<Tipodespacho[]>();
	mensajeCambio = new Subject<string>();

  constructor(private http: HttpClient) { }

  listar(){
		return this.http.get<Tipodespacho[]>(this.url);
	}

	listarTipodespachoPorId(id: number){
		return this.http.get<Tipodespacho>(`${this.url}/${id}`);
	}

	registrar(Tipodespacho: Tipodespacho){
		return this.http.post(this.url,Tipodespacho);
	}

	modificar(id:number, Tipodespacho: Tipodespacho){
		return this.http.put(`${this.url}/${id}`,Tipodespacho);
	}

	eliminar(id:number){
		return this.http.delete(`${this.url}/${id}`);
  }
  
}
