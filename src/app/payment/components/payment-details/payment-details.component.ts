import { Component } from '@angular/core';
import { PaymentDetailsService } from '../../services/payment-details.service';

declare var Razorpay: any;

interface IRazorpayConfig {
  key_id: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: any) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
}

interface paymentDetails {
  customerName: string;
  email: string;
  phoneNumber: string;
  amount: number;
}

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent {

  paymentRequest: paymentDetails = {
    customerName: '',
    email: '',
    phoneNumber: '',
    amount: 0
  }

  constructor(private razorpayService: PaymentDetailsService) { }

  createRazorpayOrder() {
    // Ensure that required fields are not empty
    console.log("amount" + this.paymentRequest.amount, "customerName" + this.paymentRequest.customerName, "email" + this.paymentRequest.email, "phonenumber" + this.paymentRequest.phoneNumber);




    const orderRequest = {
      customerName: this.paymentRequest.customerName,
      email: this.paymentRequest.email,
      phoneNumber: this.paymentRequest.phoneNumber,
      amount: this.paymentRequest.amount // Convert amount to paise if using INR
    };

    this.razorpayService.createOrder(orderRequest).subscribe(
      (response) => {
        const razorpayOptions: IRazorpayConfig = {
          key_id: response.secretKey,
          amount: response.amount,
          currency: 'INR', // Change to your desired currency
          name: 'Your Company Name',
          description: 'Payment for Your Product/Service',
          order_id: response.razorpayOrderId,
          handler: (response: any) => {
            console.log('Payment success:', response);
            // Handle payment success here
          },
          prefill: {
            name: orderRequest.customerName,
            email: orderRequest.email,
            contact: orderRequest.phoneNumber
          }
        };

        const rzp = new Razorpay(razorpayOptions);
        rzp.on('payment.failed', function (response: any) {
          console.error('Payment failed:', response);
          // Handle payment failure here
        });
        rzp.open();
      },
      (error) => {
        console.error('Error creating Razorpay order:', error);
        // Handle error
      }
    );
  }
}
