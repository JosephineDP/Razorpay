import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentDetailsComponent } from './components/payment-details/payment-details.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PaymentDetailsComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PaymentModule { }
