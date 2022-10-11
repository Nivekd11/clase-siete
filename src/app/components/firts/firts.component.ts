import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import StorageHelper from 'src/app/libs/helpers/storage.helper';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-firts',
  templateUrl: './firts.component.html',
  styleUrls: ['./firts.component.scss']
})
export class FirtsComponent implements OnInit {

  constructor(public apiService: ApiService,private data: DataService,private router: Router) { }

   public username=""
   public password=""

  ngOnInit(): void {
  }

  login(){
   
    this.apiService.login(this.username,this.password).subscribe({
      next: (response : any)=>{
        StorageHelper.setItem("session",response)
        // this.data.session$.next({
        //   username: this.username,
        //   token: response.token
        // })
        this.router.navigate(['search'])
      }
    })
    
  }

}
