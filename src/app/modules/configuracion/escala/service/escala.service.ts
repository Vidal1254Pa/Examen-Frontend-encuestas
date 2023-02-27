import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OptionsPagination, ResponsePagination } from 'src/app/shared/models/pagination.models';
import { map } from 'rxjs/operators';
import { IEscala } from '../models/escala.model';
@Injectable({
  providedIn: 'root'
})
export class EscalaService {

  private url: string = '/api/v1/escala';

  constructor( private http: HttpClient ) { }

  Paginate(options: OptionsPagination): Observable<ResponsePagination<IEscala>> {
    return this.http
      .get(
        `${this.url}/paginate?page=${options.page}&size=${options.size}&search=${options.search}&orderBy=${options.orderBy}&orderDir=${options.orderDir}`
      )
      .pipe(map((response) => <ResponsePagination<IEscala>>response));
  }
  List() : Observable<IEscala[]> {
    return this.http.get<IEscala[]>( `${this.url}/list` );
  }

  Save( data: IEscala ) : Observable<any> {
    return this.http.post<string>( this.url, data );
  }

  Delete( id: number ) : Observable<any> {
    return this.http.delete<string>( `${this.url}/${id}` );
  }

  Update( data: IEscala, id: number ) : Observable<any> {
    return this.http.put<string>( `${this.url}/${id}`, data );
  }

  getById( id: number ) : Observable<IEscala> {
    return this.http.get<IEscala>( `${this.url}/getById/${id}` );
  }
}
