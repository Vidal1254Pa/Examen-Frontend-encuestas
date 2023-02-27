export interface IItemDashboard {
    nombre?: string;
    cantidad?: number;
    id?:string;
  
  }
  export class ItemDashboard {
    nombre?: string;
    cantidad?: number;
    id?:string;
  
  }

  export const EstadoInforme = {
    Enborrador: {
      text:'En borrador',
      color:'#F9C924'
    },
    PendienteDeAprobación: {
      text:'Pendiente de aprobación',
      color:'#24D2F9'
    },
    AprobadoPorAsistenteDeEquipo: {
      text:'Aprobado por Asistente de Equipo',
      color:'#335BFF'
    },    
    RechazadoPorAsistenteDeEquipo: {
      text:'Rechazado por Asistente de Equipo',
      color:'#F95E24'
    },    
    AprobadoPorSupervisorDeServicios: {
      text:'Aprobado por Supervisor de Servicios',
      color:'#5973DA'
    },
    RechazadoPorSupervisorDeServicios: {
      text:'Rechazado por Supervisor de Servicios',
      color:'#F95E24'
    },
    AprobadoCoordinadorDañosMermas: {
      text:'Aprobado por Analista o Coordinador de Daños y Mermas',
      color:'#8A99D5'
    },
    RechazadoCoordinadorDañosMermas: {
      text:'Rechazado por Analista o Coordinador de Daños y Mermas',
      color:'#F95E24'
    },
    RecepcionadoPorCliente: {
      text:'Recepcionado por cliente',
      color:'#5EF924'
    },
  };