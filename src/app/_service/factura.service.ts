import { Injectable } from '@angular/core';
import { HOST } from '../_shared/var.constant';
import { Factura } from '../_model/factura';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  // RUTA _ STS 
  url: string=`${HOST}/api/facturas`;
  FacturaCambio = new Subject<Factura[]>();
	mensajeCambio = new Subject<string>();
  constructor(private http: HttpClient) { }
  listar(){
		return this.http.get<Factura[]>(this.url);
	}

	listarFacturaPorId(id: number){
		return this.http.get<Factura>(`${this.url}/${id}`);
	}

	registrar(factura: Factura){
		return this.http.post(this.url,factura);
	}

	modificar(id:number, factura: Factura){
		return this.http.put(`${this.url}/${id}`,factura);
	}

	eliminar(id:number){
		return this.http.delete(`${this.url}/${id}`);
  }
}
