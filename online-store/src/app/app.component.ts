import { Component, ElementRef, ChangeDetectorRef, HostListener, ChangeDetectionStrategy, OnInit, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DataService } from './service/Data/data.service';
import { Subscription, Subject, BehaviorSubject } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { User } from './model/User';
import { AuthService } from './service/Auth/auth.service';
import { Router, NavigationError, NavigationCancel, NavigationEnd, NavigationStart, Event } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { LoaderService } from './service/Loader/loader.service';
import { CartService } from './service/Cart/cart.service';
import { HttpClient } from '@angular/common/http';
import { MenuItems } from './model/MenuItems';
import { server } from './Helper/server';
import { SubCategoryItem } from './model/SubCategoryItem';
import { CategoryType } from './model/enum/CategoryType';
import { CategoryTypeItem } from './model/CategoryTypeItem';
import { SubCategory } from './model/enum/SubCategory';
import { Category } from './model/enum/category';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'hanamond';
  showMenu: boolean = true;
  showDropdownMenu = false;
  showCart = false;
  dataPassed: any;
  subscription: Subscription;
  currentUser: User;
  userName: string;
  cartItems: Number;
  showHeader: boolean = true;

  mobileQuery: MediaQueryList;

  scrollPosition: boolean = false;

  private _mobileQueryListener: () => void;

  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  mobileProductViewFooter: boolean;
  ConfirmCartBasket: boolean;
  menuItems: Array<MenuItems>;

  ngOnInit() {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.mobileProductViewFooter = (!event.url.includes('/productview'))
        }

        if (event instanceof NavigationEnd) {
          this.ConfirmCartBasket = (!event.url.includes('/confirmcart'))
        }
      });

      this.http.get<Array<MenuItems>>(server.serverUrl + 'product/menuItems').subscribe(data => {
        this.menuItems = new Array<MenuItems>();
        data.forEach((item , i)=>{
          var menuItem = new MenuItems();
          menuItem._id = item._id;
          menuItem.CategoryName = Category.map(menuItem._id.Category);
          item.SubCategory.forEach((scat,j)=>{
            if(menuItem.SubCategory != undefined && menuItem.SubCategory.find(x=>x.SubCategory == scat.SubCategory)){
              var categoryTypeItem = new CategoryTypeItem();
              categoryTypeItem.CategoryType = scat.CategoryType;
              categoryTypeItem.CategoryTypeName = CategoryType.map(scat.CategoryType);
              menuItem.SubCategory[i].CategoryTypes.push(categoryTypeItem);
            }else{
              var subCategory = new SubCategoryItem();
              subCategory.SubCategory = scat.SubCategory;
              subCategory.SubCategoryName = SubCategory.map(scat.SubCategory)
              if(subCategory.CategoryTypes === undefined){
                subCategory.CategoryTypes = new Array<CategoryTypeItem>();
              }
              var categoryTypeItem = new CategoryTypeItem();
              categoryTypeItem.CategoryType = scat.CategoryType;
              categoryTypeItem.CategoryTypeName = CategoryType.map(scat.CategoryType);
              subCategory.CategoryTypes.push(categoryTypeItem)
              if(menuItem.SubCategory === undefined){
                menuItem.SubCategory = new Array<SubCategoryItem>();
              }
              menuItem.SubCategory.push(subCategory)
            }

          })

          this.menuItems.push(menuItem);
        })

      });
    window.addEventListener('scroll', this.scroll, true);
    this.cartService.itemsCountChange.subscribe((value) => {
      this.cartItems = value;
    })

    this.authService.currentUser.subscribe(x => {
      this.currentUser = x;
      if (x != null) {
        this.userName = 'سلام ' + x.name + ' !';
      }
    });

    this.cartService.getItemsCount();
  }

  onActivate(event) {
    window.scroll(0, 0);
  }

  scroll = (event): void => {
    if (window.pageYOffset > 130) {
      this.scrollPosition = true;
      this.changeDetectorRef.detectChanges();
    } else {
      this.scrollPosition = false;
    }

    if (window.pageYOffset < 30) {
      this.changeDetectorRef.detectChanges();
    }
  };

  constructor(@Inject(DOCUMENT) private document: Document,
    private changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher, private eRef: ElementRef,
    private dataService: DataService,
    private authService: AuthService,
    private router: Router,
    private loaderService: LoaderService,
    private cartService: CartService,
    private http: HttpClient) {


    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.authService.currentUser.subscribe(x => {
      this.currentUser = x;
    });

    this.showMenu = true;
    this.dataService.getData().subscribe(x => {
      this.showMenu = (x === "true");
      if (isNullOrUndefined(x)) {
        if (this.currentUser != null) {
          this.userName = 'سلام ' + this.currentUser.name + ' !';
        }

        this.showMenu = true;
      }
      this.changeDetectorRef.detectChanges();
    });

    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loaderService.show();
          this.changeDetectorRef.detectChanges();
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loaderService.hide();
          this.changeDetectorRef.detectChanges();
          break;
        }
        default: {
          this.changeDetectorRef.detectChanges();
          break;
        }
      }
    });
  }


  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scroll, true);
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.subscription.unsubscribe();
  }

  toggleButton() {
    if (this.showDropdownMenu) {
      this.showDropdownMenu = false;
    } else {
      this.showDropdownMenu = true;
    }
  }

  logout() {
    this.authService.logout();
    this.userName = '';
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  cartMouseLeave() {
    this.showCart = false;
  }

  onOrder() {
    this.cartMouseLeave();
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.eRef.nativeElement.contains(event.target)) {
      if (event.target.id != "account") {
        this.showDropdownMenu = false;
      }
    } else {
      this.showDropdownMenu = false;
    }
  }
}
