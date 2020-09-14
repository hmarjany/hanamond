import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/service/Loader/loader.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  @Input() strictLoading = false;
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  constructor(private loaderService: LoaderService,
    private changeDetectorRef: ChangeDetectorRef){
      this.isLoading.subscribe(()=>{
        this.changeDetectorRef.detectChanges();
      })
    }

  ngOnInit(): void {
    if(this.strictLoading){
      this.changeDetectorRef.detectChanges();
    }
  }

}
