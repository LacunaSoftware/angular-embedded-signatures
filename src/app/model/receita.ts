export class Receita {
  constructor(public nomeDoPaciente: string, public medicamento?: { [key:string]: string }) {}
}
