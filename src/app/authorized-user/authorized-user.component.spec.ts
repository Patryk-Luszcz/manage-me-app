import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizedUserComponent } from './authorized-user.component';

describe('AuthorizedUserComponent', () => {
  let component: AuthorizedUserComponent;
  let fixture: ComponentFixture<AuthorizedUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorizedUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
