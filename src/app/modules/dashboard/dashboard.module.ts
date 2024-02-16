import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { PaginationComponent } from 'src/app/components/paginate/pagination.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';


@NgModule({
  declarations: [
    DashboardComponent,
    PaginationComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
  ]
})
export class DashboardModule { }
