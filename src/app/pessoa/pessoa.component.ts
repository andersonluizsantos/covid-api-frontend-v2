import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClientService } from '../service/httpclient.service';
import { Pessoa } from './pessoa.model';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})


export class PessoaComponent implements OnInit {

  displayedColumns = ['id', 'cpf', 'Nome', 'Vacinado?', 'Ações'];
  pessoas: Pessoa[];
  dataSource: MatTableDataSource<Pessoa>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private httpClientService: HttpClientService) {
    this.dataSource = new MatTableDataSource(this.pessoas);
  }
  
  ngOnInit() {
    console.log("teste");
    this.httpClientService.getPessoas().subscribe(
      response => {
        this.handleSuccessfulResponse(response);
        console.log(response);
        this.dataSource = new MatTableDataSource(response);
      }
    );
  }

  handleSuccessfulResponse(response) {
    console.log("teste2");
    this.pessoas = response;
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
