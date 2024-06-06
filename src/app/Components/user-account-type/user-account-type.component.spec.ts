import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountTypeComponent } from './user-account-type.component';

describe('UserAccountTypeComponent', () => {
  let component: UserAccountTypeComponent;
  let fixture: ComponentFixture<UserAccountTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserAccountTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserAccountTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
