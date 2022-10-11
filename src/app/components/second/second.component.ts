import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.css']
})
export class SecondComponent implements OnInit {
  public pokemon$!: Observable<any>
  public pokemonName= "pikachu"
  constructor(private apiService: ApiService) {

    this.pokemon$= apiService.searchPokemon('pikachu').pipe(
      tap(console.log)
      
    )

   }
  

  ngOnInit() {

  }

  onChange(){
    console.log(this.pokemonName)
    this.pokemon$= this.apiService.searchPokemon(this.pokemonName).pipe(
      tap(console.log)
      
    )
  }

}
