import { Component, ElementRef, ChangeDetectorRef, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DataService } from './service/Data/data.service';
import { Subscription, Subject, BehaviorSubject } from 'rxjs';
import { isNullOrUndefined } from 'util';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hanamond';
  showMenu:Subject<Boolean> = new BehaviorSubject(true);
  showDropdownMenu = false;
  dataPassed: any;
  subscription: Subscription;

  mobileQuery: MediaQueryList;

  scrollPosition: boolean = false;

  private _mobileQueryListener: () => void;

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

  constructor(@Inject(DOCUMENT) private document: Document, changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher, private eRef: ElementRef,
    private dataService: DataService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);


    this.subscription = this.dataService.getData().subscribe(x => {
      this.showMenu.next(x==="true");
      if(isNullOrUndefined(x)){
        this.showMenu.next(true);
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

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.eRef.nativeElement.contains(event.target)) {

    } else {
      this.showDropdownMenu = false;
    }
  }
}
