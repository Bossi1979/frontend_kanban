import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidingMessagesComponent } from './sliding-messages.component';

describe('SlidingMessagesComponent', () => {
  let component: SlidingMessagesComponent;
  let fixture: ComponentFixture<SlidingMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SlidingMessagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SlidingMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
