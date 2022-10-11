import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public session$: BehaviorSubject<any>= new BehaviorSubject<any>(undefined)
  public localStorage$ !: Observable<any>
  constructor() { 
    this.localStorage$=this.session$.pipe(
      tap((session)=>{
        if(session)
        localStorage.setItem('session',JSON.stringify(session))
      })
    )
    this.localStorage$.subscribe()
  }

}
