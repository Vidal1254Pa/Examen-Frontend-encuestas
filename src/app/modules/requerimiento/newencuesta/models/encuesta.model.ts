export interface IEncuestaRealizada {
  id?: number;
  encuestado_Id: string;
  encuestado_Nombre?: string;
  sucursal_Id: number;
  sucursal_Nombre?: string;
  fecha_Realizada?: string;
  detalleEncuestas:IEncuestaDetalle[]
}
export interface IEncuestaDetalle {
  encuestaRealizada_Id?: number;
  encuesta_Id: number;
  respuesta: string;
}
