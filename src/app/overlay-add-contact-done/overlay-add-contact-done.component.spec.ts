import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayAddContactDoneComponent } from './overlay-add-contact-done.component';

describe('OverlayAddContactDoneComponent', () => {
  let component: OverlayAddContactDoneComponent;
  let fixture: ComponentFixture<OverlayAddContactDoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverlayAddContactDoneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverlayAddContactDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
