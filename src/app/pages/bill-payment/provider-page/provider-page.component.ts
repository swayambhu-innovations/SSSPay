import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DataProvider } from 'src/app/providers/data.provider';
import { LocationService } from 'src/app/services/location.service';
import { ServerService } from 'src/app/services/server.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
import { Transaction } from 'src/app/structures/method.structure';

@Component({
  selector: 'app-provider-page',
  templateUrl: './provider-page.component.html',
  styleUrls: ['./provider-page.component.scss'],
})
export class ProviderPageComponent implements OnInit {
  @Input() operator: any = {};
  fields: any[] = [];
  billFetched: boolean = false;
  bill: any;
  constructor(
    private serverService: ServerService,
    private dataProvider: DataProvider,
    private transactionService: TransactionService,
    private alertify: AlertsAndNotificationsService,
    private locationService: LocationService,
    private router: Router,
    private modalController:ModalController
  ) {}
  billProviderForm = new FormGroup({
    mainField: new FormControl('', [
      Validators.required,
      Validators.pattern(RegExp(this.operator.regex)),
    ]),
  });
  location:any;
  ngOnInit() {
    window.navigator.geolocation.getCurrentPosition(
      (response) => {
        if (response) {
          if (response) {
            this.location = {
              latitude: response.coords.latitude,
              longitude: response.coords.longitude,
            };
            this.alertify.presentToast('Location Found');
          } else {
            this.alertify.presentToast('Location Not Found', 'error');
            // this.alertService.presentToast(response.message);
            this.router.navigate(['/homepage']);
          }
        }
      },
      (error) => {},
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000 }
    );
    console.log('operator-operator ---', this.operator);
    var fields = [];
    var counter = 0;
    var fieldName = '';
    while (fieldName != null) {
      const field = {};
      counter += 1;
      fieldName = this.operator['ad' + counter + '_d_name'];
      if (typeof fieldName == 'string') {
        field['name'] = fieldName;

        const regexp = RegExp(this.operator['ad' + counter + '_regex']);
        console.log('REGEXP', regexp);
        const control = new FormControl('', [
          Validators.required,
          Validators.pattern(regexp),
        ]);
        this.billProviderForm.addControl(
          this.operator['ad' + counter + '_name'],
          control
        );
        field['control'] = control;
        fields.push(field);
      }
    }
    this.fields = fields;
  }
  getBill() {
    console.log(
      'GET BILL',
      this.billProviderForm.value,
      Number(this.billProviderForm.value.mainField),
      this.operator.id
    );
    this.dataProvider.pageSetting.blur = true;
    this.serverService
      .fetchBillPayment(
        Number(this.operator.id),
        Number(this.billProviderForm.value.mainField)
      )
      .then((res) => {
        console.log('response =>', res);
        this.billFetched = true;
        this.bill = res;
      }).catch((err)=>{
        console.log("Error 1",err);
        if (err.message){
          this.alertify.presentToast(err.message, 'error');
        } else if (err[0].message) {
          this.alertify.presentToast(err[0].message, 'error');
        }else {
          this.alertify.presentToast('Something went wrong', 'error');
        }
      }).finally(()=>{
        this.dataProvider.pageSetting.blur = false;
      });
  }

  async payBill() {
    const transaction: Transaction = {
      amount: this.bill.amount,
      ownerId:this.dataProvider.userData?.ownerId || null,
      serviceType:'other',
      title: 'Bill Payment',
      description:
        'Bill Payment of ' +
        this.bill.amount.toString() +
        ' to ' +
        this.bill.name.toString(),
      type: 'bbps',
      date: new Date(),
      balance: this.dataProvider.wallet.balance,
      completed: false,
      status: 'started',
      receiver: this.bill.name,
      error: null,
      extraData: {
        bill: this.bill,
        operator: this.operator,
        fields: this.billProviderForm.value,
        customerId: this.dataProvider.userData.userId,
        latitude: this.location.latitude,
        longitude: this.location.longitude,
      },
      userId: this.dataProvider.userData.userId,
    };
    this.dataProvider.pageSetting.blur = true;
    this.transactionService.addTransaction(transaction).then((transaction) => {
      console.log('transaction added', transaction);

      this.serverService.payBillPayment(transaction.id)
      .then((payment) => {
        console.log('payment', payment);
        if (payment.response_code == 1) {
          console.log('payment', payment);
          this.alertify.presentToast('Payment Successful');
          this.modalController.dismiss()
          this.router.navigate(['../history/detail/'+transaction.id]);
        } else {
            throw new Error(payment);
        }
        })
        .catch((err) => {
          console.log("Error 2",err);
          this.alertify.presentToast(err.error.message, 'error');
        }).finally(()=>{
          this.dataProvider.pageSetting.blur = false;
        });
    }).catch((err) => {
      console.log("Error 1",err);
      this.alertify.presentToast(err.error.message, 'error');
      this.dataProvider.pageSetting.blur = false;
    })
  }

}
