import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavCorporateRegisterComponent } from './nav-corporate-register.component';

describe('NavCorporateRegisterComponent', () => {
  let component: NavCorporateRegisterComponent;
  let fixture: ComponentFixture<NavCorporateRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavCorporateRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavCorporateRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
