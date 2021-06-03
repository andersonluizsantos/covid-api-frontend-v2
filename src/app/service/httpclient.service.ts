import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pessoa } from '../pessoa/pessoa.model';

export class Categoria {
  constructor(
    public codigo: number,
    public nome: string
  ) { }
}

export class Employee {
  constructor(
    public empId: string,
    public name: string,
    public designation: string,
    public salary: string,
  ) { }
}

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  
  private readonly url = environment.api;
  
  constructor(
    private httpClient: HttpClient
  ) {}



  public getPessoas() {
    
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('token')
    });
    console.log("Serviço ---> ", `${this.url}/pessoas`);
    //return this.httpClient.get<Pessoa[]>(`${this.url}'/pessoas`, { headers });
    return this.httpClient.get<Pessoa[]>(`${this.url}/pessoas`, { headers });
  }

  public deletePessoa(id:number) {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('token')
    });
    return this.httpClient.delete<Employee>(`${this.url}/pessoas` + "/" + id, { headers });
  }

  public createPessoa(pessoa) {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('token')
    });
    return this.httpClient.post<Employee>(`${this.url}/pessoas`, pessoa, { headers });
  }
}