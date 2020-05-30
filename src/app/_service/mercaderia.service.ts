import { Injectable } from '@angular/core';
import { HOST } from '../_shared/var.constant';
import { HttpClient } from '@angular/common/http';
import { Mercaderia} from '../_model/mercaderia';
import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class MercaderiaService {

  // RUTA _ STS 
  url: string=`${HOST}/api/mercaderias`;

  //Subject: Clase proviene de RXJS
	mercaderiaCambio = new Subject<Mercaderia[]>();
	mensajeCambio = new Subject<string>();

  constructor(private http: HttpClient) { }

  listar(){
		return this.http.get<Mercaderia[]>(this.url);
	}

	listarMercaderiaPorId(id: number){
		return this.http.get<Mercaderia>(`${this.url}/${id}`);
	}

	registrar(Mercaderia: Mercaderia){
		return this.http.post(this.url,Mercaderia);
	}

	modificar(id:number, Mercaderia: Mercaderia){
		return this.http.put(`${this.url}/${id}`,Mercaderia);
	}

	eliminar(id:number){
		return this.http.delete(`${this.url}/${id}`);
  }
  
}
