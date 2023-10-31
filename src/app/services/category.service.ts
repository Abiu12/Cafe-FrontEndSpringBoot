import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = environment.apiUrl;
  constructor(
    private httpCliente: HttpClient
  ) { }

  add(data:any){
    return this.httpCliente.post(
      this.url + "/category/add",data,{
        headers: new HttpHeaders().set('Content-Type',"application/json")
      }
    )
  }

  update(data:any){
    return this.httpCliente.post(
      this.url + "/category/update",data,{
        headers: new HttpHeaders().set('Content-Type',"application/json")
      }
    )
  }

  getCategorys(){
    return this.httpCliente.get(
      this.url + "/category/get"
    )
  }

  getFilteredCategorys(){
    return this.httpCliente.get(this.url+"/category/get?filterValue=true");
  }

}
