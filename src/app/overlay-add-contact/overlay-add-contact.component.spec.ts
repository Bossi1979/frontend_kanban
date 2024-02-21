import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayAddContactComponent } from './overlay-add-contact.component';

describe('OverlayAddContactComponent', () => {
  let component: OverlayAddContactComponent;
  let fixture: ComponentFixture<OverlayAddContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverlayAddContactComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverlayAddContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
