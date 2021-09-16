import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  user: User = new User()
  confirmarSenha: string
  tipoUsuario: string

  constructor(
    private authService: AuthService,
    private router: Router, 
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

  }

  confirmeSenha(event: any){
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any){
    this.tipoUsuario = event.target.value
  }

  cadastrar(){
    
    if(this.user.nome.length < 5){
      this.alertas.showAlertInfo('O usuário deve conter no mínimo 8 caracteres.')
    }
    if(this.user.usuario.indexOf('@') == -1 || this.user.usuario.indexOf('.') == -1){
      this.alertas.showAlertInfo('O usuário deve ser um email (e.g. usuario@usuario.com)')
    }
   
    this.user.tipo = this.tipoUsuario

    if(this.user.senha.length < 4){
      this.alertas.showAlertInfo('A senha deve conter no mínimo 8 dígitos.')
    }else if(this.user.senha != this.confirmarSenha){
      this.alertas.showAlertInfo('As senhas informadas estão diferentes!')
    }else{
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp
        this.router.navigate(['/entrar'])
        this.alertas.showAlertSuccess('Usuário cadastrado com sucesso')
      })
    }
  }
}
