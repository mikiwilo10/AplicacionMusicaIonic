import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage {

  constructor(
    private router:Router,
    private storage:Storage
  ) { }

  
 /* para q funcione el almacenamiento debemos inyectar al appmodule el modulo de storage:
 IonicStorageModule.forRoot()
 */

  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    centeredSlides: true,
    speed: 300
    };

    slides=[{
      title:"Escucha tu musica",
      subtitulo:"EN CUALQUIER LUGAR",
      descripcion:"los mejores albumes,  a toda hora",
      icono:"play"
    },
    {
      title:"Disfruta de nuestros reproductor",
      subtitulo:"DE VIDEOS INCREIBLES",
      descripcion:"Entra al modo video de nuestro reproductor",
      icono:"videocam-outline"
    
    },
    {
      imagen:"assets/img/logo.png",
      title:"Accede al exclusivo",
      subtitulo:"MODO DEPORTE",
      descripcion:"Crea una playlist basada en tu actividad fisica Favorita",
      icono:"bicycle-outline"
    
    }]
    
 

  terminar(){
    this.storage.set('isIntroShowed',true);
    this.router.navigateByUrl("/login");
  }

}
