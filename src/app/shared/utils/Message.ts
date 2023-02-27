import * as toastr from 'toastr';
import Swal from "sweetalert2";

export class Message {

  static async mostrarErrorServidor (reason: any) {
    const mensaje = await this.getDisplayError(reason);
    this.showErrorNotification(mensaje);
  }

  static mostrarErrorSimpleServidor(reason:any) {
    var mensajeError = '';
    reason.error.errores.Detalle.forEach(resp =>{
      mensajeError = mensajeError + resp + '\n';
    })

    const mensaje = {
      titulo:mensajeError,
      detalle: reason.error.titulo
    }

    return this.showErrorNotification(mensaje);
  }

  static showErrorNotification = (mensaje) => {
    toastr.error(mensaje.detalle, mensaje.titulo);
  }

  static mostrarProcesando() {
    Swal.fire({
      text: "Espere un momento... procesando",
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    })
  }

  static ocultarProcesando() {
    Swal.close();
  }

  static async getDisplayError(reason: any) {

    let bodyJSON = null;

    try {
      bodyJSON = await reason.error;
    } catch (error) {
      console.log('error: ', error);
    }

    const detalleMensaje = {
      titulo: 'Sucedió un error inesperado',
      detalle: 'Contacte con el área responsable de la aplicación',
    };

    if ( bodyJSON ) {
      let msgGlobal = '';

      if ( bodyJSON.errors && !bodyJSON.status) {
        const errorKeys = Object.keys(bodyJSON.errors);

        if ( errorKeys.length > 0 ) {
          errorKeys.forEach( errorKey => {
            const totalErrors = bodyJSON.errors[errorKey].length;

            for (let i = 0; i < totalErrors; i++) {
              const msgError = bodyJSON.errors[errorKey][i];
              msgGlobal = msgGlobal + "- " + msgError + "\n";
            }

          })
        }

        detalleMensaje.titulo = bodyJSON.titulo;
        detalleMensaje.detalle = msgGlobal + "\n" + "Id:" + bodyJSON.id;

      } else if (bodyJSON.errors && bodyJSON.status == 400) {
        console.log('errors');

        for (const key in bodyJSON.errors) {
          if (key == '$.version') {
            continue;
          }

          bodyJSON.errors[key].forEach(element => {
            msgGlobal = msgGlobal + "- " + element + '\n';  
          });
        }

        detalleMensaje.titulo = bodyJSON.title;
        detalleMensaje.detalle = msgGlobal + "\n" + "Id:" + bodyJSON.traceId;
      }
    }

    return detalleMensaje;
  }

}
