import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayDetailViewTaskComponent } from './overlay-detail-view-task.component';

describe('OverlayDetailViewTaskComponent', () => {
  let component: OverlayDetailViewTaskComponent;
  let fixture: ComponentFixture<OverlayDetailViewTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverlayDetailViewTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverlayDetailViewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
