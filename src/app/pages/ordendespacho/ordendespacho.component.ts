import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { OrdenDespacho } from 'src/app/_model/ordendespacho';
import { OrdenDespachoService } from 'src/app/_service/ordendespacho.service';

@Component({
  selector: 'app-ordendespacho',
  templateUrl: './ordendespacho.component.html',
  styleUrls: ['./ordendespacho.component.css']
})
export class OrdenDespachoComponent implements OnInit 
{
  dataSource: MatTableDataSource<OrdenDespacho>;
	displayedColumns = ['id', 'numeroOrden', 'prioridad','origen', 'cantidadBultos', 'observacion', 'acciones'];
  constructor(private OrdenDespachoService: OrdenDespachoService) { }

  ngOnInit() {
    this.OrdenDespachoService.OrdenDespachoCambio.subscribe( data => {
			this.dataSource = new MatTableDataSource(data);
		});

		this.OrdenDespachoService.listar().subscribe(data=>{
			this.dataSource = new MatTableDataSource(data);
		});
  }
  applyFilter( filterValue: string ) {
		filterValue = filterValue.trim();
		filterValue = filterValue.toLowerCase();
		this.dataSource.filter = filterValue;
  }
  eliminar(id:number){
		this.OrdenDespachoService.eliminar(id).subscribe(
			data => {
			  this.OrdenDespachoService.listar().subscribe(Ordenes =>{
				this.OrdenDespachoService.OrdenDespachoCambio.next(Ordenes);
				this.OrdenDespachoService.mensajeCambio.next('Se Elimino');
			  })
			}
		  );
	}
}
