import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-zarinpal',
  templateUrl: './zarinpal.component.html',
  styleUrls: ['./zarinpal.component.scss']
})
export class ZarinpalComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: any) {

  }

  ngOnInit(): void {
    var container = this.document.getElementById("zarin");
    var content = this.document.createElement("script");

    content.innerHTML = `function showZPTrust(){
        var thewindow = window.open("https://www.zarinpal.com/trustPage/"+window.location.hostname, null, "width=450, height=600, scrollbars=no, resizable=no");}`;
    container.appendChild(content);
  }

}
