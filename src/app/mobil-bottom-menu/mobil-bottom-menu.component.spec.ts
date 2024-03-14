import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilBottomMenuComponent } from './mobil-bottom-menu.component';

describe('MobilBottomMenuComponent', () => {
  let component: MobilBottomMenuComponent;
  let fixture: ComponentFixture<MobilBottomMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MobilBottomMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MobilBottomMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
