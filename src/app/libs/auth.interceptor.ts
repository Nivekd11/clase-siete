import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, concatMap, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { ApiService } from '../services/api.service';
import { DataService } from '../services/data.service';
import StorageHelper from './helpers/storage.helper';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private apiService: ApiService,private dataService: DataService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("Interceptor",request.url)
    if(request.url.includes("/mirror/") ){
      let originalRequest= request
      request = request.clone({
        setHeaders: {
          Authorization: "Bearer "+StorageHelper.getItem("session").token
        }
      })
      return next.handle(request).pipe(
        catchError((error)=>{

          console.log("Errorrr",error)
          if(error instanceof HttpErrorResponse && error.status === 401){
             console.log("inResponseError")
              return this.expiredHandler(originalRequest,next)
          }
          return throwError(()=>error)

        })
      )
    }
  
    return next.handle(request)
  }

  private expiredHandler(originalRequest:HttpRequest<unknown>,next:HttpHandler){
    return this.apiService.refreshToken().pipe(
      switchMap((responseRefresh)=>{
        StorageHelper.setItem("session",responseRefresh)
        originalRequest = originalRequest?.clone({
          setHeaders: {
            Authorization: "Bearer "+StorageHelper.getItem("session").token
          }
        })
        return next.handle(originalRequest)
      })
      
    )
  }

  
}
