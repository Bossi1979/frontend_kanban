import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { JoinComponent } from './join/join.component';
import { JoinHeaderComponent } from './join/join-header/join-header.component';
import { JoinSidenavComponent } from './join/join-sidenav/join-sidenav.component';
import { JoinContentComponent } from './join/join-content/join-content.component';
import { SummaryComponent } from './summary/summary.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { BoardComponent } from './board/board.component';
import { ContactsComponent } from './contacts/contacts.component';
import { SignupComponent } from './signup/signup.component';
import { OverlayAddContactComponent } from './overlay-add-contact/overlay-add-contact.component';
import { OverlayEditContactComponent } from './overlay-edit-contact/overlay-edit-contact.component';
import { OverlayAddContactDoneComponent } from './overlay-add-contact-done/overlay-add-contact-done.component';
import { OverlayEditContactDoneComponent } from './overlay-edit-contact-done/overlay-edit-contact-done.component';
import { OverlayEditTaskComponent } from './overlay-edit-task/overlay-edit-task.component';
import { OverlayDetailViewTaskComponent } from './overlay-detail-view-task/overlay-detail-view-task.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    JoinComponent,
    JoinHeaderComponent,
    JoinSidenavComponent,
    JoinContentComponent,
    SummaryComponent,
    AddTaskComponent,
    BoardComponent,
    ContactsComponent,
    SignupComponent,
    OverlayAddContactComponent,
    OverlayEditContactComponent,
    OverlayAddContactDoneComponent,
    OverlayEditContactDoneComponent,
    OverlayEditTaskComponent,
    OverlayDetailViewTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
     },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
