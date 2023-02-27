import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mercado } from '../modules/configuracion/mercado/models/mercado';

@Injectable({
  providedIn: 'root'
})
export class MercadoService {

  private url: string = '/api/v1/mercado';

  constructor( private http: HttpClient ) { }

  getMercado() : Observable<Mercado[]> {
    return this.http.get<Mercado[]>( `${this.url}/list` );
  }

  saveMercado( data: any ) : Observable<any> {
    return this.http.post<string>( this.url, data );
  }

  deleteMercado( id: number ) : Observable<any> {
    return this.http.delete<string>( `${this.url}/${id}` );
  }

  updateMercado( data: any, id: number ) : Observable<any> {
    return this.http.put<string>( `${this.url}/${id}`, data );
  }

  getById( id: number ) : Observable<any> {
    return this.http.get<any>( `${this.url}/getById/${id}` );
  }
}
