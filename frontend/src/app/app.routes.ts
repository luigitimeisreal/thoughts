import { Routes } from '@angular/router';
import { LoginRegisterComponent } from './pages/login-register/login-register.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: "auth", component: LoginRegisterComponent },
    { path: "home", component: HomeComponent }
];
