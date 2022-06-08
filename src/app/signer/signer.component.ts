import { KeyValue } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { LacunaSignerWidget } from 'lacuna-signer-widget';
import { map } from 'rxjs';
import { Receita } from '../model/receita';
import { Usuario } from '../model/usuario';

@Component({
  selector: 'app-signer',
  templateUrl: './signer.component.html',
  styleUrls: ['./signer.component.css']
})
export class SignerComponent implements OnInit {

  usuarioPlaceholder: Usuario = {
    cpf: "47363361886",
    email: "teste@lacunasoftware.com",
    nome: "Pierre de Fermat"
  };

  fileName = '';


  isChecked: Boolean = false
  disableForms: Boolean = false
  disableAllForms: Boolean = false

  receitaPlaceholder = new Receita("Fulano de tal");
  receita = new Receita("", {
    'Ibuprofeno': 'Ibuprofeno',
    'Rivotril': 'Rivotril',
    'Omeprazol': 'Omeprazol',
    'Benegrip': 'Benegrip'
  });
  usuario = new Usuario("", "", "");

  embedSignForm = new UntypedFormGroup({
    cpf: new UntypedFormControl(''),
    email: new UntypedFormControl(''),
    nome: new UntypedFormControl('')
  });

  updateProfile() {
    console.log("Nome: ", this.usuario.nome);
    console.log("email: ", this.usuario.email)
    console.log("cpf: ", this.usuario.cpf);
    this.disableForms = true;
  }

  updateCertificadoDeTeste() {
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      const headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'undefined',
        'x-api-key': 'API Sample App|43fc0da834e48b4b840fd6e8c37196cf29f919e5daedba0f1a5ec17406c13a99'
      });
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("file", file);
      const upload$ = this.http.post("https://signer-lac.azurewebsites.net/api/uploads", formData, { headers: headers });
      upload$.subscribe();
    }
  }

  renderWidget(data: string) {
    var widget = new LacunaSignerWidget();
    this.disableAllForms = true;
    widget.render(data, 'embed-container')
  }

  startSignature() {
    this.http.post("https://demos.lacunasoftware.com/api/signer/embedded", {}, {observe: 'response'} ).subscribe(response => {
      response.headers.keys(); // all header names
      response.body // response content
      console.log(response.body);
    });
  }

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {

  }



}
