import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OptionsPagination, ResponsePagination } from 'src/app/shared/models/pagination.models';
import { HttpClient } from '@angular/common/http';
import { IEncuestaRealizada } from '../models/encuesta.model';
import { ResponseServer } from 'src/app/shared/models/response';
@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  private url: string = '/api/v1/create-encuesta';

  constructor( private http: HttpClient ) { }

  Paginate(options: OptionsPagination): Observable<ResponsePagination<IEncuestaRealizada>> {
    return this.http
      .get(
        `${this.url}/paginate?page=${options.page}&size=${options.size}&search=${options.search}&orderBy=${options.orderBy}&orderDir=${options.orderDir}`
      )
      .pipe(map((response) => <ResponsePagination<IEncuestaRealizada>>response));
  }

  Save( data: IEncuestaRealizada ) : Observable<any> {
    return this.http.post<string>( this.url, data );
  }

  Delete( id: number ) : Observable<any> {
    return this.http.delete<string>( `${this.url}/${id}` );
  }

  getById( id: number ) : Observable<IEncuestaRealizada> {
    return this.http.get<IEncuestaRealizada>( `${this.url}/getById/${id}` );
  }
}
