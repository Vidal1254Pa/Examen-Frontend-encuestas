import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageInfoService } from 'src/app/layouts/default/core/page-info.service';
import { EscalaService } from './service/escala.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  OptionsPagination,
  ResponsePagination,
} from 'src/app/shared/models/pagination.models';
import { Subscription } from 'rxjs';
import * as toastr from 'toastr';
import { IEscala } from './models/escala.model';
declare var $: any;
@Component({
  selector: 'app-escala',
  templateUrl: './escala.component.html',
  styleUrls: ['./escala.component.scss']
})
export class EscalaComponent implements OnInit,OnDestroy {
  form: FormGroup = this.fb.group({
    detalle: ['', Validators.required],
  });
  formEdit: FormGroup = this.fb.group({
    detalle: ['', Validators.required],
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
  paginationInfo: ResponsePagination<IEscala> = {
    totalGlobal: 0,
    totalFiltered: 0,
    records: [],
  };
  constructor(
    private pageInfo: PageInfoService,
    private escalaService: EscalaService,
    private fb: FormBuilder
  ) { 
    this.pageInfo.setTitle('Escala');

    this.pageInfo.updateBreadcrumbs([
      {
        title: 'Escala',
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
    this.PaginateEscala();
  }

  PaginateEscala() {
    this.getEscalaSub = this.escalaService
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

    this.escalaService.Save(this.form.value).subscribe({
      next: (response) => {
        $('#modalRegistro').modal('hide');
        toastr.success('Se realizo el registro con ??xito!');
        this.PaginateEscala();

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

    this.escalaService.getById(this.id_categoria).subscribe({
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

    this.escalaService
      .Update(this.formEdit.value, this.id_categoria)
      .subscribe({
        next: (response) => {
          $('#modalEditar').modal('hide');
          toastr.success('El registro se actualiz?? con ??xito!');
          this.PaginateEscala();

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
    this.escalaService.Delete(this.id_categoria).subscribe({
      next: (response) => {
        this.id_categoria = 0;
        this.PaginateEscala();
        $('#modalEliminar').modal('hide');
        toastr.success('El registro se elimin?? con ??xito!');
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
    this.PaginateEscala();
  }
  size(size: number) {
    this.options.size = size;
    this.options.page = 1;
    this.PaginateEscala();
  }
  search($event: any): void {
    const text = $event.target.value;
    this.options.search = text;
    this.options.page = 1;
    this.PaginateEscala();
  }
  search_(): void {
    this.options.search = $('#idSearch').val().trim();
    this.options.page = 1;
    this.PaginateEscala();
  }
  next() {
    this.options.page++;
    this.PaginateEscala();
  }
  prev() {
    this.options.page--;
    this.PaginateEscala();
  }
  loadPage(page: number) {
    this.options.page = page;
    if (page !== this.options.previousPage) {
      this.options.previousPage = page;
      this.PaginateEscala();
    }
  }
  by(order: string) {
    return this.options.orderBy === order;
  }
}
