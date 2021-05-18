import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EntityMeta } from '../app.model';

@Injectable({
  providedIn: 'root'
})
export class DataLoaderService {

  constructor(private http: HttpClient) { }

  public loadEntityMeta(): Observable<EntityMeta> {
    return this.http.get<EntityMeta>("./assets/entityMeta.json");
  }

  public loadEntityData(): Observable<any> {
    return this.http.get<any>("./assets/entityData.json");
  }
}
