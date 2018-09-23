import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WhiteboardComponent } from './whiteboard/whiteboard.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'whiteboard', component: WhiteboardComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: 'login' }
];

export const routing = RouterModule.forRoot(appRoutes);
