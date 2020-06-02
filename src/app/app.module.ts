import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { FacturasComponent } from './pages/facturas/facturas.component';
import { FacturasEdicionComponent } from './pages/facturas/facturas-edicion/facturas-edicion.component';




@NgModule({
  declarations: [
    AppComponent,
    CanalComponent,
    CanalEdicionComponent,
    TipodespachoComponent,
    TipodespachoEdicionComponent,
    DamComponent,
    DamEdicionComponent,
    ProveedorComponent,
    ProveedorEdicionComponent,
    MercaderiaComponent,
    MercaderiaEdicionComponent,
    OrdenDespachoComponent,
    OrdenDespachoEdicionComponent,
    FacturasComponent,
    FacturasEdicionComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,   // Agregar para el Material Design
    HttpClientModule, // Agregar para la conexion
    FormsModule,      // Agregar para los formualarios
    ReactiveFormsModule // Agregar para los Formularios reactivos
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
