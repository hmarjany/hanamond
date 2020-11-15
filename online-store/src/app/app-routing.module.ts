import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './component/profile/profile.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { AuthGuard } from './Helper/auth.guard';
import { HomeComponent } from './component/home/home.component';
import { ProductComponent } from './component/product/product.component';
import { ProductViewComponent } from './component/product-view/product-view.component';
import { CartViewComponent } from './component/cart-view/cart-view.component';
import { ConfirmCartComponent } from './component/confirm-cart/confirm-cart.component';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { OrderTrackingComponent } from './component/order-tracking/order-tracking.component';
import { SpecialOfferComponent } from './component/special-offer/special-offer.component';

const routes: Routes = [
  { 
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  { 
    path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'forget', component: ForgetPasswordComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'product/:Category/:SubCategory/:CategoryType', component: ProductComponent
  }
  ,
  {
    path: 'productview/:productId', component: ProductViewComponent, runGuardsAndResolvers: 'always'
  },
  {
    path: 'cartview/:productIds', component: CartViewComponent, data:{Product:'product'}
  },
  {
    path: 'confirmcart/:productIds', component: ConfirmCartComponent, canActivate: [AuthGuard]
  },
  {
    path: 'orderTracking', component: OrderTrackingComponent, canActivate: [AuthGuard]
  },
  {
    path: 'specialOffer', component: SpecialOfferComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true,onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
