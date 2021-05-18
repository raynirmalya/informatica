import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EntityMeta } from './app.model';
import { DataLoaderService } from './services/data-loader.service';
import cloneDeep from 'lodash/cloneDeep';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from './popup/popup.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'informatica';
  public formEnitityMeta: EntityMeta = null;
  public formEnitityData: any = {};
  public originalData: any = {};
  private formEntityMetaSubs: Subscription;
  private formEntityDataSubs: Subscription;
  constructor(private dataLoaderService: DataLoaderService, public dialog: MatDialog) {}
  ngOnInit(): void {
    this.loadFormData();
    this.loadFormElems();
  }
  private loadFormElems(): void {
    this.formEntityMetaSubs = this.dataLoaderService.loadEntityMeta().subscribe(data => {
      this.formEnitityMeta = data;
    });
  }

  private loadFormData(): void {
    this.formEntityDataSubs = this.dataLoaderService.loadEntityData().subscribe(data => {
      this.formEnitityData = data;
      this.originalData = cloneDeep(data);
    });
  }

  ngOnDestroy() {
    if(this.formEntityMetaSubs) {
      this.formEntityMetaSubs.unsubscribe();
    }
    if(this.formEntityDataSubs) {
      this.formEntityDataSubs.unsubscribe();
    }
  }

  public save(): void {
    let original = {};
    let finalData = cloneDeep(this.formEnitityData);
    Object.keys(this.formEnitityData).forEach(item => {
      if(JSON.stringify(this.originalData[item]) === JSON.stringify(this.formEnitityData[item])) {
        delete finalData[item];
      } else {
        original[item] = this.originalData[item] ? this.originalData[item] : null;
      }
    });
    finalData['$original'] = original;
    sessionStorage.setItem('finalData', JSON.stringify(finalData, undefined, 2));
    this.showPopup();
  }

  private showPopup(): void {
    const dialogRef = this.dialog.open(PopupComponent);
  }
}
