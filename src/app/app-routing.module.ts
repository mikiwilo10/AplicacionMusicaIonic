import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IntroGuard } from './guards/intro.guard';
import { LoginGuard } from './guards/login.guard';


const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    
  // },
   {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full'
  },
  {
    path: 'intro',
    loadChildren: () => import('./paginas/intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registrar',
    loadChildren: () => import('./paginas/registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./paginas/menu/menu.module').then( m => m.MenuPageModule),
 // loadChildren: "./paginas/menu/menu.module#MenuPageModule",  
  canActivate: [LoginGuard,IntroGuard]
    //carga home si el guard esta en verdadero
    //si el el guar retorna verdaero
  },
  {
    path: 'songs-modal',
    loadChildren: () => import('./paginas/songs-modal/songs-modal.module').then( m => m.SongsModalPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
