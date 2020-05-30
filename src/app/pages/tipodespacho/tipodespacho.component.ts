import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Tipodespacho } from 'src/app/_model/tipodespacho';
import { TipodespachoService } from 'src/app/_service/tipodespacho.service';


@Component({
  selector: 'app-tipodespacho',
  templateUrl: './tipodespacho.component.html',
  styleUrls: ['./tipodespacho.component.css']
})
export class TipodespachoComponent implements OnInit 
{
  dataSource: MatTableDataSource<Tipodespacho>;
	displayedColumns = ['id', 'nombre', 'acciones'];

	constructor( private tipodespachoService: TipodespachoService)  { }

	ngOnInit() {
		this.tipodespachoService.tipodespachoCambio.subscribe( data => {
			this.dataSource = new MatTableDataSource(data);
		});

		this.tipodespachoService.listar().subscribe(data=>{
			this.dataSource = new MatTableDataSource(data);
		});
	}

	applyFilter( filterValue: string ) {
		filterValue = filterValue.trim();
		filterValue = filterValue.toLowerCase();
		this.dataSource.filter = filterValue;
	}
	eliminar(id:number){
		this.tipodespachoService.eliminar(id).subscribe(
			data => {
			  this.tipodespachoService.listar().subscribe(Tipodespachos =>{
				this.tipodespachoService.tipodespachoCambio.next(Tipodespachos);
				this.tipodespachoService.mensajeCambio.next('Se Elimino');
			  })
			}
		  );
	}

}
