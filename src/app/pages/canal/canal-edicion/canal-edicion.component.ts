import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Canal } from 'src/app/_model/canal';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CanalService } from 'src/app/_service/canal.service';

@Component({
  selector: 'app-canal-edicion',
  templateUrl: './canal-edicion.component.html',
  styleUrls: ['./canal-edicion.component.css']
})
export class CanalEdicionComponent implements OnInit 
{

  id: number;
  form: FormGroup;
  edicion: boolean = false;
  canal: Canal;
  
  constructor(private route: ActivatedRoute, private router:Router,
    private canalService: CanalService) {
    this.form=new FormGroup({
      'id':new FormControl(0),
      'nombre':new FormControl(''),
      'descripcion':new FormControl('')
    });
 }

  ngOnInit() {
    this.canal = new Canal();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      //cargar la data del servicio en el form
      this.canalService.listarCanalPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.id),
          'nombre': new FormControl(data.nombre),
          'descripcion': new FormControl(data.descripcion)
        });
      });
    }
  }

  operar(){
    this.canal.id=this.form.value['id'];
    this.canal.nombre=this.form.value['nombre'];
    this.canal.descripcion=this.form.value['descripcion'];

    if(this.edicion){
      this.canalService.modificar(this.canal.id, this.canal).subscribe(
        data=>{
          this.canalService.listar().subscribe(canals =>{
            this.canalService.canalCambio.next(canals);
            this.canalService.mensajeCambio.next('Se modificó');
          })
        }
      );

    }else{
      this.canalService.registrar(this.canal).subscribe(
        data=>{
          this.canalService.listar().subscribe(canals =>{
            this.canalService.canalCambio.next(canals);
            this.canalService.mensajeCambio.next('Se registró');
          })
        }
      );
    }
    this.router.navigate(['canal']);
  }

}
