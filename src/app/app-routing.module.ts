import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentsComponent } from './components/comments/comments.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { CheckLoginGuard } from './guards/check-login.guard';
import { ButtonComponent } from './shared/components/button/button.component';
import { LogoComponent } from './shared/components/logo/logo.component';

const routes: Routes = [
  {
    path: 'api',
    canActivate: [CheckLoginGuard],
    loadChildren: () =>
      import('./components/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent },
  {
    path: 'boards',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./components/boards/boards.module').then((m) => m.BoardsModule),
  },
  {
    path: 'tasks/:id',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./components/tasks/tasks.module').then((m) => m.TasksModule),
  },
  {
    path: 'comments/:id',
    canActivate: [AuthGuard],
    component: CommentsComponent
  },
  {
    path: '',
    redirectTo: 'boards',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
