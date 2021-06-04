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
    //return this.httpClient.get<Pessoa[]>(`${this.url}'/pessoas`, { headers });
    return this.httpClient.get<Pessoa[]>(`${this.url}/pessoas`, { headers });
  }

  public deletePessoa(id:number) {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('token')
    });
    return this.httpClient.delete<Pessoa>(`${this.url}/pessoas` + "/" + id, { headers });
  }

  public createPessoa(pessoa) {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('token')
    });
    return this.httpClient.post<Pessoa>(`${this.url}/pessoas`, pessoa, { headers });
  }

  public alterarPessoa(pessoa) {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('token')
    });
    return this.httpClient.put<Pessoa>(`${this.url}/pessoas`, pessoa, { headers });
  }

  public buscarPessoaPorId(id) {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('token')
    });
    return this.httpClient.get<Pessoa>(`${this.url}/pessoas`+ "/" + id, { headers });
  }
}