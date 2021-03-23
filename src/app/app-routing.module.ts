import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuard } from './user/helpers/auth.guard';
import { ProfileComponent } from './user/components/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {path: 'profile', component: ProfileComponent}
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./user/user.module').then(module => module.UserModule)
  },
  {
    path: 'kanban',
    loadChildren: () => import('./kanban/kanban.module').then(module => module.KanbanModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
