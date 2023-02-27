export interface ResponseServer<T> {
  data: T[] | T;
  detalle: string;
  errores: any;
  id: string;
  satisfactorio: boolean;
  titulo: string;
}
