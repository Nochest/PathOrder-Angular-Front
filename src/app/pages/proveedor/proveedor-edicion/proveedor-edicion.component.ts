import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Proveedor } from 'src/app/_model/proveedor';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ProveedorService } from 'src/app/_service/proveedor.service';

@Component({
  selector: 'app-proveedor-edicion',
  templateUrl: './proveedor-edicion.component.html',
  styleUrls: ['./proveedor-edicion.component.css']
})
export class ProveedorEdicionComponent implements OnInit 
{

  id: number;
  form: FormGroup;
  edicion: boolean = false;
  proveedor: Proveedor;
  
  constructor(private route: ActivatedRoute, private router:Router,
    private proveedorService: ProveedorService) {
    this.form=new FormGroup({
      'id':new FormControl(0),
      'nombre':new FormControl(''),
      'Ruc':new FormControl('')
    });
 }

  ngOnInit() {
    this.proveedor = new Proveedor();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      //cargar la data del servicio en el form
      this.proveedorService.listarProveedorPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.id),
          'nombre': new FormControl(data.nombre),
          'Ruc': new FormControl(data.Ruc)
        });
      });
    }
  }

  operar(){
    this.proveedor.id=this.form.value['id'];
    this.proveedor.nombre=this.form.value['nombre'];
    this.proveedor.Ruc=this.form.value['Ruc'];

    if(this.edicion){
      this.proveedorService.modificar(this.proveedor.id, this.proveedor).subscribe(
        data=>{
          this.proveedorService.listar().subscribe(proveedors =>{
            this.proveedorService.proveedorCambio.next(proveedors);
            this.proveedorService.mensajeCambio.next('Se modificó');
          })
        }
      );

    }else{
      this.proveedorService.registrar(this.proveedor).subscribe(
        data=>{
          this.proveedorService.listar().subscribe(proveedors =>{
            this.proveedorService.proveedorCambio.next(proveedors);
            this.proveedorService.mensajeCambio.next('Se registró');
          })
        }
      );
    }
    this.router.navigate(['proveedor']);
  }

}
