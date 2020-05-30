import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Tipodespacho } from 'src/app/_model/tipodespacho';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TipodespachoService } from 'src/app/_service/tipodespacho.service';

@Component({
  selector: 'app-tipodespacho-edicion',
  templateUrl: './tipodespacho-edicion.component.html',
  styleUrls: ['./tipodespacho-edicion.component.css']
})
export class TipodespachoEdicionComponent implements OnInit 
{

  id: number;
  form: FormGroup;
  edicion: boolean = false;
  tipodespacho: Tipodespacho;
  
  constructor(private route: ActivatedRoute, private router:Router,
    private tipodespachoService: TipodespachoService) {
    this.form=new FormGroup({
      'id':new FormControl(0),
      'nombre':new FormControl('')
    });
 }

  ngOnInit() {
    this.tipodespacho = new Tipodespacho();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      //cargar la data del servicio en el form
      this.tipodespachoService.listarTipodespachoPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.id),
          'nombre': new FormControl(data.nombre)
        });
      });
    }
  }

  operar(){
    this.tipodespacho.id=this.form.value['id'];
    this.tipodespacho.nombre=this.form.value['nombre'];

    if(this.edicion){
      this.tipodespachoService.modificar(this.tipodespacho.id, this.tipodespacho).subscribe(
        data=>{
          this.tipodespachoService.listar().subscribe(tipodespachos =>{
            this.tipodespachoService.tipodespachoCambio.next(tipodespachos);
            this.tipodespachoService.mensajeCambio.next('Se modificó');
          })
        }
      );

    }else{
      this.tipodespachoService.registrar(this.tipodespacho).subscribe(
        data=>{
          this.tipodespachoService.listar().subscribe(tipodespachos =>{
            this.tipodespachoService.tipodespachoCambio.next(tipodespachos);
            this.tipodespachoService.mensajeCambio.next('Se registró');
          })
        }
      );
    }
    this.router.navigate(['tipodespacho']);
  }

}
