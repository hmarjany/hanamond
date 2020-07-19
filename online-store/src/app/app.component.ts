import { Component, ChangeDetectorRef, HostListener } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mahya-tavan';

  mobileQuery: MediaQueryList;

  scrollPosition: boolean = false;

  private _mobileQueryListener: () => void;

  ngOnInit() {
    window.addEventListener('scroll', this.scroll, true); 
  }


  scroll = (event): void => {
    if(window.pageYOffset>126){
        this.scrollPosition = true;
    }else{
      this.scrollPosition = false;
    }
  };

  constructor(@Inject(DOCUMENT) private document: Document, changeDetectorRef: ChangeDetectorRef, 
  media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scroll, true); 
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
