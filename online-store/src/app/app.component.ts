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

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hanamond';
  showMenu: boolean = true;
  showDropdownMenu = false;
  dataPassed: any;
  subscription: Subscription;
  currentUser: User;

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
  }


  scroll = (event): void => {
    if (window.pageYOffset > 126) {
      this.scrollPosition = true;
    } else {
      this.scrollPosition = false;
    }
  };

  constructor(@Inject(DOCUMENT) private document: Document, 
    private changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher, private eRef: ElementRef,
    private dataService: DataService, 
    private authService: AuthService, 
    private router: Router,
    private loaderService: LoaderService) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.authService.currentUser.subscribe(x => this.currentUser = x);
    this.showMenu = true;
    this.dataService.getData().subscribe(x => {
      this.showMenu = (x === "true");
      if (isNullOrUndefined(x)) {
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

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.eRef.nativeElement.contains(event.target)) {
      if(event.target.id!="account"){
        this.showDropdownMenu = false;
      }
    } else {
      this.showDropdownMenu = false;
    }
  }
}
