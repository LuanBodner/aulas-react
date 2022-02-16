export class UserDTO {
  id?: number;
  nome: string;
  email: string;
  senha?: string;

  constructor(nome?: string, email?: string, password?: string, id?: number) {
    this.nome = nome;
    this.email = email;
    this.senha = password;
    this.id = id;
  }
}
