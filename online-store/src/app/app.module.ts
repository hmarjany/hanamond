import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProfileComponent } from './component/profile/profile.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { DataService } from './service/Data/data.service';
import { JwtInterceptor } from './Helper/jwt.interceptor';
import { ErrorInterceptor } from './Helper/error.interceptor';
import { AutofocousDirective } from './Helper/autofocous.directive';
import { LoadingComponent } from './component/loading/loading.component';
import { LoaderService } from './service/Loader/loader.service';
import { HomeComponent } from './component/home/home.component';
import { CarouselFirstComponent } from './component/carousel-first/carousel-first.component';
import { CarouselSecondComponent } from './component/carousel-second/carousel-second.component';
import { CarouselThirdComponent } from './component/carousel-third/carousel-third.component';
import { CarouselForthComponent } from './component/carousel-forth/carousel-forth.component';
import { CarouselComponent } from './component/carousel/carousel.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NewProductCarouselComponent } from './component/new-product-carousel/new-product-carousel.component';
import { ProductItemComponent } from './component/product-item/product-item.component';
import { ProductComponent } from './component/product/product.component';
import { ProductViewComponent } from './component/product-view/product-view.component';
import { ProductViewImageComponent } from './component/product-view-image/product-view-image.component';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { BarRatingModule } from "ngx-bar-rating";
import { PagingComponent } from './component/paging/paging.component';
import { CartComponent } from './component/cart/cart.component';
import { MatBadgeModule } from '@angular/material/badge';
import { CartViewComponent } from './component/cart-view/cart-view.component';
import { ConfirmCartComponent } from './component/confirm-cart/confirm-cart.component';
import { AddressComponent } from './component/address/address.component';
import { FooterComponent } from './component/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    AutofocousDirective,
    LoadingComponent,
    HomeComponent,
    CarouselFirstComponent,
    CarouselSecondComponent,
    CarouselThirdComponent,
    CarouselForthComponent,
    CarouselComponent,
    NewProductCarouselComponent,
    ProductItemComponent,
    ProductComponent,
    ProductViewComponent,
    ProductViewImageComponent,
    PagingComponent,
    CartComponent,
    CartViewComponent,
    ConfirmCartComponent,
    AddressComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    FlexLayoutModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CarouselModule,
    PinchZoomModule,
    BarRatingModule,
    MatBadgeModule
  ],
  providers: [
    LoaderService,
    DataService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
