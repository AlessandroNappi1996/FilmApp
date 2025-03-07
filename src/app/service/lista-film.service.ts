import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListaFilmService {

  constructor(
    private http: HttpClient
  ) { }

  getAllFilm(){
    return this.http.get<any>(`${environment.apiUrl}/Film/List`)
  }

  aggiungiFilm(film:any){
    return this.http.post<any>(`${environment.apiUrl}/Film/AddEdit` , film)
  }

  deleteFilm(id:number){
  return this.http.delete<any>(`${environment.apiUrl}/Film/Delete?ID=${id}` , )
  }
  modificaFilm(film:any){
    return this.http.post<any>(`${environment.apiUrl}/Film/AddEdit` , film)
  }
  filtroFilmRegista(regista : string){
    return this.http.get<any>(`${environment.apiUrl}/Film/List?Regista=${regista}`)
  }
  filtroFilmData(data : Date){
    return this.http.get<any>(`${environment.apiUrl}/Film/List?dataUscita=${data}`)
  }
  getFiltri(regista: string , data : Date){
    return this.http.get<any>(`${environment.apiUrl}/Film/List?Regista=${regista}&DataUscita=${data}`)
  }
}
