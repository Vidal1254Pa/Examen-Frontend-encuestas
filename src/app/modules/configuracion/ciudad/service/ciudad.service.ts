import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { OptionsPagination, ResponsePagination } from 'src/app/shared/models/pagination.models';
import { ICiudad } from '../models/ciudad.model';
import { ResponseServer } from 'src/app/shared/models/response';
@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  private url: string = '/api/v1/ciudad';

  constructor( private http: HttpClient ) { }

  Paginate(options: OptionsPagination): Observable<ResponsePagination<ICiudad>> {
    return this.http
      .get(
        `${this.url}/paginate?page=${options.page}&size=${options.size}&search=${options.search}&orderBy=${options.orderBy}&orderDir=${options.orderDir}`
      )
      .pipe(map((response) => <ResponsePagination<ICiudad>>response));
  }
  List() : Observable<ResponseServer<ICiudad>> {
    return this.http.get<ResponseServer<ICiudad>>( `${this.url}/list` );
  }

  Save( data: ICiudad ) : Observable<any> {
    return this.http.post<string>( this.url, data );
  }

  Delete( id: number ) : Observable<any> {
    return this.http.delete<string>( `${this.url}/${id}` );
  }

  Update( data: ICiudad, id: number ) : Observable<any> {
    return this.http.put<string>( `${this.url}/${id}`, data );
  }

  getById( id: number ) : Observable<ICiudad> {
    return this.http.get<ICiudad>( `${this.url}/getById/${id}` );
  }
}
