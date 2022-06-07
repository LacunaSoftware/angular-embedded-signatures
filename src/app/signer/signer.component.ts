import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import LacunaSignerWidget from 'lacuna-signer-widget';
import { Receita } from '../model/receita';
import { Usuario } from '../model/usuario';

@Component({
  selector: 'app-signer',
  templateUrl: './signer.component.html',
  styleUrls: ['./signer.component.css']
})
export class SignerComponent implements OnInit {

  @Input() usuarioPlaceholder: Usuario = {
    cpf: "47363361886",
    email: "teste@lacunasoftware.com",
    nome: "Pierre de Fermat"
  };

  fileName = '';


  isChecked: Boolean = false
  disableForms: Boolean = false

  receita = new Receita("Fulano de tal", ['Ibuprofeno', 'Rivotril', 'Omeprazol', 'Benegrip'])
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
      const upload$ = this.http.post("https://dropsigner.com/api/uploads", formData, {headers: headers});
      upload$.subscribe();
    }
  }

  renderWidget(){
    this.disableForms = true;
    var widget = new LacunaSignerWidget();
    widget.render("", 'embed-container')
  }

  constructor(private http: HttpClient) {
   }

  ngOnInit(): void {
  }



}
