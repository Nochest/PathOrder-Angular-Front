import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Mercaderia } from 'src/app/_model/mercaderia';
import { MercaderiaService } from 'src/app/_service/mercaderia.service';


@Component({
  selector: 'app-mercaderia',
  templateUrl: './mercaderia.component.html',
  styleUrls: ['./mercaderia.component.css']
})
export class MercaderiaComponent implements OnInit 
{
  dataSource: MatTableDataSource<Mercaderia>;
	displayedColumns = ['id', 'descripcion', 'tipo','acciones'];

	constructor( private mercaderiaService: MercaderiaService)  { }

	ngOnInit() {
		this.mercaderiaService.mercaderiaCambio.subscribe( data => {
			this.dataSource = new MatTableDataSource(data);
		});

		this.mercaderiaService.listar().subscribe(data=>{
			this.dataSource = new MatTableDataSource(data);
		});
	}

	applyFilter( filterValue: string ) {
		filterValue = filterValue.trim();
		filterValue = filterValue.toLowerCase();
		this.dataSource.filter = filterValue;
	}
	eliminar(id:number){
		this.mercaderiaService.eliminar(id).subscribe(
			data => {
			  this.mercaderiaService.listar().subscribe(Mercaderias =>{
				this.mercaderiaService.mercaderiaCambio.next(Mercaderias);
				this.mercaderiaService.mensajeCambio.next('Se Elimino');
			  })
			}
		  );
	}

}
