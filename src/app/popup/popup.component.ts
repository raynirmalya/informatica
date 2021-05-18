import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  public savedData: any = null;
  constructor() { }

  ngOnInit(): void {
    this.savedData = JSON.parse(sessionStorage.getItem('finalData'));
  }

}
