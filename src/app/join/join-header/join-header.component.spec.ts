import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinHeaderComponent } from './join-header.component';

describe('JoinHeaderComponent', () => {
  let component: JoinHeaderComponent;
  let fixture: ComponentFixture<JoinHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JoinHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JoinHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
