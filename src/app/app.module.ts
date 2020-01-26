import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { ShopComponent } from './shop/shop.component';
import { HeaderComponent } from './shop/header/header.component';
import { FooterComponent } from './shop/footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './shop/navbar/navbar.component';
import { NotFoundComponent } from './shop/not-found/not-found.component';
import { CartComponent } from './shop/cart/cart.component';
import { CustomerInformationComponent } from './shop/customer-information/customer-information.component';
import { AuthGuardService } from './services/auth-guard.service';
import { CartService } from './services/cart.service';
import { OrdersuccessfulComponent } from './shop/ordersuccessful/ordersuccessful.component';
import { MealService } from './services/mealservice';
import { ControlpanelComponent } from './controlpanel/controlpanel.component';
import { OrdersOverviewComponent } from './controlpanel/orders-overview/orders-overview.component';
import { ControlPanelService } from './services/controlpanel.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpUtil } from './services/httpUtil.service';
import { HomeComponent } from './home/home/home.component';
import { CardproductComponent } from './shop/cardproduct/cardproduct.component';
import { CustomerOrderService } from './shop/customer-information/CustomerOrderService';
import { CatalogComponent } from './controlpanel/catalog/catalog.component';
import { StaticDataService } from './models/StaticDataService';
import { BsDropdownModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderHistoryViewModalComponent } from './controlpanel/order-history-view-modal/order-history-view-modal.component';
import { AppViewContainerDirective } from './directives/app-view-container.directive';

const appRoutes: Routes = [

  {path:'home',component:HomeComponent},
  {path: 'shop', component: ShopComponent, children: []},
  {path:'control', component:ControlpanelComponent,children:[
    {path:'orders',component:OrdersOverviewComponent},
    {path:'catalog',component:CatalogComponent},
    {path:'', redirectTo: 'orders', pathMatch:'full'}
  ]},
  {path:'cart',component:CartComponent},
  {path: 'submit',canActivate:[AuthGuardService], component:CustomerInformationComponent},
  {path: 'completed',canActivate:[AuthGuardService], component:OrdersuccessfulComponent},
  { path: '', redirectTo: '/home', pathMatch:'full'},

];
@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    FooterComponent,
    NavbarComponent,
    AppViewContainerDirective,
    NotFoundComponent,
    CartComponent,
  CustomerInformationComponent,
  OrdersuccessfulComponent,
  ControlpanelComponent,
  OrdersOverviewComponent,
  HomeComponent,
  CardproductComponent,
  CatalogComponent,
  AppViewContainerDirective,
  OrderHistoryViewModalComponent

  ],
  imports: [
    BrowserModule, NgbModule, RouterModule, FormsModule,HttpClientModule, RouterModule.forRoot(appRoutes), BsDropdownModule.forRoot(), BrowserAnimationsModule
  ],
  providers: [AuthGuardService,CartService,CustomerOrderService,MealService,ControlPanelService,HttpUtil,StaticDataService],
  bootstrap: [AppComponent],
  entryComponents:[OrderHistoryViewModalComponent]
})
export class AppModule { }
