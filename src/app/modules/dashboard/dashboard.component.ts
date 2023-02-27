import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PageInfoService } from 'src/app/layouts/default/core/page-info.service';
import { Message } from 'src/app/shared/utils/Message';
import { EstadoInforme, ItemDashboard } from './models/itemDashboard';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

	constructor(private pageInfo: PageInfoService, private _dashboardSevices: DashboardService) {

		this.pageInfo.setTitle('Dashboard');

		this.pageInfo.updateBreadcrumbs([{
		title: "Dashboard",
		path: "",
		isActive: false,
		isSeparator: false
		}]);

  	}

	ngOnInit(): void {

	}

}
