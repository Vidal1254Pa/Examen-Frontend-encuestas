import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { AccountInfo } from '@azure/msal-browser';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-user-inner',
  templateUrl: './user-inner.component.html',
})
export class UserInnerComponent implements OnInit, OnDestroy {
  @HostBinding('class')
  class = `menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px`;
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';

  user$: Observable<AccountInfo>;
  private unsubscribe: Subscription[] = [];

  constructor(
  ) { }

  ngOnInit(): void {

  }

  ngOnDestroy() {

  }
}
