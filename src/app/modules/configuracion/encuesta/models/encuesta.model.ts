import { IEscala } from '../../escala/models/escala.model';

export interface IEncuesta {
  id: number;
  pregunta: string;
  escala_Id: number;
  categoria_Id: number;
  escala: IEscala;
}
