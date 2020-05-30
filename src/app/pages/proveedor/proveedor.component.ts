import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Proveedor } from 'src/app/_model/proveedor';
import { ProveedorService } from 'src/app/_service/proveedor.service';


@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit 
{
  dataSource: MatTableDataSource<Proveedor>;
	displayedColumns = ['id', 'nombre','Ruc', 'acciones'];

	constructor( private proveedorService: ProveedorService)  { }

	ngOnInit() {
		this.proveedorService.proveedorCambio.subscribe( data => {
			this.dataSource = new MatTableDataSource(data);
		});

		this.proveedorService.listar().subscribe(data=>{
			this.dataSource = new MatTableDataSource(data);
		});
	}

	applyFilter( filterValue: string ) {
		filterValue = filterValue.trim();
		filterValue = filterValue.toLowerCase();
		this.dataSource.filter = filterValue;
	}
	eliminar(id:number){
		this.proveedorService.eliminar(id).subscribe(
			data => {
			  this.proveedorService.listar().subscribe(Proveedors =>{
				this.proveedorService.proveedorCambio.next(Proveedors);
				this.proveedorService.mensajeCambio.next('Se Elimino');
			  })
			}
		  );
	}

}
