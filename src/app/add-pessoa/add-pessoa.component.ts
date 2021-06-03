import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClientService } from '../service/httpclient.service';

@Component({
  selector: 'app-add-pessoa',
  templateUrl: './add-pessoa.component.html',
  styleUrls: ['./add-pessoa.component.css']
})
export class AddPessoaComponent implements OnInit {

  public pessoaForm: FormGroup;
  checked: boolean = true;

  constructor(
    private fb: FormBuilder,
    private httpClientService: HttpClientService,
    public dialogRef: MatDialogRef<AddPessoaComponent>
  ) { }

  ngOnInit(): void {
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

  inserirPessoa(): void {
    console.log(this.pessoaForm.value);    
    this.httpClientService.createPessoa(this.pessoaForm.value).subscribe(result => {});
    this.dialogRef.close();
    this.pessoaForm.reset;
    window.location.reload();    
  }

  changeValue(value) {
    this.checked = !value;
}

}
