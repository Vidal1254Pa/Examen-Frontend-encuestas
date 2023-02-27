import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MsalGuard } from "@azure/msal-angular";
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { CategoriaComponent } from './modules/configuracion/categoria/categoria.component';
import { EscalaComponent } from './modules/configuracion/escala/escala.component';
import { ProvinciaComponent } from './modules/configuracion/provincia/provincia.component';
import { CiudadComponent } from './modules/configuracion/ciudad/ciudad.component';
import { SucursalComponent } from './modules/configuracion/sucursal/sucursal.component';
import { EncuestaComponent } from './modules/configuracion/encuesta/encuesta.component';
import { EncuestadoComponent } from './modules/configuracion/encuestado/encuestado.component';
import { NewencuestaComponent } from './modules/requerimiento/newencuesta/newencuesta.component';
const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        title: 'Dashboard',
      },
    ],
  },
  {
    path: 'configuracion',
    component: DefaultComponent,
    children: [
      {
        path: 'categoria',
        title: "Categoria",
        component: CategoriaComponent,
      },
      {
        path: 'escala',
        title: "Escala",
        component: EscalaComponent,
      },
      {
        path: 'provincia',
        title: "Provincia",
        component: ProvinciaComponent,
      },
      {
        path: 'ciudad',
        title: "Ciudad",
        component: CiudadComponent,
      },
      {
        path: 'sucursal',
        title: "Sucursal",
        component: SucursalComponent,
      },
      {
        path: 'encuesta',
        title: "Encuesta",
        component: EncuestaComponent,
      },
      {
        path: 'encuestado',
        title: "Encuestado",
        component: EncuestadoComponent,
      },
    ],
  },
  {
    path: 'requerimiento',
    component: DefaultComponent,
    children: [
      {
        path: 'newencuesta',
        title: "Nueva Encuesta",
        component: NewencuestaComponent,
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
