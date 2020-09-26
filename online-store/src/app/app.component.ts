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

  ngOnInit() {
    window.addEventListener('scroll', this.scroll, true);
    this.cartService.itemsCountChange.subscribe((value) => {
      this.cartItems = value;
    })

    this.authService.currentUser.subscribe(x => {
      this.currentUser = x;
      this.userName = 'سلام '+ x.name + ' !';
    });

    this.cartService.getItemsCount();
  }


  scroll = (event): void => {
    if ( window.pageYOffset > 130) {
      this.scrollPosition = true;
      this.changeDetectorRef.detectChanges();
    } else {
      this.scrollPosition = false;
    }

    if ( window.pageYOffset < 30) {
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
    private cartService: CartService) {

    
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
        if(this.currentUser != null){
          this.userName = 'سلام '+ this.currentUser.name + ' !';
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
  
  onOrder(){
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
