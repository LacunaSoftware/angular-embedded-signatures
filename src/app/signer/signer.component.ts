import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  isChecked : Boolean = false

  receitaSample = new Receita("Fulano de tal", ['Ibuprofeno', 'Rivotril', 'Omeprazol', 'Benegrip'])

  embedSignForm = new FormGroup({
    cpf: new FormControl(''),
    email: new FormControl(''),
    nome: new FormControl('')
  });

  updateProfile(){
    alert(this.embedSignForm.get('cpf')?.value)
  }

  updateCertificadoDeTeste(){

  }

  constructor() { }

  ngOnInit(): void {
  }



}
