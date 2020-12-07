import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchanthomepageComponent } from './merchanthomepage.component';

describe('MerchanthomepageComponent', () => {
  let component: MerchanthomepageComponent;
  let fixture: ComponentFixture<MerchanthomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchanthomepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchanthomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
