import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPageRoutingModule } from './menu-routing.module';

import { MenuPage } from './menu.page';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    component: MenuPage,
    children: [
      {
        path: "home",
        loadChildren: () =>
          import("../../home/home.module").then(m => m.HomePageModule)
      },
       {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
