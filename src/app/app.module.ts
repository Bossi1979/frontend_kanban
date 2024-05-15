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
import { OverlayEditTaskComponent } from './overlay-edit-task/overlay-edit-task.component';
import { OverlayDetailViewTaskComponent } from './overlay-detail-view-task/overlay-detail-view-task.component';
import { HelpDocumentComponent } from './help-document/help-document.component';
import { PrivacyDocumentComponent } from './privacy-document/privacy-document.component';
import { LegalDocumentComponent } from './legal-document/legal-document.component';
import { OverlayAddTaskComponent } from './overlay-add-task/overlay-add-task.component';
import { MobilBottomMenuComponent } from './mobil-bottom-menu/mobil-bottom-menu.component';
import { SlidingMessagesComponent } from './sliding-messages/sliding-messages.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

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
    OverlayEditTaskComponent,
    OverlayDetailViewTaskComponent,
    HelpDocumentComponent,
    PrivacyDocumentComponent,
    LegalDocumentComponent,
    OverlayAddTaskComponent,
    MobilBottomMenuComponent,
    SlidingMessagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
     },
     {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
