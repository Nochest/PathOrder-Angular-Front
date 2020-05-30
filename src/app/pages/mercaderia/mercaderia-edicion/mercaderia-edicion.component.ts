import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Mercaderia } from 'src/app/_model/mercaderia';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MercaderiaService } from 'src/app/_service/mercaderia.service';

@Component({
  selector: 'app-mercaderia-edicion',
  templateUrl: './mercaderia-edicion.component.html',
  styleUrls: ['./mercaderia-edicion.component.css']
})
export class MercaderiaEdicionComponent implements OnInit 
{

  id: number;
  form: FormGroup;
  edicion: boolean = false;
  mercaderia: Mercaderia;
  
  constructor(private route: ActivatedRoute, private router:Router,
    private mercaderiaService: MercaderiaService) {
    this.form=new FormGroup({
      'id':new FormControl(0),
      'descripcion':new FormControl(''),
      'tipo':new FormControl('')
    });
 }

  ngOnInit() {
    this.mercaderia = new Mercaderia();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      //cargar la data del servicio en el form
      this.mercaderiaService.listarMercaderiaPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.id),
          'descripcion': new FormControl(data.descripcion),
          'tipo': new FormControl(data.tipo)
        });
      });
    }
  }

  operar(){
    this.mercaderia.id=this.form.value['id'];
    this.mercaderia.descripcion=this.form.value['descripcion'];
    this.mercaderia.tipo=this.form.value['tipo'];

    if(this.edicion){
      this.mercaderiaService.modificar(this.mercaderia.id, this.mercaderia).subscribe(
        data=>{
          this.mercaderiaService.listar().subscribe(mercaderias =>{
            this.mercaderiaService.mercaderiaCambio.next(mercaderias);
            this.mercaderiaService.mensajeCambio.next('Se modificó');
          })
        }
      );

    }else{
      this.mercaderiaService.registrar(this.mercaderia).subscribe(
        data=>{
          this.mercaderiaService.listar().subscribe(mercaderias =>{
            this.mercaderiaService.mercaderiaCambio.next(mercaderias);
            this.mercaderiaService.mensajeCambio.next('Se registró');
          })
        }
      );
    }
    this.router.navigate(['mercaderia']);
  }

}
