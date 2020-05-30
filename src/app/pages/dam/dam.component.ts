import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Dam } from 'src/app/_model/dam';
import { DamService} from 'src/app/_service/dam.service';


@Component({
  selector: 'app-dam',
  templateUrl: './dam.component.html',
  styleUrls: ['./dam.component.css']
})
export class DamComponent implements OnInit 
{
  dataSource: MatTableDataSource<Dam>;
	displayedColumns = ['id','descripcion', 'Cif', 'acciones'];

	constructor( private damService: DamService)  { }

	ngOnInit() {
		this.damService.damCambio.subscribe( data => {
			this.dataSource = new MatTableDataSource(data);
		});

		this.damService.listar().subscribe(data=>{
			this.dataSource = new MatTableDataSource(data);
		});
	}

	applyFilter( filterValue: string ) {
		filterValue = filterValue.trim();
		filterValue = filterValue.toLowerCase();
		this.dataSource.filter = filterValue;
	}
	eliminar(id:number){
		this.damService.eliminar(id).subscribe(
			data => {
			  this.damService.listar().subscribe(Dams =>{
				this.damService.damCambio.next(Dams);
				this.damService.mensajeCambio.next('Se Elimino');
			  })
			}
		  );
	}

}
