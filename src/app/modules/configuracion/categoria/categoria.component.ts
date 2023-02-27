import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageInfoService } from 'src/app/layouts/default/core/page-info.service';
import { CategoriaService } from './service/categoria.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  OptionsPagination,
  ResponsePagination,
} from 'src/app/shared/models/pagination.models';
import { Subscription } from 'rxjs';
import * as toastr from 'toastr';
declare var $: any;
import { ICategoria } from './models/categoria.model';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'],
})
export class CategoriaComponent implements OnInit, OnDestroy {
  form: FormGroup = this.fb.group({
    detalle: ['', Validators.required],
  });
  formEdit: FormGroup = this.fb.group({
    detalle: ['', Validators.required],
  });
  getCategoriaSub: Subscription;
  id_categoria: number = 0;
  options: OptionsPagination = {
    page: 1,
    previousPage: 1,
    size: 10,
    search: '',
    orderBy: '',
    orderDir: '',
  };
  paginationInfo: ResponsePagination<ICategoria> = {
    totalGlobal: 0,
    totalFiltered: 0,
    records: [],
  };
  constructor(
    private pageInfo: PageInfoService,
    private categoriaService: CategoriaService,
    private fb: FormBuilder
  ) {
    this.pageInfo.setTitle('Categoria');

    this.pageInfo.updateBreadcrumbs([
      {
        title: 'Categoria',
        path: '',
        isActive: false,
        isSeparator: false,
      },
    ]);
  }
  ngOnDestroy(): void {
    this.getCategoriaSub.unsubscribe();
  }

  ngOnInit(): void {
    this.PaginateCategoria();
  }

  PaginateCategoria() {
    this.getCategoriaSub = this.categoriaService
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
      detalle: '',
    });

    $('#modalRegistro').modal('show');
  }

  save() {
    if (this.form.invalid) {
      toastr.warning('Llenar correctamente los datos', 'Datos vacios');
      return;
    }

    this.categoriaService.Save(this.form.value).subscribe({
      next: (response) => {
        $('#modalRegistro').modal('hide');
        toastr.success('Se realizo el registro con éxito!');
        this.PaginateCategoria();

        this.form.reset({
          Activo: '',
        });
      },
      error: (reason) => {},
      complete: () => {},
    });
  }

  edit(id: number) {
    this.id_categoria = id;

    this.categoriaService.getById(this.id_categoria).subscribe({
      next: (response) => {
        this.formEdit.patchValue({
          detalle: response.detalle,
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

    this.categoriaService
      .Update(this.formEdit.value, this.id_categoria)
      .subscribe({
        next: (response) => {
          $('#modalEditar').modal('hide');
          toastr.success('El registro se actualizó con éxito!');
          this.PaginateCategoria();

          this.formEdit.reset({
            detalle: '',
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
    this.categoriaService.Delete(this.id_categoria).subscribe({
      next: (response) => {
        this.id_categoria = 0;
        this.PaginateCategoria();
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
    this.PaginateCategoria();
  }
  size(size: number) {
    this.options.size = size;
    this.options.page = 1;
    this.PaginateCategoria();
  }
  search($event: any): void {
    const text = $event.target.value;
    this.options.search = text;
    this.options.page = 1;
    this.PaginateCategoria();
  }
  search_(): void {
    this.options.search = $('#idSearch').val().trim();
    this.options.page = 1;
    this.PaginateCategoria();
  }
  next() {
    this.options.page++;
    this.PaginateCategoria();
  }
  prev() {
    this.options.page--;
    this.PaginateCategoria();
  }
  loadPage(page: number) {
    this.options.page = page;
    if (page !== this.options.previousPage) {
      this.options.previousPage = page;
      this.PaginateCategoria();
    }
  }
  by(order: string) {
    return this.options.orderBy === order;
  }
}
