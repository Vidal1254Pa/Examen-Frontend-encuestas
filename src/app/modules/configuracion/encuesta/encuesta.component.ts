import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageInfoService } from 'src/app/layouts/default/core/page-info.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  OptionsPagination,
  ResponsePagination,
} from 'src/app/shared/models/pagination.models';
import { Subscription } from 'rxjs';
import * as toastr from 'toastr';
import { IEncuesta } from './models/encuesta.model';
import { EncuestaPreguntasService } from './service/encuesta.service';

declare var $: any;
@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss'],
})
export class EncuestaComponent implements OnInit, OnDestroy {
  form: FormGroup = this.fb.group({
    pregunta: ['', Validators.required],
    escala_Id: ['0', Validators.required],
    categoria_Id: ['0', Validators.required],
  });
  formEdit: FormGroup = this.fb.group({
    pregunta: ['', Validators.required],
    escala_Id: ['0', Validators.required],
    categoria_Id: ['0', Validators.required],
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
  paginationInfo: ResponsePagination<IEncuesta> = {
    totalGlobal: 0,
    totalFiltered: 0,
    records: [],
  };
  constructor(
    private pageInfo: PageInfoService,
    private encuestaService: EncuestaPreguntasService,
    private fb: FormBuilder
  ) {
    this.pageInfo.setTitle('Encuesta');

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
  }

  PaginateProvincia() {
    this.getEscalaSub = this.encuestaService.Paginate(this.options).subscribe({
      next: (response) => {
        this.paginationInfo = response;
      },
      error: (reason) => {},
      complete: () => {},
    });
  }

  new() {
    this.form.reset({
      pregunta: '',
      escala_Id: '0',
      categoria_Id: '0',
    });

    $('#modalRegistro').modal('show');
  }

  save() {
    if (this.form.invalid) {
      toastr.warning('Llenar correctamente los datos', 'Datos vacios');
      return;
    }

    this.encuestaService.Save(this.form.value).subscribe({
      next: (response) => {
        $('#modalRegistro').modal('hide');
        toastr.success('Se realizo el registro con éxito!');
        this.PaginateProvincia();

        this.form.reset({
          pregunta: '',
          escala_Id: '0',
          categoria_Id: '0',
        });
      },
      error: (reason) => {},
      complete: () => {},
    });
  }

  edit(id: number) {
    this.id_categoria = id;

    this.encuestaService.getById(this.id_categoria).subscribe({
      next: (response) => {
        this.formEdit.patchValue({
          pregunta: response.pregunta,
          escala_Id: response.escala_Id,
          categoria_Id: response.categoria_Id,
        });

        $('#modalEditar').modal('show');
      },
      error: (reason) => {},
      complete: () => {},
    });
  }

  update() {
    if (this.formEdit.invalid) {
      toastr.warning('Llenar correctamente los datos', 'Datos vacios');
      return;
    }

    this.encuestaService
      .Update(this.formEdit.value, this.id_categoria)
      .subscribe({
        next: (response) => {
          $('#modalEditar').modal('hide');
          toastr.success('El registro se actualizó con éxito!');
          this.PaginateProvincia();

          this.formEdit.reset({
            pregunta: '',
            escala_Id: '0',
            categoria_Id: '0',
          });

          this.id_categoria = 0;
        },
        error: (reason) => {},
        complete: () => {},
      });
  }

  displayDelete(id: number) {
    this.id_categoria = id;
    $('#modalEliminar').modal('show');
  }

  delete() {
    this.encuestaService.Delete(this.id_categoria).subscribe({
      next: (response) => {
        this.id_categoria = 0;
        this.PaginateProvincia();
        $('#modalEliminar').modal('hide');
        toastr.success('El registro se eliminó con éxito!');
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
