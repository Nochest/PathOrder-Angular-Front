import { Injectable } from '@angular/core';
import { HOST } from '../_shared/var.constant';
import { HttpClient } from '@angular/common/http';
import { Proveedor} from '../_model/proveedor';
import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  // RUTA _ STS 
  url: string=`${HOST}/api/proveedores`;

  //Subject: Clase proviene de RXJS
	proveedorCambio = new Subject<Proveedor[]>();
	mensajeCambio = new Subject<string>();

  constructor(private http: HttpClient) { }

  listar(){
		return this.http.get<Proveedor[]>(this.url);
	}

	listarProveedorPorId(id: number){
		return this.http.get<Proveedor>(`${this.url}/${id}`);
	}

	registrar(Proveedor: Proveedor){
		return this.http.post(this.url,Proveedor);
	}

	modificar(id:number, Proveedor: Proveedor){
		return this.http.put(`${this.url}/${id}`,Proveedor);
	}

	eliminar(id:number){
		return this.http.delete(`${this.url}/${id}`);
  }
  
}
