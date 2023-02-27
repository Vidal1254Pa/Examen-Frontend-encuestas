import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OptionsPagination, ResponsePagination } from 'src/app/shared/models/pagination.models';
import { HttpClient } from '@angular/common/http';
import { IProvincia } from '../models/provincia.model';
@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  private url: string = '/api/v1/provincia';

  constructor( private http: HttpClient ) { }

  Paginate(options: OptionsPagination): Observable<ResponsePagination<IProvincia>> {
    return this.http
      .get(
        `${this.url}/paginate?page=${options.page}&size=${options.size}&search=${options.search}&orderBy=${options.orderBy}&orderDir=${options.orderDir}`
      )
      .pipe(map((response) => <ResponsePagination<IProvincia>>response));
  }
  List() : Observable<IProvincia[]> {
    return this.http.get<IProvincia[]>( `${this.url}/list` );
  }

  Save( data: IProvincia ) : Observable<any> {
    return this.http.post<string>( this.url, data );
  }

  Delete( id: number ) : Observable<any> {
    return this.http.delete<string>( `${this.url}/${id}` );
  }

  Update( data: IProvincia, id: number ) : Observable<any> {
    return this.http.put<string>( `${this.url}/${id}`, data );
  }

  getById( id: number ) : Observable<IProvincia> {
    return this.http.get<IProvincia>( `${this.url}/getById/${id}` );
  }
}
