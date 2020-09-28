import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private router:Router,
    private storage:Storage
  ) { }

  
  async canActivate(){
   /* next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    si encontro el valor verdadero dejara ingresar al home si no le lleva al intro
      */
     const isUserLoggedIn= await this.storage.get("isUserLoggedIn");
     if (isUserLoggedIn) {
      return true;
     }else {
      this.router.navigateByUrl("/login");
     }
     
  }
  
}
