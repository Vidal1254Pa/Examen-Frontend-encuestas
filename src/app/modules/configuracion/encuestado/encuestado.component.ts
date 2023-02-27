import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageInfoService } from 'src/app/layouts/default/core/page-info.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  OptionsPagination,
  ResponsePagination,
} from 'src/app/shared/models/pagination.models';
import { Subscription } from 'rxjs';
import * as toastr from 'toastr';
import { EncuestadoService } from './service/encuestado.service';
import { IEncuestado } from './models/encuestado.model';
declare var $: any;
@Component({
  selector: 'app-encuestado',
  templateUrl: './encuestado.component.html',
  styleUrls: ['./encuestado.component.scss'],
})
export class EncuestadoComponent implements OnInit, OnDestroy {
  form: FormGroup = this.fb.group({
    ci: ['', Validators.required],
    edad: ['0', Validators.required],
    nombre_completo: ['', Validators.required],
    sexo: ['0', Validators.required],
  });
  formEdit: FormGroup = this.fb.group({
    ci: ['', Validators.required],
    edad: ['0', Validators.required],
    nombre_completo: ['', Validators.required],
    sexo: ['0', Validators.required],
  });
  getEscalaSub: Subscription;
  id_categoria: string = '';
  options: OptionsPagination = {
    page: 1,
    previousPage: 1,
    size: 10,
    search: '',
    orderBy: '',
    orderDir: '',
  };
  paginationInfo: ResponsePagination<IEncuestado> = {
    totalGlobal: 0,
    totalFiltered: 0,
    records: [],
  };
  constructor(
    private pageInfo: PageInfoService,
    private encuestadoService: EncuestadoService,
    private fb: FormBuilder
  ) {
    this.pageInfo.setTitle('Encuestado');

    this.pageInfo.updateBreadcrumbs([
      {
        title: 'Encuestado',
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
    this.PaginateEncuestado();
  }

  PaginateEncuestado() {
    this.getEscalaSub = this.encuestadoService
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
      ci: '',
      edad: '0',
      nombre_completo: '',
      sexo: '0',
    });

    $('#modalRegistro').modal('show');
  }

  save() {
    if (this.form.invalid) {
      toastr.warning('Llenar correctamente los datos', 'Datos vacios');
      return;
    }

    this.encuestadoService.Save(this.form.value).subscribe({
      next: (response) => {
        $('#modalRegistro').modal('hide');
        toastr.success('Se realizo el registro con éxito!');
        this.PaginateEncuestado();

        this.form.reset({
          ci: '',
          edad: '0',
          nombre_completo: '',
          sexo: '0',
        });
      },
      error: (reason) => {},
      complete: () => {},
    });
  }

  edit(id: string) {
    this.id_categoria = id;

    this.encuestadoService.getById(this.id_categoria).subscribe({
      next: (response) => {
        this.formEdit.patchValue({
          ci: response.ci,
          edad: response.edad,
          nombre_completo: response.nombre_Completo,
          sexo: response.sexo,
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

    this.encuestadoService
      .Update(this.formEdit.value, this.id_categoria)
      .subscribe({
        next: (response) => {
          $('#modalEditar').modal('hide');
          toastr.success('El registro se actualizó con éxito!');
          this.PaginateEncuestado();

          this.formEdit.reset({
            ci: '',
            edad: '0',
            nombre_completo: '',
            sexo: '0',
          });

          this.id_categoria = '';
        },
        error: (reason) => {},
        complete: () => {},
      });
  }

  displayDelete(id: string) {
    this.id_categoria = id;
    $('#modalEliminar').modal('show');
  }

  delete() {
    this.encuestadoService.Delete(this.id_categoria).subscribe({
      next: (response) => {
        this.id_categoria = '';
        this.PaginateEncuestado();
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
    this.PaginateEncuestado();
  }
  size(size: number) {
    this.options.size = size;
    this.options.page = 1;
    this.PaginateEncuestado();
  }
  search($event: any): void {
    const text = $event.target.value;
    this.options.search = text;
    this.options.page = 1;
    this.PaginateEncuestado();
  }
  search_(): void {
    this.options.search = $('#idSearch').val().trim();
    this.options.page = 1;
    this.PaginateEncuestado();
  }
  next() {
    this.options.page++;
    this.PaginateEncuestado();
  }
  prev() {
    this.options.page--;
    this.PaginateEncuestado();
  }
  loadPage(page: number) {
    this.options.page = page;
    if (page !== this.options.previousPage) {
      this.options.previousPage = page;
      this.PaginateEncuestado();
    }
  }
  by(order: string) {
    return this.options.orderBy === order;
  }
}
