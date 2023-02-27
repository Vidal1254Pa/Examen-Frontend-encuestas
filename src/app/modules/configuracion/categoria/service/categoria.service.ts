import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OptionsPagination, ResponsePagination } from 'src/app/shared/models/pagination.models';
import { ICategoria } from '../models/categoria.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private url: string = '/api/v1/categoria';

  constructor( private http: HttpClient ) { }

  Paginate(options: OptionsPagination): Observable<ResponsePagination<ICategoria>> {
    return this.http
      .get(
        `${this.url}/paginate?page=${options.page}&size=${options.size}&search=${options.search}&orderBy=${options.orderBy}&orderDir=${options.orderDir}`
      )
      .pipe(map((response) => <ResponsePagination<ICategoria>>response));
  }
  List() : Observable<ICategoria[]> {
    return this.http.get<ICategoria[]>( `${this.url}/list` );
  }

  Save( data: ICategoria ) : Observable<any> {
    return this.http.post<string>( this.url, data );
  }

  Delete( id: number ) : Observable<any> {
    return this.http.delete<string>( `${this.url}/${id}` );
  }

  Update( data: ICategoria, id: number ) : Observable<any> {
    return this.http.put<string>( `${this.url}/${id}`, data );
  }

  getById( id: number ) : Observable<ICategoria> {
    return this.http.get<ICategoria>( `${this.url}/getById/${id}` );
  }
}
