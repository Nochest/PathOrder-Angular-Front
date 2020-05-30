import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Canal } from 'src/app/_model/canal';
import { CanalService } from 'src/app/_service/canal.service';


@Component({
  selector: 'app-canal',
  templateUrl: './canal.component.html',
  styleUrls: ['./canal.component.css']
})
export class CanalComponent implements OnInit 
{
  dataSource: MatTableDataSource<Canal>;
	displayedColumns = ['id', 'nombre','descripcion', 'acciones'];

	constructor( private canalService: CanalService)  { }

	ngOnInit() {
		this.canalService.canalCambio.subscribe( data => {
			this.dataSource = new MatTableDataSource(data);
		});

		this.canalService.listar().subscribe(data=>{
			this.dataSource = new MatTableDataSource(data);
		});
	}

	applyFilter( filterValue: string ) {
		filterValue = filterValue.trim();
		filterValue = filterValue.toLowerCase();
		this.dataSource.filter = filterValue;
	}
	eliminar(id:number){
		this.canalService.eliminar(id).subscribe(
			data => {
			  this.canalService.listar().subscribe(Canals =>{
				this.canalService.canalCambio.next(Canals);
				this.canalService.mensajeCambio.next('Se Elimino');
			  })
			}
		  );
	}

}
