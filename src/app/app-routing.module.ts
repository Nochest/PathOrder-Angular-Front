import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanalComponent } from './pages/canal/canal.component';
import { CanalEdicionComponent } from './pages/canal/canal-edicion/canal-edicion.component';

import { TipodespachoComponent } from './pages/tipodespacho/tipodespacho.component';
import { TipodespachoEdicionComponent } from './pages/tipodespacho/tipodespacho-edicion/tipodespacho-edicion.component';
import { DamComponent } from './pages/dam/dam.component';
import { DamEdicionComponent } from './pages/dam/dam-edicion/dam-edicion.component';
import { ProveedorComponent } from './pages/proveedor/proveedor.component';
import { ProveedorEdicionComponent } from './pages/proveedor/proveedor-edicion/proveedor-edicion.component';
import { MercaderiaComponent } from './pages/mercaderia/mercaderia.component';
import { MercaderiaEdicionComponent } from './pages/mercaderia/mercaderia-edicion/mercaderia-edicion.component';
import { OrdenDespachoComponent } from './pages/ordendespacho/ordendespacho.component';
import { OrdenDespachoEdicionComponent } from './pages/ordendespacho/ordendespacho-edicion/ordendespacho-edicion.component';



const routes: Routes = [

{path:'canal', component:CanalComponent, children:[
  {path:'nuevo', component:CanalEdicionComponent},
  {path:'edicion/:id', component:CanalEdicionComponent}
]},
{path:'tipodespacho', component:TipodespachoComponent, children:[
  {path:'nuevo', component:TipodespachoEdicionComponent},
  {path:'edicion/:id', component:TipodespachoEdicionComponent}
]},
{path:'dam', component:DamComponent, children:[
  {path:'nuevo', component:DamEdicionComponent},
  {path:'edicion/:id', component:DamEdicionComponent}
]},
{path:'proveedor', component:ProveedorComponent, children:[
  {path:'nuevo', component:ProveedorEdicionComponent},
  {path:'edicion/:id', component:ProveedorEdicionComponent}
]},
{path:'mercaderia', component:MercaderiaComponent, children:[
  {path:'nuevo', component:MercaderiaEdicionComponent},
  {path:'edicion/:id', component:MercaderiaEdicionComponent}
]},
{path:'ordendespacho', component:OrdenDespachoComponent, children:[
  {path:'nuevo', component:OrdenDespachoEdicionComponent},
  {path:'edicion/:id', component:OrdenDespachoEdicionComponent}
]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
