import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AutenticacionService } from 'src/app/servicio/autenticacion.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  errorMessage: string = "";

  validationMessages = {
    email: [
      {type: 'required', message: 'El email es requerido'
      },
      {type: 'pattern', message: 'El email es incorrecto'
      }],

      password: [
        {type: 'required', message: 'El password es requerido'
        },
        {type: 'minLength', message: 'Tamaño minimo 5 caracteres'
        }]
  };

  constructor(
    private formBuilder: FormBuilder ,
    private navCtrl: NavController,
    private storage:Storage,
    private authService: AutenticacionService
  ) { 
   
    this.loginForm = this.formBuilder.group({
      
      email: new FormControl("",Validators.compose([
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
      ])),

      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ]))

    });
  }

  ngOnInit() {
  }

  /*
  formularion reacticos para tener un mejor 
  */

//  loginUser(credentials) {
//   console.log(credentials);
// }
loginUser(credentials) {
  this.authService
    .loginUser(credentials)
    .then(res => {
      this.errorMessage = "";
      this.storage.set("isUserLoggedIn", true);
      this.navCtrl.navigateForward("/menu/home");
    })
    .catch(err => {
      this.errorMessage = err;
    });
}

goToRegister() {
  this.navCtrl.navigateForward("/registrar");
}


}
