import { Component, ElementRef, ChangeDetectorRef, HostListener } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hanamond';
  showDropdownMenu = false;

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
  media: MediaMatcher, private eRef: ElementRef) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scroll, true); 
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  toggleButton(){
    if(this.showDropdownMenu){
      this.showDropdownMenu = false;
    }else{
      this.showDropdownMenu = true;
    }
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.eRef.nativeElement.contains(event.target)) {
      
    } else {
      this.showDropdownMenu = false;
    }
  }
}
