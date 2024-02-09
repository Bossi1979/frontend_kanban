import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinSidenavComponent } from './join-sidenav.component';

describe('JoinSidenavComponent', () => {
  let component: JoinSidenavComponent;
  let fixture: ComponentFixture<JoinSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JoinSidenavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JoinSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
