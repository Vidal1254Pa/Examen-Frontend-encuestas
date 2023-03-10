import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageInfoService } from 'src/app/layouts/default/core/page-info.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  OptionsPagination,
  ResponsePagination,
} from 'src/app/shared/models/pagination.models';
import { Subscription } from 'rxjs';
import * as toastr from 'toastr';
import { ICiudad } from './models/ciudad.model';
import { CiudadService } from './service/ciudad.service';


declare var $: any;
@Component({
  selector: 'app-ciudad',
  templateUrl: './ciudad.component.html',
  styleUrls: ['./ciudad.component.scss']
})
export class CiudadComponent implements OnInit,OnDestroy {
  form: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    provincia_Id: ['0', Validators.required],
  });
  formEdit: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    provincia_Id: ['0', Validators.required],
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
  paginationInfo: ResponsePagination<ICiudad> = {
    totalGlobal: 0,
    totalFiltered: 0,
    records: [],
  };
  constructor(private pageInfo: PageInfoService,
    private ciudadService: CiudadService,
    private fb: FormBuilder
  ) { 
    this.pageInfo.setTitle('Ciudad');

    this.pageInfo.updateBreadcrumbs([
      {
        title: 'Ciudad',
        path: '',
        isActive: false,
        isSeparator: false,
      },
    ]); }

    ngOnDestroy(): void {
      this.getEscalaSub.unsubscribe();
    }
    ngOnInit(): void {
      this.PaginateCiudad();
    }
  
    PaginateCiudad() {
      this.getEscalaSub = this.ciudadService
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
        nombre: '',
        provincia_Id: '0',
      });
  
      $('#modalRegistro').modal('show');
    }
  
    save() {
      if (this.form.invalid) {
        toastr.warning('Llenar correctamente los datos', 'Datos vacios');
        return;
      }
  
      this.ciudadService.Save(this.form.value).subscribe({
        next: (response) => {
          $('#modalRegistro').modal('hide');
          toastr.success('Se realizo el registro con ??xito!');
          this.PaginateCiudad();
  
          this.form.reset({
            provincia_Id: '0',
          });
        },
        error: (reason) => {},
        complete: () => {},
      });
    }
  
    edit(id: number) {
      this.id_categoria = id;
  
      this.ciudadService.getById(this.id_categoria).subscribe({
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
  
      this.ciudadService
        .Update(this.formEdit.value, this.id_categoria)
        .subscribe({
          next: (response) => {
            $('#modalEditar').modal('hide');
            toastr.success('El registro se actualiz?? con ??xito!');
            this.PaginateCiudad();
  
            this.formEdit.reset({
              detalle: '',
              provincia_Id: '0',
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
      this.ciudadService.Delete(this.id_categoria).subscribe({
        next: (response) => {
          this.id_categoria = 0;
          this.PaginateCiudad();
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
      this.PaginateCiudad();
    }
    size(size: number) {
      this.options.size = size;
      this.options.page = 1;
      this.PaginateCiudad();
    }
    search($event: any): void {
      const text = $event.target.value;
      this.options.search = text;
      this.options.page = 1;
      this.PaginateCiudad();
    }
    search_(): void {
      this.options.search = $('#idSearch').val().trim();
      this.options.page = 1;
      this.PaginateCiudad();
    }
    next() {
      this.options.page++;
      this.PaginateCiudad();
    }
    prev() {
      this.options.page--;
      this.PaginateCiudad();
    }
    loadPage(page: number) {
      this.options.page = page;
      if (page !== this.options.previousPage) {
        this.options.previousPage = page;
        this.PaginateCiudad();
      }
    }
    by(order: string) {
      return this.options.orderBy === order;
    }
}
