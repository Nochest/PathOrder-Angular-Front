import { Component, OnInit } from '@angular/core';
import { Factura } from 'src/app/_model/factura';
import { FacturaService } from 'src/app/_service/factura.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {
  dataSource: MatTableDataSource<Factura>;
	displayedColumns = ['id','numFactura','descrpicion','unidad','Fecha'];

  constructor(private FacturasService: FacturaService) { }

  ngOnInit() {
    this.FacturasService.FacturaCambio.subscribe( data => {
			this.dataSource = new MatTableDataSource(data);
		});

		this.FacturasService.listar().subscribe(data=>{
			this.dataSource = new MatTableDataSource(data);
		});
  }

}
