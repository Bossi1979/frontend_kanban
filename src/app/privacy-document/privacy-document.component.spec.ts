import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyDocumentComponent } from './privacy-document.component';

describe('PrivacyDocumentComponent', () => {
  let component: PrivacyDocumentComponent;
  let fixture: ComponentFixture<PrivacyDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrivacyDocumentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrivacyDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
