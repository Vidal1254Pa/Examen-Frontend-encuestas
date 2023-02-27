import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OptionsPagination, ResponsePagination } from 'src/app/shared/models/pagination.models';
import { HttpClient } from '@angular/common/http';
import { IEncuestado } from '../models/encuestado.model';
import { ResponseServer } from 'src/app/shared/models/response';
@Injectable({
  providedIn: 'root'
})
export class EncuestadoService {
  private url: string = '/api/v1/encuestado';

  constructor( private http: HttpClient ) { }

  Paginate(options: OptionsPagination): Observable<ResponsePagination<IEncuestado>> {
    return this.http
      .get(
        `${this.url}/paginate?page=${options.page}&size=${options.size}&search=${options.search}&orderBy=${options.orderBy}&orderDir=${options.orderDir}`
      )
      .pipe(map((response) => <ResponsePagination<IEncuestado>>response));
  }
  List() : Observable<ResponseServer<IEncuestado>> {
    return this.http.get<ResponseServer<IEncuestado>>( `${this.url}/list` );
  }

  Save( data: IEncuestado ) : Observable<any> {
    return this.http.post<string>( this.url, data );
  }

  Delete( id: string ) : Observable<any> {
    return this.http.delete<string>( `${this.url}/${id}` );
  }

  Update( data: IEncuestado, id: string ) : Observable<any> {
    return this.http.put<string>( `${this.url}/${id}`, data );
  }

  getById( id: string ) : Observable<IEncuestado> {
    return this.http.get<IEncuestado>( `${this.url}/getById/${id}` );
  }
}
