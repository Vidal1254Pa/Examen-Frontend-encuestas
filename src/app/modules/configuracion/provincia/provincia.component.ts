import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageInfoService } from 'src/app/layouts/default/core/page-info.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  OptionsPagination,
  ResponsePagination,
} from 'src/app/shared/models/pagination.models';
import { Subscription } from 'rxjs';
import * as toastr from 'toastr';
import { ProvinciaService } from './service/provincia.service';
import { IProvincia } from './models/provincia.model';
declare var $: any;
@Component({
  selector: 'app-provincia',
  templateUrl: './provincia.component.html',
  styleUrls: ['./provincia.component.scss']
})
export class ProvinciaComponent implements OnInit,OnDestroy {
  form: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
  });
  formEdit: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
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
  paginationInfo: ResponsePagination<IProvincia> = {
    totalGlobal: 0,
    totalFiltered: 0,
    records: [],
  };
  constructor( private pageInfo: PageInfoService,
    private provinciaService: ProvinciaService,
    private fb: FormBuilder
  ) { 
    this.pageInfo.setTitle('Provincia');

    this.pageInfo.updateBreadcrumbs([
      {
        title: 'Provincia',
        path: '',
        isActive: false,
        isSeparator: false,
      },
    ]); }
    ngOnDestroy(): void {
      this.getEscalaSub.unsubscribe();
    }
    ngOnInit(): void {
      this.PaginateProvincia();
    }
  
    PaginateProvincia() {
      this.getEscalaSub = this.provinciaService
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
  
      this.provinciaService.Save(this.form.value).subscribe({
        next: (response) => {
          $('#modalRegistro').modal('hide');
          toastr.success('Se realizo el registro con éxito!');
          this.PaginateProvincia();
  
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
  
      this.provinciaService.getById(this.id_categoria).subscribe({
        next: (response) => {
          this.formEdit.patchValue({
            nombre: response.nombre,
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
  
      this.provinciaService
        .Update(this.formEdit.value, this.id_categoria)
        .subscribe({
          next: (response) => {
            $('#modalEditar').modal('hide');
            toastr.success('El registro se actualizó con éxito!');
            this.PaginateProvincia();
  
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
      this.provinciaService.Delete(this.id_categoria).subscribe({
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
