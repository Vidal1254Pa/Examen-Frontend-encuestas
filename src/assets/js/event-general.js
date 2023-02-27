(function ($) {
  "use strict";
  
  $(document).on('click', '#btnCerrarCBDs', function (e) {
    Swal.fire({
      text: "Estas Seguro de cerrar el CBDs?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:'Cancelar',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Cerrado',
          'Se ha cerrado correctamente.',
          'success'
        )
      }
    })
  });

  $(document).on('click', '#btnDescargaCBDs', function (e) {
    Swal.fire(
      'Descargado',
      'Se ha descargado correctamente.',
      'success'
    )
  });

  $('.custom-file-input').on('change',function(){
    alert("s");
    var fileName = document.getElementById("exampleInputFile").files[0].name;
    $(this).next('.form-control-file').addClass("selected").html(fileName);
  })
  

})(jQuery);
