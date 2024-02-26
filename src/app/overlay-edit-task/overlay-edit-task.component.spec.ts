import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayEditTaskComponent } from './overlay-edit-task.component';

describe('OverlayEditTaskComponent', () => {
  let component: OverlayEditTaskComponent;
  let fixture: ComponentFixture<OverlayEditTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverlayEditTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverlayEditTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
