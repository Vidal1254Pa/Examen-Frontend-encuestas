import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { OptionsPagination, ResponsePagination } from 'src/app/shared/models/pagination.models';
import { HttpClient } from '@angular/common/http';
import { IEncuesta } from '../models/encuesta.model';
import { ResponseServer } from 'src/app/shared/models/response';
@Injectable({
  providedIn: 'root'
})
export class EncuestaPreguntasService {
  private url: string = '/api/v1/encuesta';

  constructor( private http: HttpClient ) { }

  Paginate(options: OptionsPagination): Observable<ResponsePagination<IEncuesta>> {
    return this.http
      .get(
        `${this.url}/paginate?page=${options.page}&size=${options.size}&search=${options.search}&orderBy=${options.orderBy}&orderDir=${options.orderDir}`
      )
      .pipe(map((response) => <ResponsePagination<IEncuesta>>response));
  }
  List() : Observable<ResponseServer<IEncuesta>> {
    return this.http.get<ResponseServer<IEncuesta>>( `${this.url}/list` );
  }

  Save( data: IEncuesta ) : Observable<any> {
    return this.http.post<string>( this.url, data );
  }

  Delete( id: number ) : Observable<any> {
    return this.http.delete<string>( `${this.url}/${id}` );
  }

  Update( data: IEncuesta, id: number ) : Observable<any> {
    return this.http.put<string>( `${this.url}/${id}`, data );
  }

  getById( id: number ) : Observable<IEncuesta> {
    return this.http.get<IEncuesta>( `${this.url}/getById/${id}` );
  }
}
