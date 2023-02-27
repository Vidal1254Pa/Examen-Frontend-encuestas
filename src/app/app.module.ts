import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MsalService, MSAL_INSTANCE } from '@azure/msal-angular';
import {
  IPublicClientApplication,
  PublicClientApplication,
} from '@azure/msal-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultModule } from './layouts/default/default.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeadersInterceptor } from './interceptors/headers.interceptor';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { environment } from 'src/environments/environment';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { CategoriaComponent } from './modules/configuracion/categoria/categoria.component';
import { EscalaComponent } from './modules/configuracion/escala/escala.component';
import { ProvinciaComponent } from './modules/configuracion/provincia/provincia.component';
import { CiudadComponent } from './modules/configuracion/ciudad/ciudad.component';
import { SucursalComponent } from './modules/configuracion/sucursal/sucursal.component';
import { EncuestaComponent } from './modules/configuracion/encuesta/encuesta.component';
import { EncuestadoComponent } from './modules/configuracion/encuestado/encuestado.component';
import { NewencuestaComponent } from './modules/requerimiento/newencuesta/newencuesta.component'

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.AZURE_CLIENT_ID,
      redirectUri: environment.AZURE_REDIRECT_URI,
      authority: `https://login.microsoftonline.com/${environment.AZURE_TENANT_ID}`,
    },
    cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: true,
    },
  });
}
@NgModule({
  declarations: [
    AppComponent,
    CategoriaComponent,
    EscalaComponent,
    ProvinciaComponent,
    CiudadComponent,
    SucursalComponent,
    EncuestaComponent,
    EncuestadoComponent,
    NewencuestaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DefaultModule,
    NgSelectModule,
    NgbModule,
    NgxMaskModule.forRoot(),
    InlineSVGModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    MsalService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true,
    },
    { provide: LocationStrategy, useClass: PathLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
