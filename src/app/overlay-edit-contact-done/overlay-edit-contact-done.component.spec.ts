import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayEditContactDoneComponent } from './overlay-edit-contact-done.component';

describe('OverlayEditContactDoneComponent', () => {
  let component: OverlayEditContactDoneComponent;
  let fixture: ComponentFixture<OverlayEditContactDoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverlayEditContactDoneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverlayEditContactDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
