import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Dam } from 'src/app/_model/dam';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DamService} from 'src/app/_service/dam.service';

@Component({
  selector: 'app-dam-edicion',
  templateUrl: './dam-edicion.component.html',
  styleUrls: ['./dam-edicion.component.css']
})
export class DamEdicionComponent implements OnInit 
{

  id: number;
  form: FormGroup;
  edicion: boolean = false;
  dam: Dam;
  
  constructor(private route: ActivatedRoute, private router:Router,
    private damService: DamService) {
    this.form=new FormGroup({
      'id':new FormControl(0),
      'descripcion':new FormControl(''),
      'Cif':new FormControl('')
    });
 }

  ngOnInit() {
    this.dam= new Dam();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      //cargar la data del servicio en el form
      this.damService.listarDamPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.id),
          'descripcion': new FormControl(data.descripcion),
          'Cif': new FormControl(data.Cif)
        });
      });
    }
  }

  operar(){
    this.dam.id=this.form.value['id'];
   
    this.dam.descripcion=this.form.value['descripcion'];
    this.dam.Cif=this.form.value['Cif'];

    if(this.edicion){
      this.damService.modificar(this.dam.id, this.dam).subscribe(
        data=>{
          this.damService.listar().subscribe(dams =>{
            this.damService.damCambio.next(dams);
            this.damService.mensajeCambio.next('Se modificó');
          })
        }
      );

    }else{
      this.damService.registrar(this.dam).subscribe(
        data=>{
          this.damService.listar().subscribe(dams =>{
            this.damService.damCambio.next(dams);
            this.damService.mensajeCambio.next('Se registró');
          })
        }
      );
    }
    this.router.navigate(['dam']);
  }

}
