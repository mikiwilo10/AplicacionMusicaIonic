import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { AutenticacionService } from 'src/app/servicio/autenticacion.service';


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage {

  registerForm: FormGroup;
  validation_messages = {
    email: [
      { type: "required", message: " El email es requerido" },
      { type: "pattern", message: "ojo! este no es un email válido" }
    ],
    password: [
      { type: "required", message: " El password es requerido" },
      { type: "minlength", message: "Minimo 5 letras para el password" }
    ],
    apellido: [
      { type: "required", message: "El apellido es requerido." },
      {
        type: "minlength",
        message: "El apellido debe tener mínimo tres letras."
      }
    ],
    nombre: [
      { type: "required", message: "El nombre es requerido." },
      {
        type: "minlength",
        message: "El nombre debe tener mínimo tres letras."
      }
    ]
  };
  errorMessage: string = "";
  constructor(
    private formBuilder: FormBuilder,
    private authService: AutenticacionService,
    private navCtrl: NavController,
    private storage: Storage
  ) {
    this.registerForm = this.formBuilder.group({
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ])
      ),
      password: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.minLength(5)])
      ),
      nombre: new FormControl(
        "",
        Validators.compose([Validators.minLength(3), Validators.required])
      ),
      apellido: new FormControl(
        "",
        Validators.compose([Validators.minLength(3), Validators.required]))
    });
  }

  register(userData) {
    this.authService.registerUser(userData).then(() => {
      this.navCtrl.navigateBack("/login");
    });
    console.log(userData);
  }


  goToLogin() {
    this.navCtrl.navigateBack("/login");
  }



}
