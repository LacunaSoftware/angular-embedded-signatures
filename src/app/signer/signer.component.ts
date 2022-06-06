import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from '../model/usuario';

@Component({
  selector: 'app-signer',
  templateUrl: './signer.component.html',
  styleUrls: ['./signer.component.css']
})
export class SignerComponent implements OnInit {

  @Input() usuario: Usuario = {
    cpf: "473.633.618-86",
    email: "teste@lacunasoftware.com",
    nome: "Pierre de Fermat"
  };



  constructor() { }

  ngOnInit(): void {
  }



}
