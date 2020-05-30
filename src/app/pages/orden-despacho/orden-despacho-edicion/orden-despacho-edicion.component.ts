import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { OrdenDespacho } from 'src/app/_model/orden-despacho';
import { OrdenDespachoService } from 'src/app/_service/orden-despacho.service';

@Component({
  selector:'app-ordenDespacho-edicion',
  templateUrl: './orden-despacho-edicion.component.html',
  styleUrls: ['./orden-despacho-edicion.component.css']
})
export class OrdenDespachoEdicionComponent implements OnInit 
{
  id: number;
  form: FormGroup;
  edicion: boolean = false;
OrdenDespacho: OrdenDespacho;
  constructor(private route: ActivatedRoute, private router:Router,
    private OrdenDesachoService: OrdenDespachoService) {
    this.form=new FormGroup({
      'id':new FormControl(0),
      'numeroOrden':new FormControl(''),
      'prioridad':new FormControl(''),
      'AWB_BL':new FormControl(''),
      'AWB_BL_Origen':new FormControl(''),
      'origen':new FormControl(''),
      'cantidadSeries':new FormControl(0),
      'cantidadBultos':new FormControl(0)
    }
    );
 }

  ngOnInit() {
    this.OrdenDespacho = new OrdenDespacho();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      //cargar la data del servicio en el form
      this.OrdenDesachoService.listarOrdenDeDespachoPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.id),
          'numeroOrden': new FormControl(data.numeroOrden),
          'prioridad': new FormControl(data.prioridad),
          'AWB_BL': new FormControl(data.AWB_BL),
          'AWB_BL_Origen': new FormControl(data.AWB_BL_Origen),
          'origen': new FormControl(data.origen),
          'cantidadSeries': new FormControl(data.cantidadSeries),
          'cantidadBultos': new FormControl(data.cantidadBultos)
        });
      });
    }
  }

  operar(){
    this.OrdenDespacho.id=this.form.value['id'];
    this.OrdenDespacho.numeroOrden=this.form.value['numeroOrden'];
    this.OrdenDespacho.prioridad=this.form.value['prioridad'];
    this.OrdenDespacho.AWB_BL=this.form.value['AWB_BL'];
    this.OrdenDespacho.AWB_BL_Origen=this.form.value['AWB_BL_Origen'];
    this.OrdenDespacho.origen=this.form.value['origen'];
    this.OrdenDespacho.cantidadSeries=this.form.value['cantidadSeries'];
    this.OrdenDespacho.cantidadBultos=this.form.value['cantidadBultos'];


    if(this.edicion){
      this.OrdenDesachoService.modificar(this.OrdenDespacho.id, this.OrdenDespacho).subscribe(
        data=>{
          this.OrdenDesachoService.listar().subscribe(canals =>{
            this.OrdenDesachoService.OrdenDespachoCambio.next(canals);
            this.OrdenDesachoService.mensajeCambio.next('Se modificó');
          })
        }
      );

    }else{
      this.OrdenDesachoService.registrar(this.OrdenDespacho).subscribe(
        data=>{
          this.OrdenDesachoService.listar().subscribe(canals =>{
            this.OrdenDesachoService.OrdenDespachoCambio.next(canals);
            this.OrdenDesachoService.mensajeCambio.next('Se registró');
          })
        }
      );
    }
    this.router.navigate(['OrdenDespacho']);
  }

}
