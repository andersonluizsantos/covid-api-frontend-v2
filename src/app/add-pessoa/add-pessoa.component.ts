import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Pessoa } from '../pessoa/pessoa.model';
import { HttpClientService } from '../service/httpclient.service';

@Component({
  selector: 'app-add-pessoa',
  templateUrl: './add-pessoa.component.html',
  styleUrls: ['./add-pessoa.component.css']
})
export class AddPessoaComponent implements OnInit {

  public pessoaForm: FormGroup;
  checked: boolean = true;
  alteracao: boolean;

  constructor(
    private fb: FormBuilder,
    private httpClientService: HttpClientService,
    public dialogRef: MatDialogRef<AddPessoaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.createForm();
    if (this.data) {
      this.httpClientService.buscarPessoaPorId(this.data.id).subscribe(result => {
        this.alteracao = true;
        this.setForm(result);
      });  
    }
  }

  setForm(result: any) {
    this.pessoaForm.get('cpf').setValue(result.cpf);
    this.pessoaForm.get('nome').setValue(result.nome);
    this.pessoaForm.get('vacinado').setValue(result.vacinado);    
  }

  createForm() {
    this.pessoaForm = this.fb.group({
      cpf: ['', [Validators.required]],	
      nome: ['', [Validators.required]],		
      vacinado: [false, [Validators.required]]      
    })
  }

  cancel(): void {
    this.dialogRef.close();
    this.pessoaForm.reset;
  }

  alterarPessoa(): void {
    let pessoa = new Pessoa();
    pessoa = this.pessoaForm.value;
    pessoa.id = this.data.id;
    this.httpClientService.alterarPessoa(pessoa).subscribe(result => {});
    this.dialogRef.close();
    this.pessoaForm.reset;
    window.location.reload();    
    
  }

  inserirPessoa(): void {
    this.httpClientService.createPessoa(this.pessoaForm.value).subscribe(result => {});
    this.dialogRef.close();
    this.pessoaForm.reset;
    window.location.reload();    
  }

  changeValue(value) {
    this.checked = !value;
}

}
function MD_DIALOG_DATA(MD_DIALOG_DATA: any) {
  throw new Error('Function not implemented.');
}

