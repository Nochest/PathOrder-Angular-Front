import { Injectable } from '@angular/core';
import { HOST } from '../_shared/var.constant';
import { HttpClient } from '@angular/common/http';
import { Canal} from '../_model/canal';
import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CanalService {

  // RUTA _ STS 
  url: string=`${HOST}/api/canales`;

  //Subject: Clase proviene de RXJS
	canalCambio = new Subject<Canal[]>();
	mensajeCambio = new Subject<string>();

  constructor(private http: HttpClient) { }

  listar(){
		return this.http.get<Canal[]>(this.url);
	}

	listarCanalPorId(id: number){
		return this.http.get<Canal>(`${this.url}/${id}`);
	}

	registrar(Canal: Canal){
		return this.http.post(this.url,Canal);
	}

	modificar(id:number, Canal: Canal){
		return this.http.put(`${this.url}/${id}`,Canal);
	}

	eliminar(id:number){
		return this.http.delete(`${this.url}/${id}`);
  }
  
}
