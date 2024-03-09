import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayAddTaskComponent } from './overlay-add-task.component';

describe('OverlayAddTaskComponent', () => {
  let component: OverlayAddTaskComponent;
  let fixture: ComponentFixture<OverlayAddTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverlayAddTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverlayAddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
