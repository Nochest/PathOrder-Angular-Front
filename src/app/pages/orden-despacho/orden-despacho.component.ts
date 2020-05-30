import { Component, OnInit } from '@angular/core';
import { OrdenDespacho } from 'src/app/_model/orden-despacho';
import { MatTableDataSource } from '@angular/material';
import { OrdenDespachoService } from 'src/app/_service/orden-despacho.service';

@Component({
  selector: 'app-orden-despacho',
  templateUrl: './orden-despacho.component.html',
  styleUrls: ['./orden-despacho.component.css']
})
export class OrdenDespachoComponent implements OnInit {
  dataSource: MatTableDataSource<OrdenDespacho>;
	displayedColumns = ['id', 'numeroOrden', 'prioridad','AWB_BL','AWB_BL_Origen','origen','cantidadBultos'];
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
			  this.OrdenDespachoService.listar().subscribe(Mercaderias =>{
				this.OrdenDespachoService.OrdenDespachoCambio.next(Mercaderias);
				this.OrdenDespachoService.mensajeCambio.next('Se Elimino');
			  })
			}
		  );
	}
}
