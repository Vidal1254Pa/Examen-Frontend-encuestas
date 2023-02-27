import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageInfoService } from 'src/app/layouts/default/core/page-info.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  OptionsPagination,
  ResponsePagination,
} from 'src/app/shared/models/pagination.models';
import { Subscription } from 'rxjs';
import * as toastr from 'toastr';
import { IEncuestaDetalle, IEncuestaRealizada } from './models/encuesta.model';
import { EncuestaService } from './service/encuesta.service';
import { EncuestadoService } from '../../configuracion/encuestado/service/encuestado.service';
import { IEncuestado } from '../../configuracion/encuestado/models/encuestado.model';
import { SucursalService } from '../../configuracion/sucursal/service/sucursal.service';
import { ISucursal } from '../../configuracion/sucursal/models/sucursal.model';
import { EncuestaPreguntasService } from '../../configuracion/encuesta/service/encuesta.service';
import { IEncuesta } from '../../configuracion/encuesta/models/encuesta.model';

declare var $: any;
@Component({
  selector: 'app-newencuesta',
  templateUrl: './newencuesta.component.html',
  styleUrls: ['./newencuesta.component.scss'],
})
export class NewencuestaComponent implements OnInit, OnDestroy {
  form: FormGroup = this.fb.group({
    encuestado_Id: ['0', Validators.required],
    sucursal_Id: ['0', Validators.required],
  });
  getEscalaSub: Subscription;
  id_categoria: number = 0;
  options: OptionsPagination = {
    page: 1,
    previousPage: 1,
    size: 10,
    search: '',
    orderBy: '',
    orderDir: '',
  };
  paginationInfo: ResponsePagination<IEncuestaRealizada> = {
    totalGlobal: 0,
    totalFiltered: 0,
    records: [],
  };
  listEncuestado: IEncuestado[] = [];
  listSucursal: ISucursal[] = [];
  listPreguntas: IEncuesta[] = [];
  constructor(
    private pageInfo: PageInfoService,
    private newEncuestaService: EncuestaService,
    private encuestadoService: EncuestadoService,
    private sucursalService: SucursalService,
    private preguntasService: EncuestaPreguntasService,
    private fb: FormBuilder
  ) {
    this.pageInfo.setTitle('Realizar Encuesta');

    this.pageInfo.updateBreadcrumbs([
      {
        title: 'Encuesta',
        path: '',
        isActive: false,
        isSeparator: false,
      },
    ]);
  }
  ngOnDestroy(): void {
    this.getEscalaSub.unsubscribe();
  }
  ngOnInit(): void {
    this.PaginateProvincia();
    this.encuestadoService.List().subscribe((res) => {
      this.listEncuestado = res.data as IEncuestado[];
    });
    this.sucursalService.List().subscribe((res) => {
      this.listSucursal = res.data as ISucursal[];
    });
    this.preguntasService.List().subscribe((res) => {
      this.listPreguntas = res.data as IEncuesta[];
    });
  }

  PaginateProvincia() {
    this.getEscalaSub = this.newEncuestaService
      .Paginate(this.options)
      .subscribe({
        next: (response) => {
          this.paginationInfo = response;
        },
        error: (reason) => {},
        complete: () => {},
      });
  }

  new() {
    this.form.reset({
      encuestado_Id: '0',
      sucursal_Id: '0',
    });

    $('#modalRegistro').modal('show');
  }
  findById(id: number) {
    this.newEncuestaService.getById(id).subscribe((res) => {
      let getData=res;
      console.log(getData)
      $('#modalRegistro').modal('show');
      this.form.patchValue({
        encuestado_Id: getData.encuestado_Id,
        sucursal_Id: getData.sucursal_Id,
      });
      getData.detalleEncuestas.map((item) => {
        console.log(item)
        $('#' + item.encuesta_Id).val(item.respuesta);
      })
    });
  }
  save() {
    if (this.form.invalid) {
      toastr.warning('Llenar correctamente los datos', 'Datos vacios');
      return;
    }
    let arrayRespuestas: IEncuestaDetalle[] = [];
    this.listPreguntas.map((item) => {
      arrayRespuestas.push({
        encuesta_Id: item.id,
        respuesta: $('#' + item.id).val(),
      });
    });
    let instaceEncuesta: IEncuestaRealizada = {
      encuestado_Id: this.form.value.encuestado_Id,
      sucursal_Id: this.form.value.sucursal_Id,
      detalleEncuestas: arrayRespuestas,
    };
    this.newEncuestaService.Save(instaceEncuesta).subscribe({
      next: (response) => {
        $('#modalRegistro').modal('hide');
        toastr.success('Se realizo el registro con éxito!');
        this.PaginateProvincia();

        this.form.reset({
          ciudad_Id: '0',
        });
      },
      error: (reason) => {},
      complete: () => {},
    });
  }

  order(by: string) {
    if (this.options.orderBy === by) {
      this.options.orderDir = this.options.orderDir === 'ASC' ? 'DESC' : 'ASC';
    } else {
      this.options.orderBy = by;
    }
    this.PaginateProvincia();
  }
  size(size: number) {
    this.options.size = size;
    this.options.page = 1;
    this.PaginateProvincia();
  }
  search($event: any): void {
    const text = $event.target.value;
    this.options.search = text;
    this.options.page = 1;
    this.PaginateProvincia();
  }
  search_(): void {
    this.options.search = $('#idSearch').val().trim();
    this.options.page = 1;
    this.PaginateProvincia();
  }
  next() {
    this.options.page++;
    this.PaginateProvincia();
  }
  prev() {
    this.options.page--;
    this.PaginateProvincia();
  }
  loadPage(page: number) {
    this.options.page = page;
    if (page !== this.options.previousPage) {
      this.options.previousPage = page;
      this.PaginateProvincia();
    }
  }
  by(order: string) {
    return this.options.orderBy === order;
  }
}
