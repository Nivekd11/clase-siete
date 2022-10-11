import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import StorageHelper from '../libs/helpers/storage.helper';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }



  login(username:string, password:string){
    
    let body: any={
      username:username,
      password:password 
    }

    return this.http.post("http://ec2-18-116-97-69.us-east-2.compute.amazonaws.com:4001/api/login",body)
  }

  searchPokemon(name:string):Observable<any>{
    return this.http.post("http://ec2-18-116-97-69.us-east-2.compute.amazonaws.com:4001/mirror/pokemon",{
        endpoint: "pokemon/"+name
    
    })

  

    // return this.http.get("https://pokeapi.co/api/v2/pokemon/"+name,{
    //   headers:{
    //     Authorization: "Bearer "+this.getToken()
    //   }
    // })
    // return this.http.get("http://ec2-18-116-97-69.us-east-2.compute.amazonaws.com:4001/api/check",{
    //   headers:{
    //     Authorization: "Bearer "+this.getToken()
    //   }
    // })
  }

  refreshToken(){
    return this.http.post("http://ec2-18-116-97-69.us-east-2.compute.amazonaws.com:4001/api/refresh",{
      session: StorageHelper.getItem("session")
    })
  }

  // checkStatus(): Observable<any>{
    
  //   return this.http.get("http://ec2-18-116-97-69.us-east-2.compute.amazonaws.com:4001/api/check",{
  //     headers:{
  //       Authorization: "Bearer "+this.getToken()
  //     }
  //   })
  // }


  // getToken(){
  //   // console.log("token")
  //   let session: any = JSON.parse(localStorage.getItem("session")!)
  //   return session.token
  // }

  // getUser(){
  //   // console.log("user")
  //   let session: any = JSON.parse(localStorage.getItem("session")!)
  //   return session.username 
  // }

  
}
