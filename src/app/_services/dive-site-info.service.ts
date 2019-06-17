import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiveSiteInfoService {

  diveSiteInfo = new BehaviorSubject<any>(null);

  constructor() { }

  get getDiveSiteInfo(){
    return this.diveSiteInfo
  }

  setDiveSiteInfo(diveSiteInfo){
    this.diveSiteInfo.next(diveSiteInfo)
  }
}
