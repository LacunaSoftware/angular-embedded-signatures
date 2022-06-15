import { KeyValue } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { LacunaSignerWidget } from 'lacuna-signer-widget';
import { Receita } from '../model/receita';
import { Usuario } from '../model/usuario';

@Component({
  selector: 'app-signer',
  templateUrl: './signer.component.html',
  styleUrls: ['./signer.component.css']
})
export class SignerComponent implements OnInit {
  public get http(): HttpClient {
    return this._http;
  }
  public set http(value: HttpClient) {
    this._http = value;
  }

  loginForm! : FormGroup;
  get nome() { return this.loginForm.get('nome'); }
  get email() { return this.loginForm.get('email'); }
  get cpf() { return this.loginForm.get('cpf'); }

  prescricaoForm! : FormGroup;
  get nomePaciente() { return this.loginForm.get('nomePaciente'); }
  get medicamento() { return this.loginForm.get('email'); }


  usuarioPlaceholder: Usuario = {
    cpf: "47363361886",
    email: "teste@lacunasoftware.com",
    nome: "Pierre de Fermat"
  };

  fileName = '';

  isChecked: boolean = false
  disableForms: boolean = false
  disableAllForms: boolean = false

  disableDocumentPreview: boolean = true

  receitaPlaceholder = new Receita("Fulano de tal");

  receita = new Receita("", {
    'Ibuprofeno': 'Ibuprofeno',
    'Rivotril': 'Rivotril',
    'Omeprazol': 'Omeprazol',
    'Benegrip': 'Benegrip'
  });

  usuario = new Usuario("", "", "");

  updateProfile() {
      this.disableForms = true;
      if(this.isChecked) {
        this.usuario.nome = this.usuarioPlaceholder.nome;
        this.usuario.cpf = this.usuarioPlaceholder.cpf;
        this.usuario.email = this.usuarioPlaceholder.email;
      }
      // DEBUG
      // console.log("Nome:", this.usuario.nome)
      // console.log("Email:", this.usuario.email)
      // console.log("CPF:", this.usuario.cpf)

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

  sign(data: string) {
    // DEBUG
    // console.log("Disable document preview:", this.disableDocumentPreview);
    this.disableAllForms = true;
    var widget = new LacunaSignerWidget();
    widget.setDisableDocumentPreview(this.disableDocumentPreview);
    if(data) {
      widget.render(data, 'embed-container')
    }
  }

  startSignature() {
    const headers: HttpHeaders = new HttpHeaders({
      'x-api-key': 'demo-portal|bebe3de56c5c2c40a6022978a6706e55fb8b9817c577138e1200fae757cc7a64',
    });
    this._http.post("https://localhost:5001/api/signer/embedded", null, {
      observe: 'response',
      headers: headers,
      responseType: 'text'})
      .subscribe((response: { body: any; }) => {
        // DEBUG
        // console.log(response.body);
        this.sign(response.body)
    });


  }

  constructor(private _http: HttpClient) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      nome: new FormControl(this.usuario.nome, [
        Validators.required
      ]),
      email: new FormControl(this.usuario.email, [
        Validators.email,
        Validators.required,
        Validators.minLength(3)
      ]),
      cpf: new FormControl(this.usuario.cpf, Validators.compose([
        Validators.required,
        Usuario.ValidaCpf
      ]))
    });

    this.prescricaoForm = new FormGroup({
      nomePaciente: new FormControl(this.usuario.nome, [
        Validators.required
      ]),
      medicamento: new FormControl(this.usuario.email, [
        Validators.required
      ]),
    });
  }


}
