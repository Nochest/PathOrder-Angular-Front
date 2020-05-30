import { Injectable } from '@angular/core';
import { HOST } from '../_shared/var.constant';
import { HttpClient } from '@angular/common/http';
import { Dam} from '../_model/dam';
import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DamService {

  // RUTA _ STS 
  url: string=`${HOST}/api/dams`;

  //Subject: Clase proviene de RXJS
	damCambio = new Subject<Dam[]>();
	mensajeCambio = new Subject<string>();

  constructor(private http: HttpClient) { }

  listar(){
		return this.http.get<Dam[]>(this.url);
	}

	listarDamPorId(id: number){
		return this.http.get<Dam>(`${this.url}/${id}`);
	}

	registrar(Dam: Dam){
		return this.http.post(this.url,Dam);
	}

	modificar(id:number, dam: Dam){
		return this.http.put(`${this.url}/${id}`,dam);
	}

	eliminar(id:number){
		return this.http.delete(`${this.url}/${id}`);
  }
  
}
