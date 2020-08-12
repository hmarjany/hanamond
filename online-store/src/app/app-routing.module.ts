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

const routes: Routes = [
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
    path: 'home', component: HomeComponent
  },
  {
    path: 'product', component: ProductComponent
  }
  ,
  {
    path: 'productview', component: ProductViewComponent
  },
  {
    path: 'cartview', component: CartViewComponent, data:{Product:'product'}
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
