import { Injectable } from '@angular/core';
import { promises } from 'dns';
import { promise } from 'protractor';
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor(  private storage: Storage) { }

  // loginUser(credential) {
  //   return new Promise((accept, reject) => {
  //     if (
  //       credential.email == "test@test.com" &&
  //       credential.password == "12345"
  //     ) {
  //       accept("Login correcto");
  //     } else {
  //       reject("login incorrecto");
  //     }
  //   });
  // } 

  async loginUser(credential) {
    const user = await this.storage.get("user");
    return new Promise((accept, reject) => {
      if (
        user.email == credential.email &&
        user.password == btoa(credential.password)
      ) {
        accept("Login correcto");
      } else {
        reject("login incorrecto");
      }
    });
  }

  registerUser(userData) {
    userData.password = btoa(userData.password);
    return this.storage.set("user", userData);
  }

}
