import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayEditContactComponent } from './overlay-edit-contact.component';

describe('OverlayEditContactComponent', () => {
  let component: OverlayEditContactComponent;
  let fixture: ComponentFixture<OverlayEditContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverlayEditContactComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverlayEditContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
