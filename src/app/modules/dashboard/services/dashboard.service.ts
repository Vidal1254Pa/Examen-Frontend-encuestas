import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IItemDashboard } from '../models/itemDashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private url: string = "/api/v1/dashboard";
  constructor(private http: HttpClient) { }

  getCantidadDeInformePorEstado(): Observable<any> {
    return this.http.get(`${this.url}/CantidadDeInformePorEstado`);
  }

  getCantidadDeInforme(): Observable<any> {
    return this.http.get(`${this.url}/CantidadDeInforme`);
  }

  getCantidadDeInformeUltimosCuatroMesesAgrupados (): Observable<any> {
    return this.http.get(`${this.url}/CantidadDeInformeUltimosCuatroMesesAgrupados`);
  }

  getCantidadInformesPorUsuario (): Observable<any> {
    return this.http.get(`${this.url}/CantidadInformesPorUsuario`);
  }

  getCantidadTotalClientes(): Observable<any> {
    return this.http.get(`${this.url}/CantidadTotalClientes`);
  }
}
