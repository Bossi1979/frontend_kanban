import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinContentComponent } from './join-content.component';

describe('JoinContentComponent', () => {
  let component: JoinContentComponent;
  let fixture: ComponentFixture<JoinContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JoinContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JoinContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
