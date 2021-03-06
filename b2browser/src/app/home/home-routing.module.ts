import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HomeComponent } from './home.component';
import { BlankComponent } from '../blank/blank.component';
import { StoreHomeComponent } from '../store-home/store-home.component';
import { FindComponent } from '../find/find.component';
import { FindaddComponent } from '../findadd/findadd.component';
import { SubmitpageComponent } from '../submitpage/submitpage.component';
import { QuotationCenterComponent } from '../quotation-center/quotation-center.component';
import { QuotationDetailsComponent } from '../quotation-details/quotation-details.component';
import { DetailsOfQuotedPriceComponent } from '../details-of-quoted-price/details-of-quoted-price.component';
import { OrderManagementComponent } from '../order-management/order-management.component';
import { SendGoodsDetailComponent } from '../send-goods-detail/send-goods-detail.component';
import { ReceivedGoodsDetailComponent } from '../received-goods-detail/received-goods-detail.component';
import { FinishDetailComponent } from '../finish-detail/finish-detail.component';
import { ManagementCenterComponent } from '../management-center/management-center.component';
import { ReturnsManagementComponent } from '../returns-management/returns-management.component';
import { ReturnsDetailComponent } from '../returns-detail/returns-detail.component';
import { CancelDetailComponent } from '../cancel-detail/cancel-detail.component';
import { AchievementComponent } from '../achievement/achievement.component';
import { EmployeeManagementComponent } from '../employee-management/employee-management.component';
import { WaitingComponent } from '../waiting/waiting.component';
import { ConsumeComponent } from '../consume/consume.component';
import { WatchorderComponent } from '../watchorder/watchorder.component';
import { WaitsendComponent } from '../waitsend/waitsend.component';
import { WaitreceiveComponent } from '../waitreceive/waitreceive.component';
import { SuccessComponent } from '../success/success.component';
import { ChangeapplyComponent } from '../changeapply/changeapply.component';
import { ObligationsComponent } from '../obligations/obligations.component';
import { MyComponent } from '../my/my.component';
import { JiaoyijiluComponent } from '../jiaoyijilu/jiaoyijilu.component';
import { EditComponent } from '../edit/edit.component';
import { AccountComponent } from '../account/account.component';
import { HelpcenterComponent } from '../helpcenter/helpcenter.component';
import { ChangeComponent } from '../change/change.component';
import { AuthorityComponent } from '../authority/authority.component';
import { AddressComponent } from '../address/address.component';
import { OrderComponent } from '../order/order.component';
import { AboutusComponent } from '../aboutus/aboutus.component';
import { AddressaddComponent } from '../addressadd/addressadd.component';
import { ChangedetailComponent } from '../changedetail/changedetail.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "blank", component: BlankComponent },
      { path: "storeHome", component: StoreHomeComponent },
      { path: "find", component: FindComponent },
      { path: "findadd", component: FindaddComponent },
      { path: "submitpage", component: SubmitpageComponent },
      { path: "quotationCenter", component: QuotationCenterComponent },
      { path: "quotationDetails", component: QuotationDetailsComponent },
      { path: "detailsOfQuotedPrice", component: DetailsOfQuotedPriceComponent},
      { path: "orderManagement", component: OrderManagementComponent},
      { path: "sendGoodsDetail", component: SendGoodsDetailComponent},
      { path: "receiveGoodsDetail", component: ReceivedGoodsDetailComponent},
      { path: "finishDetail", component: FinishDetailComponent},
      { path: "cancelDetail", component: CancelDetailComponent},
      { path: "managementCenter", component: ManagementCenterComponent},
      { path: "employeeManagement", component: EmployeeManagementComponent},
      { path: "returnsManagement", component: ReturnsManagementComponent},
      { path: "returnsDetail", component: ReturnsDetailComponent},
      { path: "achievement", component: AchievementComponent},
      { path: "waiting", component: WaitingComponent},
      { path: "consume", component: ConsumeComponent},
      { path: "watchorder", component: WatchorderComponent},
      { path: "waitsend", component: WaitsendComponent},
      { path: "waitreceive", component: WaitreceiveComponent},
      { path: "success", component: SuccessComponent},
      { path: "changeapply", component: ChangeapplyComponent},
      { path: "obligations", component: ObligationsComponent},
      { path: "my", component: MyComponent},
      { path: "jiaoyijilu", component: JiaoyijiluComponent},
      { path: "edit", component: EditComponent},
      { path: "account", component: AccountComponent},
      { path: "helpcenter", component: HelpcenterComponent},
      { path: "change", component: ChangeComponent},
      { path: "authority", component: AuthorityComponent},
      { path: "address", component: AddressComponent},
      { path: "order", component: OrderComponent},
      { path: "aboutus", component: AboutusComponent},
      { path: "addressadd", component: AddressaddComponent},
      { path: "changedetail", component: ChangedetailComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
